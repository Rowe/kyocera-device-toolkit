KYOCERA Device Toolkit
======================
The purpose of the project is to enable a client to retrieve and control kyocera devices status by an http request.


## Installation
In order to run the server, node and npm should be installed first.
You can download the latest version from [here](https://nodejs.org/en/download/). 

Both linux and windows need to be set environment variables for node and npm if you download the binary files from the website.

[cnpm](http://npm.taobao.org/) is necessary for Chinese location.
Please run the command to update dependency first under the project path.
```
npm install
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
{"kmdevinfo:lock_status":"OFF","kmdevinfo:message":["准备打印。","安全级别低。"]}
```


## Request Parameters
#### host

The device network address including ip address or host name.

#### action
- panel – the panel messages of the device.
- toner – the toner information with percentage level of the device.
- cassette – the cassette information with percentage level of the device.
- counter – the counter information of the device
- restart - enable the device to be restarted.


 

