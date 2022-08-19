import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";

const bucketName = process.env.TWEETS_AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

// upload a file to s3
export const uploadFile = (filepath, file) => {
	const fileStream = fs.createReadStream(filepath);

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		ContentType: file.mimetype,
		Key: file.filename,
	};

	return s3.upload(uploadParams).promise();
};

// download a file from s3
export const getFileStream = (fileKey) => {
	const downloadParams = {
		Key: fileKey,
		Bucket: bucketName,
	};

	return s3.getObject(downloadParams).createReadStream();
};

// delete a file from s3
export const deleteFile = (fileKey) => {
	const deleteParams = {
		Key: fileKey,
		Bucket: bucketName,
	};

	return s3.deleteObject(deleteParams).promise();
};
