import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { validationMessages } from "../../validationMessages";

export class CreateTodoDto {
  @MinLength(3, { message: validationMessages.name.minLength })
  @MaxLength(10, { message: validationMessages.name.maxLength })
  @IsNotEmpty({ message: validationMessages.name.required })
  @IsString({ message: validationMessages.name.string })
  readonly name: string;
  @IsString({ message: validationMessages.description.string })
  @IsNotEmpty({ message: validationMessages.description.required })
  @MinLength(10, { message: validationMessages.description.minLength })
  readonly description: string;
}
