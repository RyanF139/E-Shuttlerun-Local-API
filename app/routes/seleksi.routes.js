module.exports = app => {
    const seleksi = require("../controllers/seleksi.controller.js");
    var router = require("express").Router();
  

    
    
    router.get("/", seleksi.getSeleksi); //Get Seleksi All

    router.get("/started",seleksi.findSeleksiStarted); //Get Seleksi Started
        
    router.get("/done",seleksi.findSeleksiDone); //Get Seleksi Done

    router.post("/",seleksi.CreateSeleksi); //Tamabah Seleksi
    
    router.delete("/:id", seleksi.DeleteSeleksi); //Delete One Seleksi

    router.post("/:id", seleksi.EditSeleksi); //Edit Seleksi

    router.get("/:id", seleksi.GetSeleksiId); // Get Seleksi By ID
        
    app.use('/seleksi', router);
  };
    