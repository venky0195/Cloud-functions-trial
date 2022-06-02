const { spawn } = require("child_process");
const { launcher } = require("./cf-launcher");

let server;

const handleProcess = async (event, serverProcess) => {
  return new Promise((resolve, reject) => {
    let counter = 0;

    serverProcess.stdout.on("data", async (data) => {
      console.log(`stdout: ${data}`);
      counter++;
      if (counter === 2) {
        const response = await launcher(event);
        console.log("body initial", response.body);
        resolve(response);
      }
    });

    serverProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    serverProcess.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
};

const sendRequest = async (event) => {
  const response = await launcher(event);
  console.log("body subsequent request", response.body);
};

const getServer = async (event) => {
  if (!server) {
    console.log("Spawning new server process");
    server = spawn("npm", ["run", "start"]);

    await handleProcess(event, server);
  } else {
    await sendRequest(event);
  }
  return server;
};

module.exports.handler = async (event, context) => {
  const sv = await getServer(event);

  return {
    statusCode: 200,
    body: "Hello World from containerized next application",
    headers: { "Content-Type": "text/html" },
  };
};
