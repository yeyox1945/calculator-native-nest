import { Text } from "react-native";

interface Props {
  data: string;
}

const Result = ({ data }: Props) => {
  return (
    <Text
      className="text-6xl mb-6 color-green-600"
      adjustsFontSizeToFit
      numberOfLines={1}
    >
      {`= ${data}`}
    </Text>
  );
};

export default Result;
