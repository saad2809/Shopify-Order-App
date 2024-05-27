const apiKey = process.env.SHOPIFY_API_KEY;

function checkApiKey(req, res, next) {
  const apiKeyHeader = req.header('x-api-key');
  if (apiKeyHeader && apiKeyHeader === apiKey) {
    return next();
  }
  res.status(403).json({ message: 'Forbidden: Invalid API Key' });
}

module.exports = checkApiKey;