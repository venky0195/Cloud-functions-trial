module.exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: "Hello World from containerized lambda.",
    headers: { "Content-Type": "text/html" },
  };
};
