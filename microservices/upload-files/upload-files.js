const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);



const uploadImage = async(image) => {

    let { secure_url } = await cloudinary.uploader.upload(image);
    return secure_url;
}
const deleteImage = async(image = '') => {
    const nameArr = image.split('/');
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split('.');
    await cloudinary.uploader.destroy(public_id);

}


module.exports = { uploadImage, deleteImage }