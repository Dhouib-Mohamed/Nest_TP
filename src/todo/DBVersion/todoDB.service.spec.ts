import { Test, TestingModule } from "@nestjs/testing";
import { TodoDBService } from "./todoDB.service";

describe("TodoDBService", () => {
  let service: TodoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoDBService]
    }).compile();

    service = module.get<TodoDBService>(TodoDBService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
