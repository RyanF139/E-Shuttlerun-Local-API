module.exports = (sequelize, Sequelize) => {
    
  const User = sequelize.define("users", {         
    nama: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    status_users: {
      type: Sequelize.STRING
    },
    status_password: {
      type: Sequelize.BOOLEAN
    },
    subjenis_test: {
      type: Sequelize.STRING
    },
    nrp: {
    type: Sequelize.STRING
    },
    seleksiid: {
      type: Sequelize.INTEGER
    }
    
  },{
    tableName : "users",
    timestamps: false
  });

  return User;
};
