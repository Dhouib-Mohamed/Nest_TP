import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";


@Entity("skill")
export class SkillEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @PrimaryColumn()
  @IsNotEmpty()
  designation: string;


}

