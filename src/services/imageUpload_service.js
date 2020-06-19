import multer from "multer";

export const imageUpload = async(file, token) => {
    if (!token || token.length === 0) return {
        status: 403,
        body: "No token"
    }

    console.log(file)

    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            files: 1,
            fileSize: 5000
        }
    }).single("file");

    try {
        await upload(file);

    } catch (error) {
        throw error
    }





}