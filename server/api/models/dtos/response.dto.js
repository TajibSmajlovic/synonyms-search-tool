const generate = ({ status, data = [], message = '' }) => ({
  status,
  message,
  data,
});

module.exports = { generate };
