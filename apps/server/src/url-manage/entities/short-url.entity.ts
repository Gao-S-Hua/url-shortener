import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('short_url')
export class ShortUrlEntity {
  constructor(origintalUrl: string) {
    this.originalUrl = origintalUrl;
  }

  @ApiProperty()
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
  id: number;

  @ApiProperty({ example: 'gl' })
  @Column({
    name: 'short_code',
    type: 'varchar',
    length: 16,
    unique: true,
    nullable: true,
    collation: 'utf8mb4_bin',
  })
  shortCode?: string;

  @ApiProperty({ example: 'https://google.com/' })
  @Column({ name: 'original_url', type: 'text' })
  originalUrl: string;

  @ApiProperty()
  @Column({ name: 'click_count', type: 'int', unsigned: true, default: 0 })
  clickCount: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @ApiProperty()
  @Column({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt?: Date | null;
}
