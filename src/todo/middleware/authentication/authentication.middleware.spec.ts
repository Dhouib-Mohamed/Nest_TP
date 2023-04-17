import { AuthenticationMiddleware } from "./authentication.middleware";

describe("AuthentificationMiddleware", () => {
  it("should be defined", () => {
    expect(new AuthenticationMiddleware()).toBeDefined();
  });
});
