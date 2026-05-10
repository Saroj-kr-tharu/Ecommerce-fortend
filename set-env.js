const fs = require('fs');
require('dotenv').config();

const content = `
export const environment = {
  production: false,
  apiUrl: '${process.env.API_URL}',
  stripeKey: '${process.env.STRIPE_KEY}'
};
`;

fs.writeFileSync('./src/app/environments/environment.development.ts', content);
console.log('✅ environment.development.ts generated');