exports.path = '/ws/km-wsdl/information/device_information';
exports.action = 'http://www.kyoceramita.com/ws/km-wsdl/information/device_information/get_device_constitution_information';
exports.body = '<?xml version="1.0" encoding="UTF-8" ?>\n' +
                '<SOAP-ENV:Envelope\n' +
                'xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope"\n' +
                'xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding"\n' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
                'xmlns:xsd="http://www.w3.org/2001/XMLSchema"\n' +
                'xmlns:c14n="http://www.w3.org/2001/10/xml-exc-c14n#"\n' +
                'xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"\n' +
                'xmlns:xenc="http://www.w3.org/2001/04/xmlenc#"\n' +
                'xmlns:wsc="http://schemas.xmlsoap.org/ws/2005/02/sc"\n' +
                'xmlns:ds="http://www.w3.org/2000/09/xmldsig#"\n' +
                'xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"\n' +
                'xmlns:xop="http://www.w3.org/2004/08/xop/include"\n' +
                'xmlns:discovery="http://schemas.xmlsoap.org/ws/2005/04/discovery"\n' +
                'xmlns:eventing="http://schemas.xmlsoap.org/ws/2004/08/eventing"\n' +
                'xmlns:wsa="http://www.w3.org/2005/08/addressing"\n' +
                'xmlns:kmdevinf="http://www.kyoceramita.com/ws/km-wsdl/information/device_information">\n' +
                '<SOAP-ENV:Header>\n' +
                '<wsa:To>http://www.kyoceramita.com/ws/km-wsdl/information/device_information</wsa:To>\n' +
                '<wsa:Action>http://www.kyoceramita.com/ws/km-wsdl/information/device_information/get_device_constitution_information</wsa:Action>\n' +
                '</SOAP-ENV:Header>\n' +
                '<SOAP-ENV:Body>\n' +
                '<kmdevinf:get_device_constitution_informationRequest>\n' +
                '</kmdevinf:get_device_constitution_informationRequest>\n' +
                '</SOAP-ENV:Body>\n' +
                '</SOAP-ENV:Envelope>';