const axios = require('axios');
require('dotenv').config();

exports.sendToSlack = async (message) => {
  await axios.post(process.env.SLACK_WEBHOOK_URL, {
    text: `📝 *Todo Summary*\n${message}`
  });
};