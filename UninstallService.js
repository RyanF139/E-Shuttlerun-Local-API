const Service = require('node-windows').Service

const svc = new Service
({
    name        : "ShuttlerunBasicServer",
    description : "Server Local Shuttlerun",
    script      : "C:\\Users\\Ryan\\Documents\\Project TCB\\Project 2022\\E-Shuttlerun\\Main Project\\E-Shuttlerun_V.01\\2. api-local-shuttlerun\\server.js" 

})

svc.on('Uninstall', function(){
    console.log("Uninstall Complete");
})

svc.uninstall()