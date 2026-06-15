import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUrlDto, PaginatedUrlResponseDto, UpdateUrlDto } from './dto';
import { ShortUrlEntity } from './entities/short-url.entity';
import { UrlManageService } from './url-manage.service';

@ApiTags('URL Management')
@Controller('api/urls')
export class UrlManageController {
  constructor(private readonly urlManageService: UrlManageService) {}

  @Post()
  @ApiOkResponse({ type: ShortUrlEntity })
  async create(@Body() body: CreateUrlDto): Promise<ShortUrlEntity> {
    return this.urlManageService.create(body.originalUrl);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ShortUrlEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUrlDto: UpdateUrlDto,
  ): Promise<ShortUrlEntity> {
    return this.urlManageService.update(id, updateUrlDto.originalUrl);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.urlManageService.delete(id);
  }

  @Get()
  @ApiOkResponse({ type: PaginatedUrlResponseDto })
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.urlManageService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }
}
