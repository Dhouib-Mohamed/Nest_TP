import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { SkillEntity } from "../../skill/entities/skill.entity";

@Entity("cv")
export class CvEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  age: number;
  @Column()
  cin: number;
  @Column()
  job: string;
  @Column()
  path: string;
  @ManyToOne(() => UserEntity, (e) => e.id, { eager: true })
  possessedBy: UserEntity;

  @ManyToMany(() => SkillEntity, (e) => e.id)
  @JoinTable()
  skills: SkillEntity[];
}
