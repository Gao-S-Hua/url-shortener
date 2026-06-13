import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { StaticController } from './static.controller';

const staticRoot = join(process.cwd(), 'static');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(staticRoot, 'assets'),
      serveRoot: '/assets',
    }),
  ],
  controllers: [StaticController],
})
export class StaticModule {}
