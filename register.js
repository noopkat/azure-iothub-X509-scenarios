/*
* this example takes a newline delimited list of device ids and generates x509 certs / registers the new devices with IoT Hub
*/

const fs = require('fs');
const child = require('child_process');

const processDeviceList = (error, file) => {
  if (error) return console.error('error reading device file', error);

  const deviceList = file.toString().trim().split(/\r?\n/);
  console.log(`${deviceList.length} devices`);

  deviceList.forEach(provisionDevice);
};

const provisionDevice = (deviceName) => {
  console.log(`registering  ${deviceName}`);
  child.spawn('iothub-explorer', ['create', deviceName, '-x', '-dv', '365'], {}, (error) => {
    if (error) console.log(error);  
  });
};

fs.readFile('deviceList.txt', processDeviceList);

