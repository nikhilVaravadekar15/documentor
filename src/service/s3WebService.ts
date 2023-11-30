/* eslint-disable import/no-anonymous-default-export */
import { AWSError, config, S3 } from 'aws-sdk';
import { Progress } from 'aws-sdk/lib/request';
import { HeadObjectRequest } from 'aws-sdk/clients/s3';


class S3WebService {
    private s3: S3;
    private uploadPath: string = "uploads/"
    private bucket: string = process.env.NEXT_PUBLIC_AWS_S3_BUCKET!;
    private region: string = process.env.NEXT_PUBLIC_AWS_S3_REGION!;
    private accessKeyId: string = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!;
    private secretAccessKey: string = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!;

    constructor() {
        const awsConfig: S3.ClientConfiguration = {
            region: this.region,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
        }

        config.update(awsConfig);
        this.s3 = new S3(
            {
                params: {
                    Bucket: this.bucket
                },
                region: this.region
            }
        )
    }

    async upload(file: File) {
        let error: AWSError | null = null
        const file_key: string = this.uploadPath + Date.now().toString() + file.name.replace(" ", "-")
        const bytes: ArrayBuffer = await file!.arrayBuffer()
        const fileBuffer: Buffer = Buffer.from(bytes)

        const uploaded = this.s3.putObject({
            Bucket: this.bucket,
            Key: file_key,
            Body: fileBuffer,
            ContentType: "application/pdf",
        }).on("httpUploadProgress", (progress: Progress) => {
            console.log(`Uploading to aws S3 ${progress.loaded * 100 / progress.total}`)
        }).promise()

        await uploaded.then((result) => {
            console.log("successfully uploaded to aws s3")
        }).catch((error: AWSError) => {
            console.error(error)
            error = error
        });
        return await Promise.resolve({
            file_key: file_key,
            file_name: file.name,
            error: error
        })

    }

    getS3Url(file_key: string) {
        return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${file_key}`
    }

    async getFileFroms3(file_key: string) {
        const file = await this.s3.getObject({
            Bucket: this.bucket,
            Key: file_key
        }).promise()
        return file.Body as Buffer;
    }

    async deleteFileFroms3(file_key: string) {

        try {
            const params: HeadObjectRequest = {
                Bucket: this.bucket,
                Key: file_key
            }

            await this.s3.headObject(params).promise()
            console.log("File Found in S3")
            try {
                await this.s3.deleteObject(params).promise()
                console.log("file deleted Successfully")
            }
            catch (error: AWSError | any) {
                throw new Error("ERROR in file deleting: " + JSON.stringify(error.message))
            }
        } catch (error: AWSError | any) {
            throw new Error("File not Found Error: " + error.message)
        }


    }
}

export default new S3WebService()
