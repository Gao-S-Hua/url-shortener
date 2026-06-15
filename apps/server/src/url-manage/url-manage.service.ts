import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isValidUrl } from '@url-shortener/shared';
import { IsNull, type Repository } from 'typeorm';
import { PaginatedUrlResponseDto } from './dto';
import { ShortUrlEntity } from './entities/short-url.entity';
import { encodeBase62 } from './utils';
@Injectable()
export class UrlManageService {
  constructor(
    @InjectRepository(ShortUrlEntity)
    private readonly shortUrlRepo: Repository<ShortUrlEntity>,
  ) {}

  async create(originalUrl: string): Promise<ShortUrlEntity> {
    const valid = isValidUrl(originalUrl);
    if (!valid) {
      throw new BadRequestException('Invalid URL format');
    }
    return this.shortUrlRepo.manager.transaction(async (em) => {
      const urlRepo = em.getRepository(ShortUrlEntity);
      const record = await urlRepo.save(new ShortUrlEntity(originalUrl));
      record.shortCode = encodeBase62(record.id);
      urlRepo.update({ id: record.id }, { shortCode: record.shortCode });
      return record;
    });
  }

  async update(id: number, originalUrl: string): Promise<ShortUrlEntity> {
    await this.shortUrlRepo.update(id, { originalUrl });
    return (await this.shortUrlRepo.findOneByOrFail({ id })) as ShortUrlEntity;
  }

  async delete(id: number): Promise<void> {
    await this.shortUrlRepo.update(id, { deletedAt: new Date() });
  }

  async redirect(shortCode: string): Promise<string | undefined> {
    const record = await this.shortUrlRepo.findOne({
      where: { shortCode, deletedAt: IsNull() },
    });
    if (record) {
      await this.shortUrlRepo.increment({ id: record.id }, 'clickCount', 1);
      return record.originalUrl;
    } else {
      return;
    }
  }

  async findAll(page = 1, limit = 20): Promise<PaginatedUrlResponseDto> {
    const [data, total] = await this.shortUrlRepo.findAndCount({
      where: {},
      order: { id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }
}
