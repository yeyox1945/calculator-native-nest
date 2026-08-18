import { api } from "@/core/api";
import ResultResponse from "@/interfaces/ResultResponse";

export const calculateAction = async (expression: string) => {
  try {
    const response = await api.get<ResultResponse>("/calculator", {
      params: {
        expression: expression,
      },
    });

    console.log("Response: ", response.data);

    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
