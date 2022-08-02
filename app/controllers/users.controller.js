
const db = require("../models");
const Users = db.user;
const Op = db.Sequelize.Op;

exports.Login = async (req, res) => {
    const {username, password, subjenis_test} = req.body;
    var cek = await Users.findOne({ where : {username} })
    
    if(!cek)
    {
      res.status(400).json
      ({
        status  : "Error 400",
        message: "Username or Password does not match"
      })
    }

    const id = cek.id == null ? "null" : cek.id
    const nama = cek.nama == null ? "null" : cek.nama;
    const nrp = cek.nrp == null ? "null" : cek.nrp;
    const status_users = cek.status_users == null ? "null" : cek.status_users;
    const status_password = cek.status_password == null ? "null" : cek.status_password;

    if (cek.username == username && cek.password == password && cek.subjenis_test == subjenis_test)
    return res.status(200).json
    ({
        status : "Success",
        message: "Welcome " + cek.nama,
        data:
        {
            id : id,
            nama : nama,
            nrp  : nrp,
            role : status_users,
            status_password : status_password            
        }
    })
    else    
    return res.status(400).json
    ({
        status : "Error 400",
        message: "Username or Password does not match"
    })            
};

exports.ChangePassword = async (req, res) => {
  const {user_id, old_password, new_password} = req.body;
  const id = user_id;

  var cek = await Users.findOne({where : {password : old_password , id : user_id}})

  if(!cek)
  {
    res.status(400).json
    ({
      status : "Error", 
      message : "password lama salah" 
    })
  }

  var user = await Users.update({password : new_password, status_password:true} , {where :{ id : id}});

  if(user == 1)
  {
    res.status(200).json
    ({
      status : "Success",
      message : "Password berhasil diubah",      
    })
  }else{
    res.status(400).json
    ({
      status : "Error",
      message : "Password gagal diubah" 
    })
  }
  
}; 

