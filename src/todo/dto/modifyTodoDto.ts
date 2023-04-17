import { CreateTodoDto } from "./createTodoDto";
import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsOptional } from "class-validator";
import { TodoStatusEnum } from "../todoStatusEnum";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  statut?: TodoStatusEnum;
}
