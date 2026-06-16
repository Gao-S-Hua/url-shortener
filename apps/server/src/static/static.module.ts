import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { STATIC_ASSETS_PATH } from '../constants';
import { StaticController } from './static.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: STATIC_ASSETS_PATH,
      serveRoot: '/assets',
    }),
  ],
  controllers: [StaticController],
})
export class StaticModule {}
