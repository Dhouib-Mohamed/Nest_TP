import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "./models/todo.model";
import { CreateTodoDto } from "./dto/createTodoDto";
import { UpdateTodoDto } from "./dto/modifyTodoDto";
import { PROVIDER_TOKENS } from "../common/common.module";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { TodoEntity } from "./entities/todo.entity";
import { TodoStatusEnum } from "./todoStatusEnum";

@Injectable()
export class TodoService {
  private readonly todos: Todo[];

  constructor(
    @Inject(PROVIDER_TOKENS.uuid) private uuid,
    @InjectRepository(TodoEntity) private readonly TodoRepository: Repository<TodoEntity>
  ) {
    this.todos = [];
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

  getTodos() {
    return this.todos;
  }

  getTodoById(id: string) {
    const todo = this.todos.find((e) => e.id === id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    this.todos.splice(index, 1);
    return { "number of deleted elements": 1 };
  }

  addTodo(data: CreateTodoDto) {
    const todo = this.newTodo(data.name, data.description);
    this.todos.push(todo);
    return todo;
  }

  updateTodo(id: string, data: UpdateTodoDto) {
    let todo = this.getTodoById(id);
    this.deleteTodo(id);
    todo = { ...todo, ...data };
    this.todos.push(todo);
    return todo;
  }

  async getTodosDB(chaine = "", statut = null) {
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

  async getTodosDBQuery(chaine = "", statut = null) {
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

  async getStatusDB() {
    return {
      actif: await this.TodoRepository.count({ where: { statut: TodoStatusEnum.actif } }),
      waiting: await this.TodoRepository.count({ where: { statut: TodoStatusEnum.waiting } }),
      done: await this.TodoRepository.count({ where: { statut: TodoStatusEnum.done } })
    };
  }

  async getTodoByIdDB(id: string) {
    const todo = await this.TodoRepository.find({ where: { id: id } });
    if (todo.length === 0) {
      throw new NotFoundException();
    }
    return todo;
  }

  async deleteTodoDB(id: string) {
    return await this.TodoRepository.delete(id);
  }

  async softDeleteTodoDB(id: string) {
    return await this.TodoRepository.softDelete(id);
  }

  async restoreTodoDB(id: string) {
    return await this.TodoRepository.restore(id);
  }

  async addTodoDB(data) {
    const todo = this.newTodo(data.name, data.description, data.userId);
    return await this.TodoRepository.insert(todo);
  }

  async updateTodoDB(id: string, data: UpdateTodoDto) {
    return await this.TodoRepository.update(id, data);
  }
}
