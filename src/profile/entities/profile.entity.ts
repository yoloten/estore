import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ type: "date" })
  public birthday: Date;

  @Column({ nullable: true })
  public description: string;
}
