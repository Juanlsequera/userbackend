import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PhotosService } from './photos.service';

describe('IndustryService', () => {
  let service: PhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotosService, ConfigService],
    }).compile();

    service = module.get<PhotosService>(PhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be url file', () => {
    const urlfile = service.getUrlFile('batman.jpeg');
    expect(urlfile).toBeDefined();
  });

  it('should be file', () => {
    const file = service.getFile('batman.jpeg');
    expect(file).toBeDefined();
  });
});
