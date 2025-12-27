import { Request, Response, NextFunction } from "express";
import client from "prom-client";

export const activeUser = new client.Gauge({
  name: "Active_Users",
  help: "Counts the number of active users, should be used with WS",
  labelNames: ["method", "route"],
});

export function activeUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  activeUser.inc();
  next();

  res.on("finish", () =>
    setTimeout(() => {
      activeUser.dec();
    }, 10000)
  );
}
