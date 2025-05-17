const fs = require('fs');
function saveCredentials(email, password) {
  const credentials = { email, password };
  fs.writeFileSync('credentials.json', JSON.stringify(credentials, null, 2));
}
module.exports = { saveCredentials };