import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { photoUpdateDto } from './dtos/photo-update.dto';
import axios from 'axios';

@Injectable()
export class PhotosService {
  constructor(private readonly configService: ConfigService) {}

  async upload(files?: Express.Multer.File) {
    const buffer: Buffer = Buffer.from(files.buffer);
    return await this.uploadToS3(buffer, files?.originalname);
  }

  private async uploadToS3(
    buffer: Buffer,
    fileName: string,
  ): Promise<S3.ManagedUpload.SendData> {
    try {
      const s3 = new S3();
      const result = await s3
        .upload({
          Bucket: this.configService.get('AWS_BUCKET'),
          Body: buffer,
          Key: fileName,
        })
        .promise();
      return result;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getFile(fileId: string) {
    try {
      const s3 = new S3();
      return await s3
        .getObject({
          Bucket: this.configService.get('AWS_BUCKET'),
          Key: fileId,
        })
        .promise();
    } catch (error) {
      console.error(JSON.stringify(error));
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getUrlFile(fileId: string) {
    try {
      let params = {
        Bucket: this.configService.get('AWS_BUCKET'),
        Key: fileId,
        Expires: 600,
      };
      const s3 = new S3();
      return s3.getSignedUrl('getObject', params);
    } catch (error) {
      console.error(JSON.stringify(error));
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  update(photoDto: photoUpdateDto) {
    const { newName, name } = photoDto;
    let params = {
      Bucket: this.configService.get('AWS_BUCKET'),
      CopySource: `${this.configService.get('AWS_BUCKET')}/${name}`,
      Key: newName,
    };
    const s3 = new S3();
    const data = s3
      .copyObject(params)
      .promise()
      .then(() => {
        console.info(`new object: ${newName} , copied succesfully`);
        return s3
          .deleteObject({
            Bucket: this.configService.get('AWS_BUCKET'),
            Key: `${name}`,
          })
          .promise()
          .catch((error) => {
            console.error(`Error deleting object : ${name}`);
            console.error(JSON.stringify(error));
            throw new HttpException(error, HttpStatus.FORBIDDEN);
          });
      })
      .catch((error) => {
        console.error(JSON.stringify(error));
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      });
    return data;
  }

  async searchExternalPhotos(search: string) {
    const url = `${this.configService.get(
      'URL_PLASH',
    )}/search/photos?page=1&query=${search}&client_id=${this.configService.get(
      'ACCESS_KEY_UNPLASH',
    )}`;
    let { data } = await axios.get(url);
    return data;
  }

  async uploadRandomPhoto() {
    const url = `${this.configService.get(
      'URL_PLASH',
    )}/photos/random?client_id=${this.configService.get('ACCESS_KEY_UNPLASH')}`;
    let { data } = await axios.get(url);
    let response = await axios.get(data.urls.full, {
      responseType: 'arraybuffer',
    });
    return await this.uploadToS3(response.data, data.id);
  }
}
