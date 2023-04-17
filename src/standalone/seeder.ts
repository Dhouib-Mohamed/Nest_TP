import { Injectable } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "../todo/entities/todo.entity";
import { SkillEntity } from "../skill/entities/skill.entity";
import { UserEntity } from "../user/entities/user.entity";
import { CvEntity } from "../cv/entities/cv.entity";
import * as fake from "@ngneat/falso";
import { SkillService } from "../skill/skill.service";
import { CvService } from "../cv/cv.service";
import { UserService } from "../user/user.service";
import { AppService } from "../app.service";

@Injectable()
export class Seeder {

  constructor(private readonly skillService: SkillService, private readonly cvService: CvService, private readonly userService: UserService, private readonly appService: AppService) {
  }


  async seed() {

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mysql",
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [TodoEntity, SkillEntity, UserEntity, CvEntity],
        synchronize: true
      })
    });

    // Ajouter d'autres logiques de seed selon vos besoins

    console.log("Base de données seedée avec succès !");

    for (let i = 0; i < 20; i++) {
      await this.skillService.create({ designation: fake.randFilePath() });
      await this.userService.create({
        username: fake.randUserName(),
        password: fake.randPassword(),
        email: fake.randPassword()
      });
      await this.cvService.create({
        name: fake.randLastName(),
        firstname: fake.randFirstName(),
        age: fake.randNumber(),
        job: fake.randJobTitle(),
        skills: await this.skillService.findAll(),
        possessedBy: (await this.userService.findAll())[1]
      });
    }

    console.log("Creation de fake data !");

  }
}
