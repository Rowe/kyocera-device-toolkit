const request = require('./req');

/**
 * get model authentication status
 * @param host
 * @param callback
 */
function getAuthenticationStatus(host, callback) {
    const options = request.getOptions(host, '/ws/km-wsdl/security/authentication_authorization');
    const postData = '<?xml version="1.0" encoding="utf-8" ?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope" xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:xop="http://www.w3.org/2004/08/xop/include" xmlns:ns1="http://www.kyoceramita.com/ws/km-wsdl/security/authentication_authorization"> <SOAP-ENV:Header>     <wsa:Action SOAP-ENV:mustUnderstand="true">http://www.kyoceramita.com/ws/km-wsdl/security/authentication_authorization/get_authentication_status</wsa:Action> </SOAP-ENV:Header><SOAP-ENV:Body><ns1:get_authentication_statusRequest/> </SOAP-ENV:Body></SOAP-ENV:Envelope>';
    request.post(options, postData, function (response) {
        callback(response['kmauth:get_authentication_statusResponse']);
    });
}

/**
 * Local Authentication login
 *
 * @param host
 * @param callback
 */
function login(host, callback) {
    getAuthenticationStatus(host, function (response) {
        if (response['kmauth:authentication_method'] == 'LOCAL_AUTHENTICATION') {
            const options = request.getOptions(host, '/ws/km-wsdl/security/authentication_authorization');
            const postData = '<?xml version="1.0" encoding="utf-8"?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope" xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:xop="http://www.w3.org/2004/08/xop/include" xmlns:ns1="http://www.kyoceramita.com/ws/km-wsdl/security/authentication_authorization"><SOAP-ENV:Header><wsa:Action SOAP-ENV:mustUnderstand="true">http://www.kyoceramita.com/ws/km-wsdl/security/authentication_authorization/login_system</wsa:Action></SOAP-ENV:Header><SOAP-ENV:Body><ns1:login_systemRequest><ns1:authentication_method>LOCAL_AUTHENTICATION</ns1:authentication_method><ns1:userid>Admin</ns1:userid><ns1:password>+nSQsKXZpas=</ns1:password></ns1:login_systemRequest></SOAP-ENV:Body></SOAP-ENV:Envelope>';
            request.post(options, postData, function (response) {
                const token = response['kmauth:login_systemResponse']['kmauth:usertoken']['kmauth:token'];
                callback(token);
            })
        }
    });
}


/**
 * Restart the device
 *
 * return a javascript object like {"kmdevctrl:result":"SUCCESS"}
 * @param host
 * @param callback
 */
function restart(host, callback) {
    login(host, function (token) {
        var postData = '<?xml version="1.0" encoding="utf-8"?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope" xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:c14n="http://www.w3.org/2001/10/xml-exc-c14n#" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:discovery="http://schemas.xmlsoap.org/ws/2005/04/discovery" xmlns:eventing="http://schemas.xmlsoap.org/ws/2004/08/eventing" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:addressing="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:xop="http://www.w3.org/2004/08/xop/include" xmlns:ns1="http://www.kyoceramita.com/ws/km-wsdl/information/device_control"> <SOAP-ENV:Header><wsa:Action SOAP-ENV:mustUnderstand="true">http://www.kyoceramita.com/ws/km-wsdl/information/device_control/restart_device</wsa:Action><wsse:Security><wsse:UsernameToken><wsse:Username>{token}</wsse:Username></wsse:UsernameToken></wsse:Security></SOAP-ENV:Header><SOAP-ENV:Body><ns1:restart_deviceRequest/></SOAP-ENV:Body></SOAP-ENV:Envelope>';
        postData = postData.replace(/{token}/, token);
        const options = request.getOptions(host, '/ws/km-wsdl/information/device_control');
        request.post(options, postData, function (response) {
            callback(response['kmdevctrl:restart_deviceResponse']);
        })
    });
}

function getDeviceInfo(host, callback) {
    const options = request.getOptions(host, '/ws/km-wsdl/information/device_information');
    const postData = '<?xml version="1.0" encoding="UTF-8" ?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope" xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:c14n="http://www.w3.org/2001/10/xml-exc-c14n#" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#" xmlns:wsc="http://schemas.xmlsoap.org/ws/2005/02/sc" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:xop="http://www.w3.org/2004/08/xop/include" xmlns:discovery="http://schemas.xmlsoap.org/ws/2005/04/discovery" xmlns:eventing="http://schemas.xmlsoap.org/ws/2004/08/eventing" xmlns:wsa="http://www.w3.org/2005/08/addressing" xmlns:kmdevinf="http://www.kyoceramita.com/ws/km-wsdl/information/device_information"> <SOAP-ENV:Header> <wsa:To>http://www.kyoceramita.com/ws/km-wsdl/information/device_information</wsa:To> <wsa:Action>http://www.kyoceramita.com/ws/km-wsdl/information/device_information/get_device_constitution_information</wsa:Action> </SOAP-ENV:Header> <SOAP-ENV:Body><kmdevinf:get_device_constitution_informationRequest></kmdevinf:get_device_constitution_informationRequest></SOAP-ENV:Body></SOAP-ENV:Envelope>';
    request.post(options, postData, function (response) {
        callback(response['kmdevinfo:get_device_constitution_informationResponse']['kmdevinfo:information']);
    });
}

/**
 * get device counter
 * @param host
 * @param callback
 */
function getDeviceCounter(host, callback) {
    const options = request.getOptions(host, '/ws/km-wsdl/log/counter_information');
    const postData = '<?xml version="1.0" encoding="utf-8" ?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope" xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:xop="http://www.w3.org/2004/08/xop/include" xmlns:ns1="http://www.kyoceramita.com/ws/km-wsdl/log/counter_information"> <SOAP-ENV:Header> <wsa:Action SOAP-ENV:mustUnderstand="true">http://www.kyoceramita.com/ws/km-wsdl/log/counter_information/get_counter</wsa:Action></SOAP-ENV:Header><SOAP-ENV:Body><ns1:get_counterRequest><ns1:counter_type>ALL_COUNTER</ns1:counter_type></ns1:get_counterRequest></SOAP-ENV:Body></SOAP-ENV:Envelope>';
    request.post(options, postData, function (response) {
        callback(response['kmcntinfo:get_counterResponse']);
    });
}

/**
 * get panel messages
 * @param host
 * @param callback
 */
function getPanelInfo(host, callback) {
    getDeviceInfo(host, function (response) {
        callback(response['kmdevinfo:panel_information']);
    });
}

/**
 * get tonner information
 * @param host
 * @param callback
 */
function getTonerInfo(host, callback) {
    getDeviceInfo(host, function (response) {
        callback(response['kmdevinfo:toner_information']);
    });
}

/**
 * get cassette information
 * @param host
 * @param callback
 */
function getCassetteInfo(host, callback) {
    getDeviceInfo(host, function (response) {
        callback(response['kmdevinfo:input_information']);
    });
}


exports.getPanelInfo = getPanelInfo;
exports.getTonerInfo = getTonerInfo;
exports.getCassetteInfo = getCassetteInfo;
exports.getDeviceCounter = getDeviceCounter;
exports.restart = restart;