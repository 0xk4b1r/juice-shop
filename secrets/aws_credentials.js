// AWS Configuration - DO NOT COMMIT
const AWS_CONFIG = {
  accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  region: 'us-east-1',
  sessionToken: 'AQoDYXdzEJr...'
};

// Database credentials
const DB_CONFIG = {
  host: 'prod-database.internal.company.com',
  port: 5432,
  username: 'admin',
  password: 'SuperSecret123!@#',
  database: 'production_db'
};

// API Keys
const API_KEYS = {
  stripe: 'sk_live_4eC39HqLyjWDarjtT1zdp7dc',
  sendgrid: 'SG.xxxxxx.yyyyyy-zzzzzz',
  github: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  slack_webhook: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX'
};

// JWT Secret
const JWT_SECRET = 'my-super-secret-jwt-key-12345';

// Encryption keys
const ENCRYPTION_KEY = 'aes-256-cbc-key-1234567890abcdef';
const IV = '1234567890abcdef';

module.exports = { AWS_CONFIG, DB_CONFIG, API_KEYS, JWT_SECRET, ENCRYPTION_KEY, IV };
