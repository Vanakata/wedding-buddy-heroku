const incomingForm = require('formidable').IncomingForm;
const express = require('express');
const router = new express.Router();

module.exports = function upload(req,res){

    var form = new incomingForm();
    form.on('file',(field,file)=>{
        router.post('/upload',(req,res,next)=>{
            return res.status(200).json({
                success:true,
                message:'File upload succesfully'
            })
        })
    })
}
