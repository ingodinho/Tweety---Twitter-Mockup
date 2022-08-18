import S3 from "aws-sdk/clients/s3.js";

const bucketName = process.env.AVATARS_AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_URL_SIGNER_ACCESS_KEY;
const secretAccessKey = process.env.AWS_URL_SIGNER_SECRET_KEY;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

export const generateSignedUrl = async (fileKey) => {
	try {
		const url = await s3.getSignedUrlPromise("getObject", {
			Bucket: bucketName,
			Key: fileKey,
			Expires: 60,
		});
		return url;
	} catch (err) {
		s;
		return null;
	}
};
