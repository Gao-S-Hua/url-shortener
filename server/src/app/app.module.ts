import { Module } from '@nestjs/common';
import { StaticModule } from '../static/static.module';
import { RedirectModule } from '../url-redirect/redirect.module';

@Module({
  imports: [StaticModule, RedirectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
