KYOCERA Device Toolkit
======================
The purpose of the project is to enable a client to retrieve and control kyocera devices status by an http request.


## Installation
In order to run the server, node and npm should be installed first.
You can download the latest version from [here](https://nodejs.org/en/download/). 

Both linux and windows need to be set environment variables if you download the binary files from the website.

Please run the command to update dependency first under the project path:
```
npm install
```

[cnpm](http://npm.taobao.org/) is necessary for Chinese location.
if the cnpm is installed, you should run the command:
```
cnpm install
```


## Usage
To start the server,
```
node index.js
```
It is possible to send http request with port 8888 to the server.

For example, request
```
http://localhost:8888/?host=10.170.80.100&action=panel
```
then return,
```
{"kmdevinfo:lock_status":"OFF","kmdevinfo:message":"processing"}
```


## Request Parameters
### `host`

The device network address including ip address or host name.

### `action`
 `panel`  
  The panel messages of the device.
  
`toner`  
The toner information with percentage level of the device.

 `cassette`  
 The cassette information with percentage level of the device.
 
 `counter`  
 The counter information of the device
 
 `restart`  
To restart the device.


 

