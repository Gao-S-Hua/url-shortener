import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlEntity } from './entities/short-url.entity';
import { UrlManageController } from './url-manage.controller';
import { UrlManageService } from './url-manage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrlEntity])],
  controllers: [UrlManageController],
  providers: [UrlManageService],
  exports: [UrlManageService],
})
export class UrlManageModule {}
