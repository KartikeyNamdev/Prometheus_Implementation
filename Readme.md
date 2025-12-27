# Prometheus Implementation Notes

_Date: 27 December_

## What is Prometheus?

**Prometheus** is an individual open source Metrics and Monitoring tool for your system and services.

Moreover, it is a time series database, but saves your data over time, not every second.

### What can it monitor?

1. **Processes**: Node, Rust, Golang, Solana etc. (not full application)
2. **Hosts**: A full end to end application software

## How does Prometheus work?

It pulls the data from `/metrics` endpoint from your application which sends the real time stats of your application, but prometheus polls the system in probably every n seconds and stores in Key Value pairs of our choice which makes it multi dimensional database.

Uses **PromQL** query.

## Cons of Prometheus

1. Runs on single machine
2. Not distributed
3. Cannot be scaled horizontally, unfortunately. no remote storage available for different containers or pods.
4. In case of ASG's or services that run down before prometheus could even track them down.

**Solution**: what you can do is use external gateway's that let you push to prometheus forcefully.

---

## Implementation Steps

### 1. Setup Application

Create a simple nodejs application or open your current application.

### 2. Add Prometheus

**How to add?**

1. Add `prometheus.yml` config file to establish a prometheus service.

2. Containerise the prometheus service using docker and run it:

   ```bash
   docker run -p 9090:9090 -v ./prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
   ```

3. Containerize our nodejs application.

4. Create a `docker-compose.yml` file just to start 2 containers together:

   - Prometheus container
   - Nodejs application

   But with same network: **Monitoring**, so that they can be in same network and use correct port addresses.

---

## Types of Metrics Required by Prometheus

### 1. Counters

An incremental counter that always goes up.

**Example**: Number of total requests.

### 2. Gauge

Which can go up or also down.

**Example**: CPU utilisation, Active people using WebSocket.

It is a counter which goes up and down depending upon the user requirements.

### 3. Histograms

If i have million users, i cannot store individual response time each user dealt with rather we create bucket that divides all million users using some parameter.

**Key Points**:

- For Infinite data
- Cumulative in nature, i.e. increase over time
- The histogram object requires 2 types of data:
  1. The observation that we want to do over time
  2. The parameter on which we will be observing, in our case it is time in ms

**Example**: How many users were responded back under 1 ms, further how many were responded within 5ms or 10ms.

---

## Grafana

_(Coming soon - will add details about Grafana integration)_

---

## Notes

- Prometheus uses PromQL for querying metrics
- Make sure both containers are on the same network for proper communication
- The `/metrics` endpoint should be exposed from your application
- Prometheus will automatically scrape metrics at configured intervals
