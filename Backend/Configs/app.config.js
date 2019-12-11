const Multer = require('multer');
const path = require('path');
const Cloudinary = require('cloudinary').v2;

exports.Config = {
    port: process.env.PORT || 3000,
    db: process.env.MONGO || 'mongodb://luisgomez11:luis123456@ds211875.mlab.com:11875/edsocial',
    Token: process.env.Token || 'SecretToken',
    Encrypt: process.env.Encrypt || 'FHFWIUFHEFUEFHNJDSFNDsknskfnwiwikwfwf.fror2-rp29o2292--<'
}

//Storage configuration multer
function disk(id) {
    return Multer.diskStorage({
        destination: path.join(__dirname, '../Uploads'),
        filename: (req, file, cb) => {
            cb(null, id + path.extname(file.originalname));
        }
    });
}

//Export Configuration multer
exports.Storage = (id) => {
    return Multer({
        storage: disk(id),
        limits: { fileSize: 5000000 }
    }).single('image');
}

//this enviroment variables
//Config Cloudinary
Cloudinary.config({
    cloud_name: 'db5gphaih',
    api_key: '352858457577417',
    api_secret: 'vIx5mexlS2EVNrHTQElmUTo7JQc'
});

exports.Cloudinaryv2 = Cloudinary;