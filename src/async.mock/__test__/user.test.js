import { register } from "../user";
import { verifyUsername } from "../verify";

jest.mock("../verify");
jest.mock("axios");

describe("register", () => {
  test("should post user when validated", async () => {
    await expect(register("", "")).resolves.toEqual("Posted");
  });

  test("should reject with Error when username is invalid", async () => {
    verifyUsername.mockImplementation(() => false);
    await expect(register("", "")).rejects.toThrowError(
      "wrong username or password"
    );
  });
});
