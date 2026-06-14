import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, type Repository } from 'typeorm';
import { ShortUrlEntity } from './entities/short-url.entity';
import { encodeBase62 } from './utils';
@Injectable()
export class UrlManageService {
  constructor(
    @InjectRepository(ShortUrlEntity)
    private readonly shortUrlRepo: Repository<ShortUrlEntity>,
  ) {}

  async create(originalUrl: string): Promise<ShortUrlEntity> {
    const entity = await this.shortUrlRepo.save({
      originalUrl,
    });

    const shortCode = encodeBase62(entity.id);

    entity.shortCode = shortCode;
    await this.shortUrlRepo.save(entity);

    return entity;
  }

  async findByCode(shortCode: string): Promise<ShortUrlEntity | null> {
    return this.shortUrlRepo.findOne({
      where: { shortCode, deletedAt: IsNull() },
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
    const record = await this.findByCode(shortCode);
    if (record) {
      await this.shortUrlRepo.increment({ id: record.id }, 'clickCount', 1);
      return record.originalUrl;
    } else {
      return;
    }
  }

  async findAll(
    page = 1,
    limit = 20,
  ): Promise<PaginatedResult<ShortUrlEntity>> {
    const [data, total] = await this.shortUrlRepo.findAndCount({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
