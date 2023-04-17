import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatusEnum } from "../todoStatusEnum";
import { TimestampEntity } from "./timestamp.entity";

@Entity("todo")
export class TodoEntity extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;

  @Column()
  statut: TodoStatusEnum;

  @Column()
  userId: string;
}