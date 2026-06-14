import { Module } from '@nestjs/common';
import { UrlManageModule } from '../url-manage/url-manage.module';
import { RedirectController } from './redirect.controller';

@Module({
  imports: [UrlManageModule],
  controllers: [RedirectController],
})
export class RedirectModule {}
