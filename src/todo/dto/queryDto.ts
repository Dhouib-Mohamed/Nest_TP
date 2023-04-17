import { IsEnum, IsOptional, IsString } from "class-validator";
import { TodoStatusEnum } from "../todoStatusEnum";

export class QueryDto {
  @IsOptional()
  @IsString()
  critere: string;

  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}