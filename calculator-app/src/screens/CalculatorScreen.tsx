import CalculatorButton from "@/components/CalculatorButton";
import Result from "@/components/Result";
import useCalculator from "@/hooks/useCalculator";
import useExpression from "@/hooks/useExpression";
import { ActivityIndicator, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CalculatorScreen = () => {
  const screen = useSafeAreaInsets();

  const { expression, append, clearAll, deleteLast } = useExpression();
  const { data, isError, isPending, reset, mutate } =
    useCalculator().calculateMutation;

  return (
    <View
      className="flex-1 items-end justify-end bg-slate-100 px-4 gap-2"
      style={{ paddingBottom: screen.bottom + 30 }}
    >
      <Text className="text-6xl mb-2" adjustsFontSizeToFit numberOfLines={1}>
        {expression}
      </Text>

      {isPending && <ActivityIndicator className="color-blue-500" size={50} />}

      {isError && (
        <Text className="text-4xl mb-2 color-red-500 h-[50px]">Error</Text>
      )}

      {data && <Result data={data} />}

      <View className="flex-row gap-2">
        <View className="flex-1" />
        <View className="flex-1" />
        <CalculatorButton
          label="√"
          onPress={() => append("√")}
          variant="operator"
        />
        <CalculatorButton
          label="x^y"
          onPress={() => append("^")}
          variant="operator"
        />
      </View>

      <View className="flex-row gap-2 ">
        <CalculatorButton
          label="AC"
          onPress={() => {
            clearAll();
            reset();
          }}
        />
        <CalculatorButton label="Del" onPress={deleteLast} />
        <CalculatorButton label="%" onPress={() => append("%")} />
        <CalculatorButton
          label="/"
          variant="operator"
          onPress={() => append("/")}
        />
      </View>

      <View className="flex-row gap-2 ">
        <CalculatorButton label="7" onPress={() => append("7")} />
        <CalculatorButton label="8" onPress={() => append("8")} />
        <CalculatorButton label="9" onPress={() => append("9")} />
        <CalculatorButton
          label="*"
          variant="operator"
          onPress={() => append("*")}
        />
      </View>

      <View className="flex-row gap-2 ">
        <CalculatorButton label="4" onPress={() => append("4")} />
        <CalculatorButton label="5" onPress={() => append("5")} />
        <CalculatorButton label="6" onPress={() => append("6")} />
        <CalculatorButton
          label="+"
          variant="operator"
          onPress={() => append("+")}
        />
      </View>

      <View className="flex-row gap-2 ">
        <CalculatorButton label="1" onPress={() => append("1")} />
        <CalculatorButton label="2" onPress={() => append("2")} />
        <CalculatorButton label="3" onPress={() => append("3")} />
        <CalculatorButton
          label="-"
          variant="operator"
          onPress={() => append("-")}
        />
      </View>
      <View className="flex-row gap-2 ">
        <CalculatorButton label="0" buttonBig onPress={() => append("0")} />
        <CalculatorButton label="." onPress={() => append(".")} />
        <CalculatorButton
          label="="
          variant="operator"
          onPress={() => mutate(expression)}
        />
      </View>
    </View>
  );
};

export default CalculatorScreen;
