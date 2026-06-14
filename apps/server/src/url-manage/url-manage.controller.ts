import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UrlManageService } from './url-manage.service';

@Controller('api/urls')
export class UrlManageController {
  constructor(private readonly urlManageService: UrlManageService) {}

  @Post()
  async create(@Body('originalUrl') originalUrl: string) {
    return this.urlManageService.create(originalUrl);
  }

  @Get(':code')
  async findByCode(@Param('code') code: string) {
    return this.urlManageService.findByCode(code);
  }

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.urlManageService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }
}
