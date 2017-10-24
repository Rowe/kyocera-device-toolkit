const device_information = require('./device_information');
const device_counter = require('./device_counter');
const device_control = require('./device_control');
const device_authentication = require('./device_authentication');

const request = require('./request');

function getRequestOptions(host, path) {
    return {
        host: host,
        port: 9090,
        method: 'POST',
        rejectUnauthorized: false,
        protocol: 'http:',
        path: path,
        headers: {
            'Host': '' + host + ':' + 9090,
            'Content-Type': 'application/soap+xml; charset=utf-8',
            'Connection': 'close'
        }
    }
}


/**
 * get model authentication status
 * @param host
 * @param callback
 */
function getAuthenticationStatus(host, callback) {
    const options = getRequestOptions(host, device_authentication.path);
    const postData = device_authentication.get_authentication_status_body;
    request.post(options, postData, function (soapBody) {
        callback(soapBody[0]['kmauth:get_authentication_statusResponse'][0]);
    });
}

/**
 * Local Authentication login
 * @param host
 * @param callback
 */
function login(host, callback) {
    getAuthenticationStatus(host, function (response) {
        if (response['kmauth:authentication_method'][0] == 'LOCAL_AUTHENTICATION') {
            const options = getRequestOptions(host, device_authentication.path);
            const postData = device_authentication.login_system_body;
            request.post(options, postData, function (result) {
                const token = result[0]['kmauth:login_systemResponse'][0]['kmauth:usertoken'][0]['kmauth:token'][0];
                callback(token);
            })
        }
    });
}


function restart(host, callback) {
    login(host, function (token) {
        var requestXML = new String(device_control.body);
        var postData = requestXML.replace(/{token}/, token);
        const options = getRequestOptions(host, device_control.path);
        request.post(options, postData, function (soapBody) {
            callback(JSON.stringify(soapBody[0]['kmdevctrl:restart_deviceResponse'][0]));
        })
    })
}

function getDeviceInfo(host, callback) {
    const options = getRequestOptions(host, device_information.path);
    const postData = device_information.body;
    request.post(options, postData, function (soapBody) {
        callback(soapBody[0]['kmdevinfo:get_device_constitution_informationResponse'][0]['kmdevinfo:information'][0])
    });
}

function getDeviceCounter(host, callback) {
    const options = getRequestOptions(host, device_counter.path);
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
exports.restart = restart;