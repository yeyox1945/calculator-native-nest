import React from "react";
import { render } from "@testing-library/react-native";
import Result from "../Result";

describe("Result", () => {
  it("should render the result with '= ' prefix", async () => {
    const { getByText } = await render(<Result data="42" />);
    expect(getByText("= 42")).toBeTruthy();
  });

  it("should render correctly with negative numbers and decimal results", async () => {
    const { getByText } = await render(<Result data="-123.45" />);
    expect(getByText("= -123.45")).toBeTruthy();
  });

  it("should render correctly with zero as result", async () => {
    const { getByText } = await render(<Result data="0" />);
    expect(getByText("= 0")).toBeTruthy();
  });
});
