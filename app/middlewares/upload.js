const multer = require("multer");
const excelFilter = (req, file, cb) => {
  console.log(file)
    if (
      file.mimetype.includes("excel") ||
      file.mimetype.includes("spreadsheetml") 
      //file.mimetype.includes("text")
    ) {
      cb(null, true);
    } else {
      cb("Please upload only excel file FILE.", false);
    }
  };
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "C:\\Users\\Ryan\\Documents\\Project TCB\\Project 2022\\E-Shuttlerun\\Main Project\\E-Shuttlerun_V.01\\2. api-local-shuttlerun\\resources\\static\\assets\\upload");      
    },
    filename: (req, file, cb) => {
      console.log(file.originalname);
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
  module.exports = uploadFile;