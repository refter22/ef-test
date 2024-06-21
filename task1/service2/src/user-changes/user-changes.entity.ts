import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserChanges {
  @PrimaryGeneratedColumn()
  userChangesId: number;

  @Column()
  userId: number;

  @Column()
  event: string;

  @Column({ type: 'jsonb', nullable: true })
  oldData: any;

  @Column({ type: 'jsonb' })
  newData: any;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
