const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'./public/products')
    },
    filename : (req, file, cb)=>{
        // console.log(req.body.name)
        // console.log(Date.now() + "--" + req.body.name + "--" + file.originalname)
        cb(null,Date.now() + "-" + req.body.name + "-" + file.originalname)
    }
})

const upload = multer({
    storage:fileStorageEngine
})

module.exports = {upload}