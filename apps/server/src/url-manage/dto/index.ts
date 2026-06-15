import { ApiProperty } from '@nestjs/swagger';
import { ShortUrlEntity } from '../entities/short-url.entity';

export class CreateUrlDto {
  @ApiProperty({
    description: 'The original long URL',
    required: true,
    example: 'https://google.com/',
  })
  originalUrl: string;
}

export class UpdateUrlDto extends CreateUrlDto {}

export class PaginatedUrlResponseDto {
  @ApiProperty({
    description: 'total records',
    required: true,
  })
  total: number;

  @ApiProperty({
    description: 'Page Number',
    default: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Page Size',
    default: 20,
  })
  limit: number;

  @ApiProperty({
    description: 'List of short url entity',
    type: ShortUrlEntity,
    isArray: true,
  })
  data: ShortUrlEntity[];
}
