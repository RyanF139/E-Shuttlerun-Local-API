module.exports = (sequelize, Sequelize) => {
    
    const Peserta = sequelize.define("peserta", {         
     
      nama: {
        type: Sequelize.INTEGER
      },
      nrp: {
        type: Sequelize.INTEGER
      },
      pangkat: {
        type: Sequelize.STRING
      },
      jabatan: {
        type: Sequelize.STRING
      },              
      korps:{
        type: Sequelize.STRING
      },
      tanggal_lahir:{
        type: Sequelize.DATE
      },      
      jenis_kelamin: {
        type: Sequelize.STRING
      },
      subjenis_test: {
        type: Sequelize.STRING
      },
      hasil:{
        type: Sequelize.STRING
      },
      testor:{
        type: Sequelize.STRING
      },
      status:{
        type : Sequelize.BOOLEAN
      },
      waktu_selesai: {
        type : Sequelize.DATE,
        get() {
          return new Date(this.getDataValue('waktu_selesai')).toLocaleString();
      }
      },
      // published: {
      //   type: Sequelize.BOOLEAN
      // },
      seleksiid:{
        type : Sequelize.INTEGER
      },
    },{
      tableName : "peserta",
      timestamps: false
    });
  
    return Peserta;
  };
  