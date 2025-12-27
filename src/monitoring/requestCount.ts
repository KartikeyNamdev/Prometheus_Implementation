//define counter using prom-client
import client from "prom-client";
import { Request, Response, NextFunction } from "express";

export const requestCounter = new client.Counter({
  name: "Request_Count",
  help: "Counts the number of requests",
  labelNames: ["method", "route"],
});

export function requestCountMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  requestCounter.inc({
    method: req.method, // GET, POST, etc.
    route: req.path, // e.g. /api/users
  });
  next();
}
