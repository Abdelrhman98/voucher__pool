import fs from 'firebase-admin';
import configrations from '../../config/index.js';
import _ from 'lodash'

const bucket = fs.storage().bucket();

export const uploadImage = (req, res, next) => {
    if (!req.file) return next();
    const imagem = req.file;
    const pathName = Date.now() + '.' + imagem.originalname.split('.').pop();
    const file = bucket.file('profile/' + pathName);
    const stream = file.createWriteStream({
        metaData: {
            contentType: imagem.mimetype
        }
    })
    stream.on("error", (err) => {
        console.error(err)
    })

    stream.on('finish', async () => {
        await file.makePublic()
        req.file.firebaseUrl = `https://storage.googleapis.com/${configrations.firebaseBucket}/profile/${pathName}`
        next();
    })
    stream.end(imagem.buffer)
}


export const uploadOneImage = (fileo, filePath) => {
    if (!fileo) return;
    return new Promise((resolve, reject)=>{
        const imagem = fileo;
        const pathName = Date.now() + '.' + imagem.originalname.split('.').pop();
        const file = bucket.file(`${filePath}${pathName}`);
        const stream = file.createWriteStream({
            metaData: {
                contentType: imagem.mimetype
            }
        })
        stream.on("error", (err) => {
            console.error(err)
            reject(err);
        })
    
        let x = stream.on('finish', async () => {
            await file.makePublic()
            resolve(`https://storage.googleapis.com/${configrations.firebaseBucket}/${filePath}${pathName}`);
        })
        stream.end(imagem.buffer);
    })
}


export const uploadMultiImage = (files, filePath) => {
    let imges = [];
    if (_.isEmpty(files)) return;
    for (let fileo of files) {
        const filePathName = filePath;
        const imagem = fileo;
        const pathName = Date.now() + '.' + imagem.originalname.split('.').pop();
        const file = bucket.file(`${filePathName}/` + pathName);
        const stream = file.createWriteStream({
            metaData: {
                contentType: imagem.mimetype
            }
        })
        stream.on("error", (err) => {
            console.error(err)
        })

        stream.on('finish', async () => {
            await file.makePublic()
        })
        stream.end(imagem.buffer)
        imges.push(`https://storage.googleapis.com/${configrations.firebaseBucket}/${filePathName}/${pathName}`);
    }
    return imges;
}
