const db = require("../models");
const Peserta = db.peserta;
const Op = db.Sequelize.Op;

const readXlsxFile = require("read-excel-file/node");
const { peserta } = require("../models");
const { response } = require("express");
const { condition } = require("sequelize");

//Import Peserta
const upload = async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }

      var id_seleksi = req.body.seleksi_id;
      console.log(id_seleksi)
      let path = "C:\\Users\\Ryan\\Documents\\Project TCB\\Project 2022\\E-Shuttlerun\\Main Project\\E-Shuttlerun_V.01\\2. api-local-shuttlerun\\resources\\static\\assets\\upload\\" + req.file.filename;

        console.log(path)
      readXlsxFile(path).then((rows) => {
        // skip header
        rows.shift();
        var LIST = [];
        rows.forEach((row) => {
          let peserta = {     
            //id: row[0],
            nama: row[1],
            nrp: row[2],
            pangkat: row[3],
            jabatan: row[4],
            korps: row[5],
            tanggal_lahir: row[6],
            jenis_kelamin: row[7],                        
            seleksiid : id_seleksi,
            status: false
          };
          LIST.push(peserta);
        });

        //console.log(LIST)
        Peserta.bulkCreate(LIST)
          .then(() => {
            res.status(200).send({
              message: "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  };
  
//get All Peserta
const GetPeserta = (req, res) => {
    Peserta.findAll()
      .then(data => {
        res.status(200).json 
        ({
          status : "Success",
          message : "All Peserta",
          data : data
        })
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Peserta."
        });
      });
  };


//Get Peserta by Id
const GetPesertaId = (req, res) => {
    const {pesertaid} = req.query;
    const id = pesertaid;
    console.log(id);
    Peserta.findByPk(id)
      .then(data => {
        if (data) {
          res.status(200).json
          ({
            status: "Success",
            message: `Peserta Id = ${id}.`,
            data : data
          });
        } else {
          res.status(404).send({
            message: `Cannot find Peserta with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Peserta with id=" + id
        });
      });
  };

  //Get Peserta by IdSeleksi
  const GetPesertaBySelksiid = (req, res) => {
    const { seleksiid} = req.query;  
    //const seleksiid = req.params.seleksiid;
    console.log(seleksiid);    
    Peserta.findAll({ where: { seleksiid: seleksiid } })
      .then(data => {
        res.status(200).json
        ({
          status : "Success",          
          data : data
        })
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Peserta."
        });
      });
  };

  //Get Daftar Capaian
  const GetDaftarCapaian = (req, res) => {
    const {seleksiid} = req.query;    
    console.log(seleksiid);

    Peserta.findAll(  { attributes:[['id','nomor_test'],'nama','hasil',['testor','nama_testor'],'waktu_selesai'],order : [['waktu_selesai','DESC']] , where: {seleksiid :seleksiid , status : true }})
      .then(data => {
        res.status(200).json
        ({
          status : "Success",                
          data : data
        })
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Peserta."
        });
      });
  };


  //Post Nilai
  const PostNilai= async (req, res) => {
    const {pesertaid, waktu, namatestor, subjenis_test} = req.body;
    const id = pesertaid;
    const datetime =new Date().toLocaleString();
    
    var cek = await Peserta.findOne({where : {id : pesertaid}})
  
    if(!cek)
    {
      res.status(400).json
      ({
        status : "Error", 
        message : "Peserta dengan pesertaid tidak ditemukan" 
      })
    }
    
    
    var user = await Peserta.update({hasil : waktu, testor : namatestor, subjenis_test : subjenis_test, status : true, waktu_selesai : datetime} , {where :{ id : id}});
    //console.log("WAKTU" + datetime);    
    if(user == 1)
    {
      res.status(200).json
      ({
        status : "Success",
        message : "Hasil berhasil di insert", 
        
      })
    }else{
      res.status(400).json
      ({
        status : "Error",
        message : "Hasil gagal di insert" 
      })
    }
    
  }; 

  //Get Peserta by nrp
  const GetPesertaNrp = async (req, res) => {
    const {nrp} = req.query;
    var cek = await Peserta.findOne({ where : {nrp}})
    console.log(cek);    
    Peserta.findAll({ where: { nrp: nrp } })
      .then(data => {
        res.status(200).json
        ({
          status : "Success",          
          data : 
          {
            id : cek.id,
            nama : cek.nama,
            nrp : cek.nrp,
            pangkat : cek.pangkat ,
            jabatan : cek.jabatan,
            korps : cek.korps,
            tanggal_lahir : cek.tanggal_lahir,
            jenis_kelamin : cek.jenis_kelamin,
            hasil : cek.hasil,
            testor: cek.testor,
            status : cek.status,
            seleksiid : cek.seleksiid,
          }
        })
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Peserta."
        });
      });
  };
  
 //Get Niai Terbaik
 const GetNilaiTerbaik = async (req, res) => {
  const {seleksiid, subjenis_test} = req.query;
  console.log(subjenis_test);      
  Peserta.findAll(   {attributes:[['id','nomor_test'],'nama','hasil',['testor','nama_testor'],'waktu_selesai'] , order : [['hasil','ASC']] , where: {seleksiid :seleksiid , subjenis_test : subjenis_test , status : true}})
  // Peserta.findAll({  order : [['hasil','ASC']] , where: {seleksiid :seleksiid , subjenis_test : subjenis_test , status : true}})
    .then(data => {
      data.nomor_test = data.id
      console.log(data);
      res.status(200).json
      ({
        status : "Success",                
        data : data  
                        
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Peserta."
      });
    });
};

//Get Data Dashboard
const GetDashboardInfo= async (req, res) => {
  const {seleksiid, subjenis_test} = req.query;

  var Jumlah_peserta = await Peserta.count({where : {seleksiid : seleksiid, subjenis_test : subjenis_test}});
  var Antrian = await Peserta.count({where : {seleksiid : seleksiid , status : false , subjenis_test : subjenis_test}});
  var Selesai = await Peserta.count({where : {seleksiid : seleksiid , status : true , subjenis_test : subjenis_test}});
  return res.status(200).json
    ({
        status : "Success",
        message: "Info Dashboard",
        data:
        {
           total_peserta : Jumlah_peserta,
           belum_dinilai : Antrian,
           sudah_dinilai : Selesai,

        }
    })
};




//Get Daftar Capaian with pagenation
const getPaginationCapaian = (page, per_page) => {
  const limit = per_page ? + per_page : 3;
  const offset = page ? (page * limit) - limit : 0;
  return { limit, offset };
};

const getPagingDataCapaian = (data, page, limit) => {
  const { count: totalItems, rows: peserta } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);  
  return { totalItems, peserta, totalPages, currentPage };
};


const GetDaftarCapaianPage = (req, res) => {
  const { seleksiid, subjenis_test, page, per_page, search } = req.query;   
 
  const { limit, offset } = getPaginationCapaian(page, per_page);  
  
  Peserta.findAndCountAll({order : [['waktu_selesai','DESC']] , where: {
    seleksiid :seleksiid ,
     status : true, 
     subjenis_test : subjenis_test,
     nama: { [Op.like]: `%${search}%` }
  },limit,offset })
    .then(data => {
      const response = getPagingDataCapaian(data, page, limit);
      res.status(200).json
      ({
        status : "Success",
        data : response.peserta,
        total_page : response.totalPages,
        page : response.currentPage,
        total_data : response.totalItems,
        per_page : per_page
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

//Get List Peserta with pagenation
const getPaginationListPeserta = (page, per_page) => {
  const limit = per_page ? + per_page : 3;
  const offset = page ? (page * limit) - limit : 0;
  return { limit, offset };
};

const getPagingDataListPeserta = (data, page, limit) => {
  const { count: totalItems, rows: peserta } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);  
  return { totalItems, peserta, totalPages, currentPage };
};


const GetListPesertaPage = (req, res) => {
  const { seleksiid, subjenis_test, page, per_page, search } = req.query;   
 
  const { limit, offset } = getPaginationListPeserta(page, per_page);  
  
  Peserta.findAndCountAll({order : [['id','ASC']] , where: {
    seleksiid :seleksiid ,     
     subjenis_test : subjenis_test,
     nama: { [Op.like]: `%${search}%` }
  },limit,offset })
    .then(data => {
      const response = getPagingDataListPeserta(data, page, limit);
      res.status(200).json
      ({
        status : "Success",
        data : response.peserta,
        total_page : response.totalPages,
        page : response.currentPage,
        total_data : response.totalItems,
        per_page : per_page
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};




  module.exports = {
    upload,
    GetPeserta,
    GetPesertaId,
    GetPesertaBySelksiid,
    GetDaftarCapaian,
    PostNilai,
    GetPesertaNrp,
    GetNilaiTerbaik,
    GetDashboardInfo,
    GetDaftarCapaianPage,
    GetListPesertaPage
  };
