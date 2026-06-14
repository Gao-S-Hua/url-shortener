import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { UrlManageService } from '../url-manage/url-manage.service';

@Controller()
export class RedirectController {
  private readonly logger = new Logger(RedirectController.name);

  constructor(private readonly urlManageService: UrlManageService) {}

  @Get(':code')
  async redirect(@Param('code') shortCode: string, @Res() res: Response) {
    const record = await this.urlManageService.findByCode(shortCode);
    if (!record) {
      this.logger.warn(`Short code not found: ${shortCode}`);
      res.status(404);
      return res.send(`Cannot find code for ${shortCode}`);
    }

    await this.urlManageService.incrementClickCount(record.id);
    res.redirect(302, record.originalUrl);
  }
}
