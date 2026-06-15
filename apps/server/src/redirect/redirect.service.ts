import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, type Repository } from 'typeorm';
import { ShortUrlEntity } from '../url-manage/entities/short-url.entity';

@Injectable()
export class RedirectService {
  constructor(
    @InjectRepository(ShortUrlEntity)
    private readonly shortUrlRepo: Repository<ShortUrlEntity>,
  ) {}

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
}
