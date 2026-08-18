import React, { ReactNode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCalculator from "../useCalculator";
import { calculateAction } from "@/actions/calculate.action";

jest.mock("@/actions/calculate.action", () => ({
  calculateAction: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useCalculator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize calculateMutation in idle state", async () => {
    const { result } = await renderHook(() => useCalculator(), {
      wrapper: createWrapper(),
    });

    expect(result.current.calculateMutation).toBeDefined();
    expect(result.current.calculateMutation.isIdle).toBe(true);
  });

  it("should execute calculateAction and return result on successful mutation", async () => {
    const mockResult = 42;
    (calculateAction as jest.Mock).mockResolvedValueOnce(mockResult);

    const { result } = await renderHook(() => useCalculator(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.calculateMutation.mutate("40+2");
    });

    await waitFor(() => {
      expect(result.current.calculateMutation.isSuccess).toBe(true);
    });

    expect(calculateAction).toHaveBeenCalledTimes(1);
    expect(calculateAction).toHaveBeenCalledWith("40+2");
    expect(result.current.calculateMutation.data).toBe(mockResult);
  });

  it("should handle error when calculateAction rejects", async () => {
    const mockError = new Error("Invalid mathematical expression");
    (calculateAction as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = await renderHook(() => useCalculator(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.calculateMutation.mutate("40++2");
    });

    await waitFor(() => {
      expect(result.current.calculateMutation.isError).toBe(true);
    });

    expect(calculateAction).toHaveBeenCalledTimes(1);
    expect(calculateAction).toHaveBeenCalledWith("40++2");
    expect(result.current.calculateMutation.error).toEqual(mockError);
  });
});
