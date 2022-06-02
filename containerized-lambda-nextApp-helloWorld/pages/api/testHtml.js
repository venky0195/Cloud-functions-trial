export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`<div>Hello World</div>`);
}
