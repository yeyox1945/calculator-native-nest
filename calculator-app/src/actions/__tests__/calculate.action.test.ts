import { calculateAction } from "../calculate.action";
import { api } from "@/core/api";

jest.mock("@/core/api", () => ({
  api: {
    get: jest.fn(),
  },
}));

describe("calculateAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should make a GET request to /calculator with expression and return the result", async () => {
    const mockResult = 25;
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: {
        result: mockResult,
      },
    });

    const result = await calculateAction("5*5");

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith("/calculator", {
      params: {
        expression: "5*5",
      },
    });
    expect(result).toBe(mockResult);
  });

  it("should throw error and log when API call fails", async () => {
    const mockError = new Error("Network error");
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (api.get as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(calculateAction("invalid")).rejects.toThrow("Network error");
    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

    consoleErrorSpy.mockRestore();
  });
});
