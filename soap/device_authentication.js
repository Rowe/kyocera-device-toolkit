exports.path = '/ws/km-wsdl/security/authentication_authorization';
exports.get_authentication_status_action = 'http://www.kyoceramita.com/ws/km-wsdl/security/authentication_authorization/get_authentication_status'
exports.get_authentication_status_body = '<?xml version="1.0" encoding="utf-8" ?>\n' +
    '<SOAP-ENV:Envelope\n' +
    '        xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope"\n' +
    '        xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding"\n' +
    '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
    '        xmlns:xsd="http://www.w3.org/2001/XMLSchema"\n' +
    '        xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing"\n' +
    '        xmlns:xop="http://www.w3.org/2004/08/xop/include"\n' +
    '        xmlns:ns1="http://www.kyoceramita.com/ws/km-wsdl/security/authentication_authorization">\n' +
    '        <SOAP-ENV:Header>\n' +
    '            <wsa:Action SOAP-ENV:mustUnderstand="true">\n' +
    '                http://www.kyoceramita.com/ws/km-wsdl/security/authentication_authorization/get_authentication_status\n' +
    '            </wsa:Action>\n' +
    '        </SOAP-ENV:Header>\n' +
    '        <SOAP-ENV:Body>\n' +
    '            <ns1:get_authentication_statusRequest/>\n' +
    '        </SOAP-ENV:Body>\n' +
    '</SOAP-ENV:Envelope>';