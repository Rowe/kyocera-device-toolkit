const device_information = require('./device_information');
const device_counter = require('./device_counter');
const device_authentication = require('./device_authentication');

const request = require('./request');

function getRequestOptions(host, port, path, action) {
    return {
        host: host,
        port: port,
        method: 'POST',
        rejectUnauthorized: false,
        protocol: 'http:',
        path: path,
        headers: {
            'Host': '' + host + ':' + port,
            'Content-Type': 'application/soap+xml; charset=utf-8; action="' + action + '"',
            'Connection': 'close',
            'KMDEVINF_SOAPAction': action,
        }
    }
}

function getAuthenticationStatus(host, callback){
    const options = getRequestOptions(host, 9090, device_authentication.path, device_authentication.get_authentication_status_action);
    const postData = device_authentication.get_authentication_status_body;
    request.post(options, postData, function (soapBody) {
        callback(JSON.stringify(soapBody));
    });
}

function getDeviceInfo(host, callback) {
    const options = getRequestOptions(host, 9090, device_information.path, device_information.action);
    const postData = device_information.body;
    request.post(options, postData, function (soapBody) {
        callback(soapBody[0]['kmdevinfo:get_device_constitution_informationResponse'][0]['kmdevinfo:information'][0])
    });
}

function getDeviceCounter(host, callback) {
    const options = getRequestOptions(host, 9090, device_counter.path, device_counter.action);
    const postData = device_counter.body;
    request.post(options, postData, function (soapBody) {
        callback(JSON.stringify(soapBody[0]['kmcntinfo:get_counterResponse'][0]));
    });
}

function getPanelInfo(host, callback) {
    getDeviceInfo(host, function (soap) {
        callback(JSON.stringify(soap['kmdevinfo:panel_information']));
    });
}

function getTonerInfo(host, callback) {
    getDeviceInfo(host, function (soap) {
        callback(JSON.stringify(soap['kmdevinfo:toner_information']));
    });
}

function getCassetteInfo(host, callback) {
    getDeviceInfo(host, function (soap) {
        callback(JSON.stringify(soap['kmdevinfo:input_information']));
    });
}


exports.getPanelInfo = getPanelInfo;
exports.getTonerInfo = getTonerInfo;
exports.getCassetteInfo = getCassetteInfo;
exports.getDeviceCounter = getDeviceCounter;
exports.getAuthenticationStatus = getAuthenticationStatus;