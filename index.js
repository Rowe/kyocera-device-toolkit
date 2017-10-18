const server = require("./server");
const router = require("./router");
const device = require("./device");

// const soap_request = require("./soap/soap_request");
//
// soap_request.getPanelMassage("10.170.80.156", function (res) {
//     console.log(res);
// });

//device.info('10.170.80.151');
server.start(router.route);
