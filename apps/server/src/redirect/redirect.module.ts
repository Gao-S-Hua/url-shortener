import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlEntity } from '../url-manage/entities/short-url.entity';
import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrlEntity])],
  controllers: [RedirectController],
  providers: [RedirectService],
})
export class RedirectModule {}
