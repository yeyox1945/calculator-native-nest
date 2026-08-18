import { useRef, useState } from "react";

const useExpression = () => {
  const [expression, setExpression] = useState<string>("0");

  const operatorRegex = useRef<RegExp>(/[\+\-\*\^\√/]/).current;

  const append = (value: string) => {
    const lastNumber = expression.split(operatorRegex).pop();

    // Handle appending operators
    if (value.match(operatorRegex)) {
      // Allow √ at the start or after an operator (except another √)
      if (value === "√") {
        if (expression === "0" || expression === "") {
          return setExpression("√");
        }

        const lastChar = expression.slice(-1);
        if (operatorRegex.test(lastChar) && lastChar !== "√") {
          return setExpression(expression + value);
        }

        return;
      }

      // Cancel if trying to add operator if decimals is .000...
      if (lastNumber?.endsWith("0") && lastNumber?.includes(".")) return;

      // Cancel append if trying to add operator after a decimal point or .0000
      if (lastNumber?.endsWith(".")) return;

      // Cancel append if trying to add 2 consecutive operators
      if (lastNumber === "") return;
    }

    // Cancel append if there is already a decimal point in the current number
    if (lastNumber?.includes(".") && value === ".") return;

    if (lastNumber?.startsWith("0")) {
      // Allow dot if the last number is a zero
      if (value === ".") {
        return setExpression(expression + value);
      }

      // Allow extra zeros if the last number includes a decimal point
      if (value === "0" && lastNumber.includes(".")) {
        return setExpression(expression + value);
      }

      // Remove leading zeros if decimal point doesn't exist
      if (value != "0" && !lastNumber.includes(".")) {
        return setExpression(value);
      }

      // Avoid 00000.00
      if (value === "0" && !lastNumber.includes(".")) return;
    }

    setExpression(expression + value);
  };

  const clearAll = () => {
    setExpression("");
  };

  const deleteLast = () => {
    setExpression(expression.slice(0, -1));
  };

  return {
    expression,
    append,
    clearAll,
    deleteLast,
  };
};

export default useExpression;
