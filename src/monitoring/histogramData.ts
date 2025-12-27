import client from "prom-client";
import { Request, Response, NextFunction } from "express";

export const histogramData = new client.Histogram({
  name: "histogram_data_in_ms",
  help: "Histogram for request durations in milliseconds",
  labelNames: ["method", "route"],
  buckets: [0.1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
});

export function histogramDataMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();
  next();
  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    histogramData.observe(duration);
  });
}
