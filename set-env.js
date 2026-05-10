const fs = require('fs');
const path = require('path');

// use process.env if in Docker, else read .env file
if (!process.env.apiURL && fs.existsSync('.env')) {
  const envFile = fs.readFileSync('.env', 'utf8');
  envFile.split('\n')
    .filter(line => line && !line.startsWith('#'))
    .forEach(line => {
      const [key, ...val] = line.split('=');
      process.env[key.trim()] = val.join('=').trim(); // join back in case value has '='
    });
}

const env = process.env;

const environment = `
export const environment = {
  production: false,
  apiURL: '${env.apiURL}',
  PAYMENT_BACKEND_URL: '${env.PAYMENT_BACKEND_URL}',
  esewa_url: '${env.esewa_url}',
  esewa_secret: '${env.esewa_secret}',
  CLOUDFRONT_DOMAIN: '${env.CLOUDFRONT_DOMAIN}'
};
`;

fs.writeFileSync(
  path.join(__dirname, 'src', 'app', 'environments', 'environment.development.ts'),
  environment
);

console.log('✅ environment.development.ts generated');