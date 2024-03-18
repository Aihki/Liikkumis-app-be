import app from './app';
import https from 'https';
import fs from 'fs';

if (process.env.NODE_ENV === 'production') {
  const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
  const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');


  const options = {
    key: sslkey,
    cert: sslcert,
  };
  const httpsPort = process.env.HTTPS_PORT || 8001;
  https.createServer(options, app).listen(httpsPort);
 }

const port = process.env.PORT || 3001;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
