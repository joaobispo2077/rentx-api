/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const env_path = path.join(
  __dirname,
  `../.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`.trim(),
);
console.log('running app into env: ', process.env.NODE_ENV);
console.log('running app using config: ', env_path);

require('dotenv').config({
  path: env_path,
});
