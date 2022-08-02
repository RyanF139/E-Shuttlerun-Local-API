const express = require("express");
const router = express.Router();
const testor = require("../controllers/testor.controller");

let routes = (app) => {    

    router.get("", testor.GetTestorBySeleksiId); //Get Peserta By Seleksi ID

    router.post("", testor.RegisterTestor); // Tambah Testor

    router.post("/:id", testor.EditTestor); // Edit Testor

    router.delete("/:id", testor.DeleteTestor); // Delete Testor

    app.use("/api/v2/garjas/testor", router);
  };


  module.exports = routes;