import { CreateTodoDto } from "./createTodoDto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
