const device_information = require('./device_information');
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

function getPanelInfo(host, callback) {

    const options = getRequestOptions(host, 9090, device_information.path, device_information.action);
    const postData = device_information.body;
    request.post(options, postData, function (soapBody) {
        console.dir(soapBody);

        const panelMassageContxt = soapBody[0]
            ['kmdevinfo:get_device_constitution_informationResponse']
            [0]
            ['kmdevinfo:information']
            [0]
            ['kmdevinfo:panel_information']
            [0]
            ['kmdevinfo:message']
            [0];
        callback(JSON.stringify({panelinfo: panelMassageContxt}));
    });
}

function getTonerInfo(host, callback) {
    const options = getRequestOptions(host, 9090, device_information.path, device_information.action);
    const postData = device_information.body;
    request.post(options, postData, function (soapBody) {
        const toners = soapBody[0]
            ['kmdevinfo:get_device_constitution_informationResponse']
            [0]['kmdevinfo:information']
            [0]['kmdevinfo:toner_information'];

        for (let i = 0; i < toners.length; i++) {

        }
        callback(JSON.stringify({tonerInfo: toners}));
    })
}


exports.getPanelInfo = getPanelInfo;
exports.getTonerInfo = getTonerInfo;
