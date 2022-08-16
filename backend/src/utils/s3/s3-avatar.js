import S3 from 'aws-sdk/clients/s3.js';
import fs from 'fs';

const bucketName = process.env.AVATARS_AWS_BUCKET__NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

// upload a file to s3
export const uploadFile = (filepath, file) => {
    const fileStream = fs.createReadStream(filepath);
    console.log(fileStream);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    };

    return s3.upload(uploadParams).promise();
};

// download a file from s3
export const getFileStream = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    };

    return s3.getObject(downloadParams).createReadStream();
};