const http = require("http");

module.exports.launcher = async (event) => {
  const host = "localhost";
  const port = 8086;

  const normalizedEvent = normalizeAPIGatewayProxyEvent(event);
  const { isApiGateway, method, headers, body } = normalizedEvent;
  let { path } = normalizedEvent;

  const options = {
    isApiGateway,
    host,
    port,
    path,
    method,
    headers,
    body,
  };

  const res = await requestWrapper(options);
  return res;
};

function normalizeAPIGatewayProxyEvent(event) {
  let bodyBuffer;
  const {
    requestContext: {
      http: { method },
    },
    rawPath,
    rawQueryString,
    headers,
    body,
  } = event;

  let path = rawPath;
  if (rawQueryString) {
    path += "?" + rawQueryString;
  }

  if (body) {
    if (event.isBase64Encoded) {
      bodyBuffer = Buffer.from(body, "base64");
    } else {
      bodyBuffer = Buffer.from(body);
    }
  } else {
    bodyBuffer = Buffer.alloc(0);
  }

  const skipHeaders = [
    "x-amzn-trace-id",
    "x-forwarded-port",
    "x-datadog-parent-id",
    "x-datadog-sampling-priority",
    "x-datadog-trace-id",
    "x-envoy-attempt-count",
    "x-envoy-external-address",
    "x-forwarded-client-cert",
    "x-request-id",
    "x-sp-op-id",
    "x-sp-rq-id",
  ];

  for (const header of skipHeaders) {
    headers[header] = undefined;
  }

  return { isApiGateway: true, method, path, headers, body: bodyBuffer };
}

const requestWrapper = (options) => {
  return new Promise(function (resolve, reject) {
    const req = http.request(
      {
        hostname: options.host,
        port: options.port,
        path: options.path,
        method: options.method,
      },
      (response) => {
        const respBodyChunks = [];
        response.on("data", (chunk) => respBodyChunks.push(Buffer.from(chunk)));

        response.on("error", reject);

        response.on("end", () => {
          const bodyBuffer = Buffer.concat(respBodyChunks);
          delete response.headers.connection;

          if (options.isApiGateway) {
            delete response.headers["content-length"];
          } else if (response.headers["content-length"]) {
            response.headers["content-length"] = String(bodyBuffer.length);
          }

          resolve({
            statusCode: response.statusCode || 200,
            headers: response.headers,
            body: bodyBuffer.toString("base64"),
            isBase64Encoded: true,
          });
        });
      }
    );

    req.on("error", (error) => {
      console.log("request error", error);
      reject(error);
    });

    for (const [name, value] of Object.entries(options.headers)) {
      if (value === undefined) {
        continue;
      }
      try {
        req.setHeader(name, value);
        if (name === "x-forwarded-host") req.setHeader("host", value);
        if (name === "x-real-ip") req.setHeader("x-forwarded-for", value);
      } catch (err) {
        console.error(`Skipping HTTP request header: "${name}: ${value}"`);
        console.error(err.message);
      }
    }

    if (options.body) req.write(options.body);
    req.end();
  });
};
