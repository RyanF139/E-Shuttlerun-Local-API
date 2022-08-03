const db = require("../models");
const Users = db.user;

//Get Testor by IdSeleksi
const GetTestorBySeleksiId = (req, res) => {
    const {subjenis_test, seleksiid} = req.query;
    //console.log(seleksiid);    
    Users.findAll({ where: { seleksiid: seleksiid , subjenis_test : subjenis_test} })
      .then(data => {
        res.status(200).json
        ({
          status : "Success",      
          message: "List Testor Seleksi ID = " + seleksiid,
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

  const RegisterTestor = (req, res) => {
    // Validate request
    if (!req.body.nama) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  

    // Tambah Testor    
    const user = {
      seleksiid:req.body.seleksiid,
      subjenis_test : req.body.subjenis_test,
      nama: req.body.nama,
      nrp: req.body.nrp,
      username: req.body.nama,
      password: req.body.nrp,            
      status_users : "TESTOR",      
    };
  
    // Save Testor in the database
    Users.create(user)
      .then(data => {
        res.status(200).json
        ({
            status:"Success",
            message:"Testor successfully added",
            data:data
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Testor."
        });
      });
  };

//Edit Testor
const EditTestor = (req, res) => {
    const id = req.params.id;
  
    Users.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            status : "Success",
            message: "Testor was updated successfully.",          
          });
        } else {
          res.send({
            status : "Error",
            message: `Testor can not be changed, because there is no change`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          status : "Error",
          message: "Error updating Testor with id=" + id
        });
      });
  };
  
//Delete Testor
const DeleteTestor = (req, res) => {
    const id = req.params.id;
  
    Users.destroy({
      where: { id: id }
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
            message: `Cannot delete Testor with id=${id}. Maybe Testor was not found!`
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

  module.exports = {        
    GetTestorBySeleksiId,    
    RegisterTestor,
    EditTestor,
    DeleteTestor
  };