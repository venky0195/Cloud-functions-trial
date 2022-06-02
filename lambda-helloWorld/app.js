module.exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: "Hello World from lambda(Without container).",
    headers: { "Content-Type": "text/html" },
  };
};
