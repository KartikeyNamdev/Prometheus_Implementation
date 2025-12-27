import Express = require("express");
import { requestCountMiddleware } from "./monitoring/requestCount";
import client from "prom-client";
import { activeUserMiddleware } from "./monitoring/activeUsers";
import { histogramDataMiddleware } from "./monitoring/histogramData";

// initialize clients
const app = Express();
app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.setHeader("Content-Type", client.register.contentType);
  res.end(metrics);
});

// dont use on /metrics endpoints
app.use(requestCountMiddleware, activeUserMiddleware, histogramDataMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/user", (req, res) => {
  res.send("GET User Profile");
});
app.post("/user", (req, res) => {
  res.send("POST User Profile");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
