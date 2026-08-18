import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import CalculatorButton from "../CalculatorButton";

describe("CalculatorButton", () => {
  it("should render the label correctly", async () => {
    const { getByText } = await render(<CalculatorButton label="7" />);
    expect(getByText("7")).toBeTruthy();
  });

  it("should call onPress when pressed", async () => {
    const onPressMock = jest.fn();
    const { getByText } = await render(
      <CalculatorButton label="5" onPress={onPressMock} />
    );

    const button = getByText("5");
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("should apply default 'digit' styling (bg-slate-300)", async () => {
    const { getByText } = await render(<CalculatorButton label="1" />);
    const textElement = getByText("1");
    const pressableElement = textElement.parent;

    expect(pressableElement?.props.className).toContain("bg-slate-300");
  });

  it("should apply 'operator' styling (bg-orange-300) when variant is operator", async () => {
    const { getByText } = await render(
      <CalculatorButton label="+" variant="operator" />
    );
    const textElement = getByText("+");
    const pressableElement = textElement.parent;

    expect(pressableElement?.props.className).toContain("bg-orange-300");
  });

  it("should render without error when onPress is undefined and pressed", async () => {
    const { getByText } = await render(<CalculatorButton label="9" />);
    const button = getByText("9");

    expect(() => fireEvent.press(button)).not.toThrow();
  });
});
