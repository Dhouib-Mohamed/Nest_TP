import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCvDto } from "./dto/create-cv.dto";
import { UpdateCvDto } from "./dto/update-cv.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CvEntity } from "./entities/cv.entity";

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity) private readonly CvRepository: Repository<CvEntity>
  ) {
  }

  async create(createCvDto: CreateCvDto) {
    return await this.CvRepository.insert(createCvDto);
  }

  async findAll() {
    return await this.CvRepository.find();
  }

  async findOne(id: string) {
    const todo = await this.CvRepository.find({ where: { id: id } });
    if (todo.length === 0) {
      throw new NotFoundException();
    }
    return todo;
  }

  async update(id: string, updateCvDto: UpdateCvDto) {
    return await this.CvRepository.update(id, updateCvDto);
  }

  async remove(id: string) {
    return await this.CvRepository.delete(id);
  }
}
