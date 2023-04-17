import { Controller, Get, Patch } from "@nestjs/common";
import { AppService } from "./app.service";
import { CvService } from "./cv/cv.service";
import { SkillService } from "./skill/skill.service";
import * as fake from "@ngneat/falso";
import { UserService } from "./user/user.service";

@Controller()
export class AppController {
  constructor(private readonly skillService: SkillService, private readonly cvService: CvService, private readonly userService: UserService, private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Patch()
  async Faker() {
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
  }
}
