import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { SkillEntity } from "./entities/skill.entity";
import { Repository } from "typeorm";

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity) private readonly SkillRepository: Repository<SkillEntity>
  ) {
  }

  async create(createSkillDto: CreateSkillDto) {
    return await this.SkillRepository.insert(createSkillDto);
  }

  async findAll() {
    return await this.SkillRepository.find();
  }

  async findOne(id: string) {
    const todo = await this.SkillRepository.find({ where: { id: id } });
    if (todo.length === 0) {
      throw new NotFoundException();
    }
    return todo;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    return await this.SkillRepository.update(id, updateSkillDto);
  }

  async remove(id: string) {
    return await this.SkillRepository.delete(id);
  }
}
