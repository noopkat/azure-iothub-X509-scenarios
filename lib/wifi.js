const fs = require('fs');

// this function is a naive example of setting up wifi on a pi, only for illustrative purposes.
//  Ideally there'd be a bash script execution and a reboot instead.
const setupNetworkInterface = function({ssid, password}, callback) {
  const wifiCredentials = `auto lo
    iface lo inet loopback
    iface eth0 inet dhcp
    allow-hotplug wlan0
    auto wlan0
    iface wlan0 inet dhcp
    wpa-ssid "${ssid}"
    wpa-psk "${password}"`;

   fs.appendFile('/network/interfaces', wifiCredentials, function(error) {
     return callback(error);
   }); 
}

module.exports = setupNetworkInterface;
