module.exports = (sequelize, Sequelize) => {
    
    const Seleksi = sequelize.define("seleksi", {         
      sprintid: {
        type: Sequelize.INTEGER
      },
      angkatanid: {
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },              
      jenis_peserta:{
        type: Sequelize.STRING
      },
      pemilik:{
        type: Sequelize.STRING
      },      
      tanggal_mulai: {
        type: Sequelize.DATE,
        get() {
          return new Date(this.getDataValue('tanggal_mulai')).toLocaleString();
      }
      },
      tanggal_selesai: {
        type: Sequelize.DATE,
        get() {
          return new Date(this.getDataValue('tanggal_selesai')).toLocaleString();
      }
      },
      

    },{
      tableName : "seleksi",
      timestamps: false
    });
  
    return Seleksi;
  };
  