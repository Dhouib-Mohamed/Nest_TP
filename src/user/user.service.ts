import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-User.dto";
import { UpdateUserDto } from "./dto/update-User.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/User.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly UserRepository: Repository<UserEntity>
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    return await this.UserRepository.insert(createUserDto);
  }

  async findAll() {
    return await this.UserRepository.find();
  }

  async findOne(id: string) {
    const todo = await this.UserRepository.find({ where: { id: id } });
    if (todo.length === 0) {
      throw new NotFoundException();
    }
    return todo;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.UserRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.UserRepository.delete(id);
  }
}
