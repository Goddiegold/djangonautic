/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { CloudinaryStorage, } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
        });

        const params = {
            folder: "djangonautic-react"
        }

        return {
            storage: new CloudinaryStorage({
                cloudinary,
                params
            }),
        };
    }
}


export const deleteUploadedFile = (publicId: string, resource_type: string) => {
    if (!publicId) return null
    cloudinary.uploader.destroy(publicId, { resource_type }, (error, result) => {
        if (error) {
            console.error(`error on deleteUploadedFile-${publicId}`, error);
            throw new InternalServerErrorException("An error occured, this process couldn't be completed!")
        } else {
            console.error(`scucess on deleteUploadedFile-${publicId}`, result);
        }
    })
}
