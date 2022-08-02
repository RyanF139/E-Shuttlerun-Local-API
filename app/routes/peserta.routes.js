const express = require("express");
const router = express.Router();
const peserta = require("../controllers/peserta.controller");
const upload = require("../middlewares/upload");

let routes = (app) => {
    router.post("/peserta/upload", upload.single("file"), peserta.upload); //Import Excel Peserta

    router.get("/", peserta.GetPeserta); //Get All List Peserta

    router.get("/peserta", peserta.GetPesertaId); //Get Peserta By pesertaid

    router.get("/peserta/list", peserta.GetPesertaBySelksiid); //Get Peserta By Seleksi ID

    router.get("/peserta/search", peserta.GetPesertaNrp); //Get Peserta By Nrp
    
    router.get("/peserta/capaian", peserta.GetDaftarCapaian); //Get Daftar Capaian By Seleksi ID

    router.post("/nilai", peserta.PostNilai); //post Nilai
    
    router.get("/nilai/ranking", peserta.GetNilaiTerbaik); //Get Nilai Terbaik By Seleksi ID
    
    router.get("/dashboard", peserta.GetDashboardInfo); //Get Dashboard By Seleksi ID

    router.get("/nilai/list", peserta.GetDaftarCapaianPage); //Get Daftar Capaian with pagenation

    router.get("/list/peserta", peserta.GetListPesertaPage); //Get Peserta By SeleksiId pagenation

    app.use("/api/v2/garjas", router);
  };


  module.exports = routes;