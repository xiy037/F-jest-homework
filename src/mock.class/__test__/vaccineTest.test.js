import VaccineTest from "../vaccineTest";

jest.mock("../recipient", () => {
  return jest.fn().mockImplementation(() => {
    return {
      hasAntibodies: false,
      acceptInjection() {
        return true;
      },
      getHasAntibodies() {
        return this.hasAntibodies;
      },
    };
  });
});

beforeEach(() => {
  jest.resetModules();
});

describe("inject", () => {
  test("should recipient accept injection with vaccine", () => {
    const test = new VaccineTest();
    test.inject();

    expect(test.recipient.acceptInjection()).toBe(true);
  });
});

describe("test", () => {
  test("should get Success if recipient has antibodies", () => {
    const test = new VaccineTest();
    test.recipient.hasAntibodies = true;
    const result = test.test();

    expect(result).toBe("Vaccine Test Success");
  });

  test("should get Failed if recipient has no antibodies", () => {
    const test = new VaccineTest();
    test.recipient.hasAntibodies = false;
    const result = test.test();

    expect(result).toBe("Vaccine Test Failed");
  });
});
