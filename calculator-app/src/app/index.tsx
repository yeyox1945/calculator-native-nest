import CalculatorScreen from "@/screens/CalculatorScreen";
import { Screen } from "expo-router/build/views/Screen";

const RootRoute = () => {
  return (
    <>
      <CalculatorScreen />
      <Screen options={{ title: "Calculator" }} />
    </>
  );
};

export default RootRoute;
