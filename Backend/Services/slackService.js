require('dotenv').config();
const axios = require('axios');


exports.sendToSlack = async (message) => {
  await axios.post(process.env.SLACK_WEBHOOK_URL, {
    text: `📝 *Todo Summary*\n${message}`
  });
};