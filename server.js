/*
* this example creates a local server that can be served to a local wifi access point on the Pi in order to configure the device on-site. 
* routes are just an example of how the device could be configured.
*/

'use strict';
const express = require('express');
const app = express();
const iothub = require('./lib/iothub');
const wifi = require('./lib/wifi');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('./public/index.html')
});

app.get('/provision', (req, res) => {
  iothub.provisionDevice((error) => {
    if (error) return res.status(500).send('provisioning failed');

    console.log('device was successfully provisioned with IoT Hub');
    res.send('provisioning successful');
  });
});

app.get('/connectwifi', (req, res) => {
  wifi.setupNetworkInterface(options, (error) => {
    if (error) return res.status(500).send('wifi setup failed');

    console.log('wifi was successfully set up');
    send.send('wifi successful');
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});


