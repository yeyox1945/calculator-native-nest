import { calculateAction } from "@/actions/calculate.action";
import { useMutation } from "@tanstack/react-query";

const useCalculator = () => {
  const calculateMutation = useMutation({
    mutationFn: (expression: string) => calculateAction(expression),
  });

  return {
    calculateMutation,
  };
};

export default useCalculator;

