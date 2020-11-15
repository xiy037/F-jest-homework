import VaccineTest from "../vaccineTest";
import Recipient from "../recipient";
import Covid19Vaccine from "../covid19Vaccine";

const mockAcceptInjection = jest.fn();
const mockHasAntibodies = jest.fn(() => false);

jest.mock("../recipient", () => {
  return jest.fn().mockImplementation(() => {
    return {
      acceptInjection: mockAcceptInjection,
      getHasAntibodies: mockHasAntibodies,
    };
  });
});

beforeEach(() => {
  Recipient.mockClear();
  mockAcceptInjection.mockClear();
  mockHasAntibodies.mockReset();
});

describe("inject", () => {
  test("should recipient accept injection with vaccine", () => {
    const test = new VaccineTest();
    test.inject();

    expect(mockAcceptInjection).toHaveBeenCalledWith(
      expect.any(Covid19Vaccine)
    );
  });
});

describe("test", () => {
  test("should get Success if recipient has antibodies", () => {
    const test = new VaccineTest();
    mockHasAntibodies.mockImplementation(() => true);
    const result = test.test();

    expect(result).toBe("Vaccine Test Success");
  });

  test("should get Failed if recipient has no antibodies", () => {
    const test = new VaccineTest();
    const result = test.test();

    expect(result).toBe("Vaccine Test Failed");
  });
});
