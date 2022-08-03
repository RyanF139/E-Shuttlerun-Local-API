const db = require("../models");
const Seleksi = db.seleksi;
const Users = db.user;
const Op = db.Sequelize.Op;


const getSeleksi = async (req, res) => {  
  Seleksi.findAll()
    .then(data => {
      res.status(200).json 
      ({
        status : "Success",
        message : "All Seleksi",        
        data : data
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

const findSeleksiStarted = (req, res) => {    
  Seleksi.findAll({ where: { status: "started" } })
    .then(data => {
      res.status(200).json
      ({
        status : "Success",
        message : "Seleksi Berlangsung",
        data : data
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

const findSeleksiDone = (req, res) => {    
  Seleksi.findAll({ where: { status: "DONE" } })
    .then(data => {
      res.status(200).json
      ({
        status : "Success",
        message : "Seleksi Berakhir",
        data : data
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


// Create and Save a new Seleksi
const CreateSeleksi = (req, res) => {
  // Validate request
  if (!req.body.nama) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  var status = "STARTED"
  const seleksi = {
    nama: req.body.nama,
    jenis_peserta: req.body.jenis_peserta,
    pemilik: req.body.pemilik,
    tanggal_mulai:req.body.tanggal_mulai,
    tanggal_selesai:req.body.tanggal_selesai,
    sprintid:req.body.sprintid,
    angkatanid:req.body.angkatanid,
    status:status,  
  };

  // Save Tutorial in the database
  Seleksi.create(seleksi)
    .then(data => {
      res.status(200).json
      ({
          status:"Success",
          message:"Seleksi berhasil di tambahkan",
          data:data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};


//Delete Seleksi
const DeleteSeleksi = (req, res) => {
  const {seleksiid} = req.query;

  Seleksi.destroy({
    where: { id: seleksiid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status:"Success",
          message: "Seleksi was deleted successfully!"
        });
      } else {
        res.send({
          status:"Error",
          message: `Cannot delete Seleksi with id=${seleksiid}. Maybe Seleksi was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status:"Error",
        message: "Could not delete Seleksi with id=" + seleksiid
      });
    });

    // & Delete Testor
    Users.destroy({
      where: { seleksiid: seleksiid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            status:"Success",
            message: "Testor was deleted successfully!"
          });
        } else {
          res.send({
            status:"Error",
            message: `Cannot delete Testor with id=${seleksiid}. Maybe Testor was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          status:"Error",
          message: "Could not delete Seleksi with id=" + seleksiid
        });
      });
};


//Edit Seleksi
const EditSeleksi = (req, res) => {
  const id = req.params.id;

  Seleksi.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status : "Success",
          message: "Seleksi was updated successfully.",          
        });
      } else {
        res.send({
          status : "Error",
          message: `Cannot update Seleksi with id=${id}. Maybe Seleksi was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status : "Error",
        message: "Error updating Seleksi with id=" + id
      });
    });
};


//Get Seleksi by Id
const GetSeleksiId = async (req, res) => {
  const id = req.params.id;  
  Seleksi.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).json
        ({
          status: "Success",
          message: `Seleksi Id = ${id}.`,         
          data : data
        });
      } else {
        res.status(404).send({
          message: `Cannot find Seleksi with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Seleksi with id=" + id
      });
    });
};

module.exports = {        
  getSeleksi,
  findSeleksiStarted,
  findSeleksiDone,
  CreateSeleksi,
  DeleteSeleksi,
  EditSeleksi,
  GetSeleksiId,
};


  
