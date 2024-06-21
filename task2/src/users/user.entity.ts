import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from './gender.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({ default: false })
  hasProblems: boolean;
}
