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
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
  id!: number;

  @Column({
    name: 'short_code',
    type: 'varchar',
    length: 16,
    unique: true,
    nullable: true,
  })
  shortCode!: string;

  @Column({ name: 'original_url', type: 'text' })
  originalUrl!: string;

  @Column({ name: 'click_count', type: 'int', unsigned: true, default: 0 })
  clickCount!: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  @Index()
  updatedAt!: Date;

  @Column({ name: 'deleted_at', type: 'datetime', nullable: true })
  deletedAt?: Date | null;
}
