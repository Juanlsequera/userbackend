import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { photoUpdateDto } from './dtos/photo-update.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('files'))
  upload(@UploadedFile() files: Express.Multer.File) {
    return this.photosService.upload(files);
  }

  @Get(':id')
  getFile(@Param('id') fileId: string) {
    return this.photosService.getFile(fileId);
  }

  @Get('url/:id')
  getUrlFile(@Param('id') fileId: string) {
    return this.photosService.getUrlFile(fileId);
  }

  @Patch('/edit')
  update(@Body() photoDto: photoUpdateDto) {
    return this.photosService.update(photoDto);
  }

  @Get('unplash/search/:id')
  searchPhotos(@Param('id') search: string) {
    return this.photosService.searchExternalPhotos(search);
  }

  @Get('unplash/upload/randomPhoto')
  uploadRandomPhoto() {
    return this.photosService.uploadRandomPhoto();
  }
}
