# k6-poc

## How to set up the project 💻

1. Git Clone Repository with HTTPS or SSH

2. Add env.sh file `source env.sh`

3. Run without DB `k6 run test/embellishment.js`

Run with DB `k6 run --out influxdb=http://localhost:8086/myk6db test/embellishment.js`
