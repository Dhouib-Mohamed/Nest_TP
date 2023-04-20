import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "../models/todo.model";
import { UpdateTodoDto } from "../dto/modifyTodoDto";
import { PROVIDER_TOKENS } from "../../common/common.module";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { TodoEntity } from "../entities/todo.entity";
import { TodoStatusEnum } from "../todoStatusEnum";

@Injectable()
export class TodoDBService {
  private readonly todos: Todo[];

  constructor(
    @Inject(PROVIDER_TOKENS.uuid) private uuid,
    @InjectRepository(TodoEntity) private readonly TodoRepository: Repository<TodoEntity>
  ) {
  }

  newTodo(name: string, description: string, id = "") {
    const todo = new Todo();
    todo.id = this.uuid();
    todo.userId = id;
    todo.name = name;
    todo.description = description;
    todo.date_creation = new Date();
    return todo;
  }

  async getTodos(chaine = "", statut = null) {
    // let result = []
    // if (statut)
    // {
    //   result = await this.TodoRepository.find({where: { statut:statut}})
    // }
    // else {
    //   result = await this.TodoRepository.find()
    // }
    // result = result.filter((e)=>{return (e.name.includes(chaine) || e.description.includes(chaine))})
    // return result
    if (statut) {
      return await this.TodoRepository.find({
        where: [{
          name: Like(`%${chaine}%`),
          statut: statut
        }, { description: Like(`%${chaine}%`), statut: statut }]
      });
    } else {
      return await this.TodoRepository.find({ where: [{ name: Like(`%${chaine}%`) }, { description: Like(`%${chaine}%`) }] });
    }
  }

  async getTodosQuery(chaine = "", statut = null) {
    const queryBuilder = this.TodoRepository.createQueryBuilder("todo");

    if (statut) {
      queryBuilder.where("(todo.name LIKE :chaine AND todo.statut = :statut) OR (todo.description LIKE :chaine AND todo.statut = :statut)", {
        chaine: `%${chaine}%`,
        statut: statut
      });
    } else {
      queryBuilder.where("(todo.name LIKE :chaine) OR (todo.description LIKE :chaine)", {
        chaine: `%${chaine}%`
      });
    }

    return await queryBuilder.getMany();
  }

  async getTodoPagination(nbr = 0, limit = 2) {
    return await this.TodoRepository.createQueryBuilder("todo").take(limit).skip(nbr).getMany();
  }

  async getStatusCritere() {
    return await this.TodoRepository.find({
      select: {
        statut: true,
        description: true
      }
    });
  }

  async getStatus() {
    return {
      actif: await this.TodoRepository.count({ where: { statut: TodoStatusEnum.actif } }),
      waiting: await this.TodoRepository.count({ where: { statut: TodoStatusEnum.waiting } }),
      done: await this.TodoRepository.count({ where: { statut: TodoStatusEnum.done } })
    };
  }

  async getTodoById(id: string) {
    const todo = await this.TodoRepository.find({ where: { id: id } });
    if (todo.length === 0) {
      throw new NotFoundException();
    }
    return todo;
  }

  async deleteTodo(id: string) {
    return await this.TodoRepository.delete(id);
  }

  async softDeleteTodo(id: string) {
    return await this.TodoRepository.softDelete(id);
  }

  async restoreTodo(id: string) {
    return await this.TodoRepository.restore(id);
  }

  async addTodo(data) {
    const todo = this.newTodo(data.name, data.description, data.userId);
    return await this.TodoRepository.save(todo);
  }

  async updateTodo(id: string, data: UpdateTodoDto) {
    return await this.TodoRepository.update(id, data);
  }
}
