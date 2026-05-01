const image = require('../models/image');
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');
const fs = require('fs');

const uploadImageController = async(req, res)=>{
    try{
        //check if file is missing in requist object
        if(!req.file){
            return res.json({
                success: false,
                message: 'File is required! Please upload an image'
            })
        }

        //upload to cloudinary
        const {url, publicId} = await uploadToCloudinary(req.file.path)

        //stored the image url and publicId along with the uploaded user ID
        const newlyUploadedImage = new image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newlyUploadedImage.save();

        //delete the file from local storage
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newlyUploadedImage
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again "
        });
        
    };
};

//fetching Image
const fetchImagesController = async(req, res)=>{
    try{
        const images = await image.find({});
        
        if(images){
            res.status(200).json({
                success : true,
                data : images,
            }); 
        }

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again "
        });
    };
};

module.exports = {
    uploadImageController,
    fetchImagesController,
};
