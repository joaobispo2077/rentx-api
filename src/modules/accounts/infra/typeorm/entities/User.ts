import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string {
    switch (process.env.STORAGE_PROVIDER) {
      case 'local':
        return `http://localhost:${process.env.EAPP_PORT}/avatar/${this.avatar}`;
      case 's3':
        return `${process.env.AWS_S3_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return '';
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
