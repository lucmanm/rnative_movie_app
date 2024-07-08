import { Text, View } from "react-native";

export default function ErrorMessage({error}: {error: Error | null}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 16, color: "red" }}>{error?.message}</Text>
    </View>
  );
}
