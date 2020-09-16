const express = require("express");
const httpProxy = require("http-proxy");
const app = express();
const port = process.env.PORT || 4000;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on("error", (err, req, res) => {
  console.log(err);
  res.status(500).send("Proxy Error");
});

app.all("/db/*", (req, res) => {
  apiProxy.web(req, res, {
    target: "http://localhost:5000",
  });
});


app.listen(port, () => console.log(`Gateway on port ${port}`))
