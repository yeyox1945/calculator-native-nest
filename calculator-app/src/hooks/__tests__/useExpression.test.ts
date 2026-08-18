import { act, renderHook } from "@testing-library/react-native";
import useExpression from "../useExpression";

describe("useExpression", () => {
  it("should initialize expression with '0'", async () => {
    const { result } = await renderHook(() => useExpression());
    expect(result.current.expression).toBe("0");
  });

  describe("appending numbers and leading zero handling", () => {
    it("should replace initial '0' with entered non-zero number", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("7");
      });

      expect(result.current.expression).toBe("7");
    });

    it("should allow appending subsequent numbers", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("1");
      });
      await act(async () => {
        result.current.append("2");
      });
      await act(async () => {
        result.current.append("3");
      });

      expect(result.current.expression).toBe("123");
    });

    it("should not append multiple leading zeros when expression is '0'", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("0");
      });

      expect(result.current.expression).toBe("0");
    });
  });

  describe("decimal point handling", () => {
    it("should allow adding decimal point to '0'", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append(".");
      });

      expect(result.current.expression).toBe("0.");
    });

    it("should allow adding digits after decimal point", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append(".");
      });
      await act(async () => {
        result.current.append("5");
      });

      expect(result.current.expression).toBe("0.5");
    });

    it("should allow zeros after decimal point", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append(".");
      });
      await act(async () => {
        result.current.append("0");
      });
      await act(async () => {
        result.current.append("5");
      });

      expect(result.current.expression).toBe("0.05");
    });

    it("should not allow multiple decimal points in the same number", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("5");
      });
      await act(async () => {
        result.current.append(".");
      });
      await act(async () => {
        result.current.append("2");
      });
      await act(async () => {
        result.current.append(".");
      });

      expect(result.current.expression).toBe("5.2");
    });
  });

  describe("operators handling", () => {
    it("should append standard operators (+, -, *, /, ^) after a number", async () => {
      const operators = ["+", "-", "*", "/", "^"];

      for (const op of operators) {
        const { result } = await renderHook(() => useExpression());

        await act(async () => {
          result.current.append("8");
        });
        await act(async () => {
          result.current.append(op);
        });

        expect(result.current.expression).toBe(`8${op}`);
      }
    });

    it("should allow chaining operations across numbers", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("1");
      });
      await act(async () => {
        result.current.append("0");
      });
      await act(async () => {
        result.current.append("+");
      });
      await act(async () => {
        result.current.append("5");
      });
      await act(async () => {
        result.current.append("*");
      });
      await act(async () => {
        result.current.append("2");
      });

      expect(result.current.expression).toBe("10+5*2");
    });

    it("should prevent adding consecutive operators", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("9");
      });
      await act(async () => {
        result.current.append("+");
      });
      await act(async () => {
        result.current.append("*");
      });

      expect(result.current.expression).toBe("9+");
    });

    it("should prevent adding operator if number ends with a decimal point", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("9");
      });
      await act(async () => {
        result.current.append(".");
      });
      await act(async () => {
        result.current.append("+");
      });

      expect(result.current.expression).toBe("9.");
    });

    it("should prevent adding operator if number has decimals ending in '0'", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("9");
      });
      await act(async () => {
        result.current.append(".");
      });
      await act(async () => {
        result.current.append("0");
      });
      await act(async () => {
        result.current.append("+");
      });

      expect(result.current.expression).toBe("9.0");
    });
  });

  describe("square root (√) operator", () => {
    it("should replace '0' with '√' when starting with square root", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("√");
      });

      expect(result.current.expression).toBe("√");
    });

    it("should allow '√' when expression is empty string", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.clearAll();
      });
      await act(async () => {
        result.current.append("√");
      });

      expect(result.current.expression).toBe("√");
    });

    it("should allow '√' after another operator", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("4");
      });
      await act(async () => {
        result.current.append("+");
      });
      await act(async () => {
        result.current.append("√");
      });

      expect(result.current.expression).toBe("4+√");
    });

    it("should not allow consecutive square roots '√√'", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("√");
      });
      await act(async () => {
        result.current.append("√");
      });

      expect(result.current.expression).toBe("√");
    });

    it("should not allow '√' directly following a digit", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("5");
      });
      await act(async () => {
        result.current.append("√");
      });

      expect(result.current.expression).toBe("5");
    });
  });

  describe("clearAll and deleteLast", () => {
    it("should clear the entire expression with clearAll", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("1");
      });
      await act(async () => {
        result.current.append("2");
      });
      await act(async () => {
        result.current.append("+");
      });
      await act(async () => {
        result.current.append("3");
      });

      expect(result.current.expression).toBe("12+3");

      await act(async () => {
        result.current.clearAll();
      });

      expect(result.current.expression).toBe("");
    });

    it("should remove the last character with deleteLast", async () => {
      const { result } = await renderHook(() => useExpression());

      await act(async () => {
        result.current.append("1");
      });
      await act(async () => {
        result.current.append("2");
      });
      await act(async () => {
        result.current.append("3");
      });

      expect(result.current.expression).toBe("123");

      await act(async () => {
        result.current.deleteLast();
      });

      expect(result.current.expression).toBe("12");

      await act(async () => {
        result.current.deleteLast();
      });

      expect(result.current.expression).toBe("1");

      await act(async () => {
        result.current.deleteLast();
      });

      expect(result.current.expression).toBe("");
    });
  });
});
