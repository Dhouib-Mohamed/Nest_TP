import { IsNotEmpty, IsNumber } from "class-validator";

import { SkillEntity } from "../../skill/entities/skill.entity";
import { UserEntity } from "../../user/entities/user.entity";


export class CreateCvDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  job: string;

  @IsNumber()
  age: number;

  possessedBy: UserEntity;

  skills: SkillEntity[];
}