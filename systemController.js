export function healthCheck(req, res) {
  res.json({
    status: "ok",
    service: "Tiger API v3",
    timestamp: new Date().toISOString()
  });
}

export function configInfo(req, res) {
  res.json({
    env: process.env.NODE_ENV || "development",
    models: {
      default: "gpt-4.1-mini",
      heavy: "gpt-4.1"
    }
  });
}
