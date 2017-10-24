exports.path = '/ws/km-wsdl/information/device_control';
exports.body = '<?xml version="1.0" encoding="utf-8"?>\n' +
'<SOAP-ENV:Envelope\n' +
'xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope"\n' +
'xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding"\n' +
'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
'xmlns:xsd="http://www.w3.org/2001/XMLSchema"\n' +
'xmlns:c14n="http://www.w3.org/2001/10/xml-exc-c14n#"\n' +
'xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"\n' +
'xmlns:ds="http://www.w3.org/2000/09/xmldsig#"\n' +
'xmlns:discovery="http://schemas.xmlsoap.org/ws/2005/04/discovery"\n' +
'xmlns:eventing="http://schemas.xmlsoap.org/ws/2004/08/eventing"\n' +
'xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"\n' +
'xmlns:addressing="http://schemas.xmlsoap.org/ws/2004/08/addressing"\n' +
'xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing"\n' +
'xmlns:xop="http://www.w3.org/2004/08/xop/include"\n' +
'xmlns:ns1="http://www.kyoceramita.com/ws/km-wsdl/information/device_control">\n' +
'<SOAP-ENV:Header>\n' +
    '<wsa:Action SOAP-ENV:mustUnderstand="true">http://www.kyoceramita.com/ws/km-wsdl/information/device_control/restart_device</wsa:Action>\n' +
    '<wsse:Security>\n' +
        '<wsse:UsernameToken>\n' +
            '<wsse:Username>{token}</wsse:Username>\n' +
        '</wsse:UsernameToken>\n' +
    '</wsse:Security>\n' +
'</SOAP-ENV:Header>\n' +
'<SOAP-ENV:Body><ns1:restart_deviceRequest/></SOAP-ENV:Body>\n' +
'</SOAP-ENV:Envelope>'