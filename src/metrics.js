const log = require('./logger');
const stringify = require('safe-stable-stringify');
const config = require('./config').getConfig();
const crow = require("crow-metrics");

// metrics object, publishing every 10 seconds
const metrics = crow.Metrics.create({ period: config.metrics.period || 10000, log: log, expire: config.metrics.expire|| "forever" });
// connect and publish metrics to InfluxDB
metrics.events.attach(crow.exportInfluxDb({ hostname: config.metrics.hostname || "localhost:8086", database: config.metrics.dbName || "homer" }));

exports.metrics = metrics;

/*

// track heap-used as a gauge.
const heapUsed = metrics.gauge("heap_used");
metrics.setGauge(heapUsed, () => process.memoryUsage().heapUsed);

// request counter
const requestCount = metrics.counter("request_count");
// count incoming requests from functions
metrics.increment(requestCount);

// request counter with tags
const mm = m.withTags({ instanceId: "i-ff00ff00" });
mm.increment(mm.counter("widgets"));
mm.increment(mm.counter("errors", { code: "500" }));

// request time
const requestTime = metrics.distribution("request_time_msec");
// time how long a function takes to execute
metrics.time(requestTime, () => {
    response.send("Hello!\n");
});


*/
