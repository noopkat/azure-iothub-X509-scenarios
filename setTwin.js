/*
* this example creates a device with a pre-made x509 cert.
* it then updates the twin post creation with updated desired properties.
*/

'use strict';
 const iothub = require('azure-iothub');
 const uuid = require('node-uuid');
 const connectionString = '<iot hub connection string>';
 const registry = iothub.Registry.fromConnectionString(connectionString);

const deviceInfo = {
  deviceId: '<DEVICE ID>',
  status: 'enabled',
  authentication: {
    x509Thumbprint: {
      primaryThumbprint: "<PRIMARY THUMBPRINT>",
      secondaryThumbprint: "<SECONDARY THUMBPRINT>"
    }
  }
};

registry.create(deviceInfo, (error, createdDeviceInfo) => {
  if (error) return console.error(error);

  registry.getTwin(createdDeviceInfo.deviceId, (error, twin) => {
    if (error) return console.error(`${error.constructor.name}: ${err.message}`);

    const patch = {
      properties: {
        desired: {
          telemetryConfig: {
            configId: uuid.v4()
            sendFrequency: '5m' 
          }
        }
      }
    }

   twin.update(patch, (error) => {
     if (error) return console.error(`Could not update twin: ${error.constructor.name}: ${err.message}`);
     console.log(`${twin.deviceId} twin updated successfully`);
   });
 });
});

