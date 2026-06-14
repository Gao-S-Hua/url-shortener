import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { INDEX_HTML_PATH } from '../constants';
import { UrlManageService } from '../url-manage/url-manage.service';

@Controller()
export class RedirectController {
  private readonly logger = new Logger(RedirectController.name);

  constructor(private readonly urlManageService: UrlManageService) {}

  @Get(':code')
  async redirect(@Param('code') shortCode: string, @Res() res: Response) {
    const originalUrl = await this.urlManageService.redirect(shortCode);
    if (!originalUrl) {
      this.logger.warn(`Short code not found: ${shortCode}`);
      return res.sendFile(INDEX_HTML_PATH);
    }
    res.redirect(302, originalUrl);
  }
}
