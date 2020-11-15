import getUsers from "../users";

jest.mock("../users");

describe("users", () => {
  test("should get users data with mock axios get", async () => {
    await expect(getUsers()).resolves.toEqual({ data: "users data" });
  });
});
