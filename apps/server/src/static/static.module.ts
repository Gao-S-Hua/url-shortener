import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { StaticController } from './static.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'static', 'assets'),
      serveRoot: '/assets',
    }),
  ],
  controllers: [StaticController],
})
export class StaticModule {}
