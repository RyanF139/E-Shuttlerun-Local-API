const db = require("../models");
const Seleksi = db.seleksi;
const Op = db.Sequelize.Op;


exports.getSeleksi = async (req, res) => {  
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

exports.findSeleksiStarted = (req, res) => {    
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

exports.findSeleksiDone = (req, res) => {    
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
exports.CreateSeleksi = (req, res) => {
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
exports.DeleteSeleksi = (req, res) => {
  const id = req.params.id;

  Seleksi.destroy({
    where: { id: id }
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
          message: `Cannot delete Seleksi with id=${id}. Maybe Seleksi was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status:"Error",
        message: "Could not delete Seleksi with id=" + id
      });
    });
};


//Edit Seleksi
exports.EditSeleksi = (req, res) => {
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
exports.GetSeleksiId = async (req, res) => {
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



  
