import { Pressable, Text } from "react-native";

interface Props {
  label: string;
  variant?: "digit" | "operator";
  buttonBig?: boolean;
  onPress?: () => void;
}

const CalculatorButton = ({
  label,
  variant = "digit",
  buttonBig,
  onPress,
}: Props) => {
  const bgColor = variant === "digit" ? "bg-slate-300" : "bg-orange-300";

  return (
    <Pressable
      className={`flex-1 rounded-md h-[50px] justify-center items-center active:opacity-70 ${bgColor}`}
      onPress={onPress}
    >
      <Text className="text-2xl">{label}</Text>
    </Pressable>
  );
};

export default CalculatorButton;
