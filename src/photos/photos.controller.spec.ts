import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { photoUpdateDto } from './dtos/photo-update.dto';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';

describe('PhotosController', () => {
  let controller: PhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotosController],
      providers: [PhotosService, ConfigService],
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an especific error when controller failed', async () => {
    const PhotosService = {
      photoUpdateDto: jest
        .fn()
        .mockImplementation(() =>
          Promise.reject(new Error('Internal Server Error')),
        ),
    };
    expect(PhotosService).toBeDefined();
  });

  it('should return an dto', async () => {
    const photoObject: photoUpdateDto = { name: 'pepe', newName: 'lala' };
    expect(photoObject).toBeDefined();
  });
});
