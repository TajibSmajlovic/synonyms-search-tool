require('module-alias/register');

const { config } = require('@config');
const app = require('@root/api/app');

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${config.port}`);
});
