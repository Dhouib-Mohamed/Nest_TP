import { Test, TestingModule } from "@nestjs/testing";
import { TodoDBController } from "./todoDB.controller";

describe("TodoDBController", () => {
  let controller: TodoDBController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoDBController]
    }).compile();

    controller = module.get<TodoDBController>(TodoDBController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
