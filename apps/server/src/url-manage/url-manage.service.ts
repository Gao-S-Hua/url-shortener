import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
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
    return this.shortUrlRepo.findOneBy({ shortCode });
  }

  async incrementClickCount(id: number): Promise<void> {
    await this.shortUrlRepo.increment({ id }, 'clickCount', 1);
  }

  async findAll(
    page = 1,
    limit = 20,
  ): Promise<PaginatedResult<ShortUrlEntity>> {
    const [data, total] = await this.shortUrlRepo.findAndCount({
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
