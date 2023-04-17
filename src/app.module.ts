import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PremierModule } from "./premier/premier.module";
import { TodoModule } from "./todo/todo.module";
import { CommonModule } from "./common/common.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./todo/entities/todo.entity";
import { CvModule } from "./cv/cv.module";
import { SkillModule } from "./skill/skill.module";
import { UserModule } from "./user/user.module";
import { SkillEntity } from "./skill/entities/skill.entity";
import { UserEntity } from "./user/entities/user.entity";
import { CvEntity } from "./cv/entities/cv.entity";
import { CvService } from "./cv/cv.service";
import { SkillService } from "./skill/skill.service";
import { UserService } from "./user/user.service";
import { Seeder } from "./standalone/seeder";

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "mysql",
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [TodoEntity, SkillEntity, UserEntity, CvEntity],
        synchronize: true
      }
    ),
    PremierModule, TodoModule, CommonModule, CvModule, SkillModule, UserModule],
  controllers: [AppController],
  providers: [AppService, CvService, SkillService, UserService, Seeder]
})
export class AppModule {}
