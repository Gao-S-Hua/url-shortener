import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../constants';
import { StaticModule } from '../static/static.module';
import { UrlManageModule } from '../url-manage/url-manage.module';
import { RedirectModule } from '../url-redirect/redirect.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    StaticModule,
    RedirectModule,
    UrlManageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
