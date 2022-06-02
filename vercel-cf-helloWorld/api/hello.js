export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`<div>Hello from Vercel cloud functions</div>`);
}
