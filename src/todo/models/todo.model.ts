import { TodoStatusEnum } from "../todoStatusEnum";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Todo {
  id : string;
  name: string;
  description: string;
  date_creation: Date;
  statut: TodoStatusEnum = TodoStatusEnum.actif;
  userId: string;

}

