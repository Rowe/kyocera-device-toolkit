exports.path = '/ws/km-wsdl/log/counter_information';
exports.action = 'http://www.kyoceramita.com/ws/km-wsdl/log/counter_information/get_counter';
exports.body = '<?xml version="1.0" encoding="utf-8" ?>\n' +
                '<SOAP-ENV:Envelope\n' +
                'xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope"\n' +
                'xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding"\n' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
                'xmlns:xsd="http://www.w3.org/2001/XMLSchema"\n' +
                'xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing"\n' +
                'xmlns:xop="http://www.w3.org/2004/08/xop/include"\n' +
                'xmlns:ns1="http://www.kyoceramita.com/ws/km-wsdl/log/counter_information">\n' +
                '<SOAP-ENV:Header>\n' +
                '<wsa:Action SOAP-ENV:mustUnderstand="true">http://www.kyoceramita.com/ws/km-wsdl/log/counter_information/get_counter</wsa:Action>\n' +
                '</SOAP-ENV:Header>\n' +
                '<SOAP-ENV:Body>\n' +
                '<ns1:get_counterRequest>\n' +
                '<ns1:counter_type>\n' +
                'ALL_COUNTER\n' +
                '</ns1:counter_type>\n' +
                '</ns1:get_counterRequest>\n' +
                '</SOAP-ENV:Body>\n' +
                '</SOAP-ENV:Envelope>';