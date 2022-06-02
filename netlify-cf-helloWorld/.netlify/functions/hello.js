module.exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: `<div>Hello from Netlify cloud functions</div>`,
    headers: { "Content-Type": "text/html" },
  };
};
