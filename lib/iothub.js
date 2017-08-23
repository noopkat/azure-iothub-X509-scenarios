const fs = require('fs');
const Protocol = require('azure-iot-device-mqtt').Mqtt;
const Client = require('azure-iot-device').Client;

//  ie "HostName=<iothub_host_name>;DeviceId=<device_id>;x509=true"
const connectionString = '<DEVICE CONNECTION STRING WITH x509=true>';
const certFile = '<PATH-TO-CERTIFICATE-FILE>';
const keyFile = '<PATH-TO-KEY-FILE>';
const passphrase = '<KEY PASSPHRASE IF ANY>';

const provisionDevice = function(callback) {
  const client = Client.fromConnectionString(connectionString, Protocol);
  const options = {
     cert: fs.readFileSync(certFile, 'utf-8').toString(),
     key: fs.readFileSync(keyFile, 'utf-8').toString(),
     passphrase: passphrase
   };

  client.setOptions(options);
  client.open(callback);
};

module.exports = provisionDevice;
