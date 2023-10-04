import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RestaurantCard from "./RestaurantCard";
export default function App() {
  return (
    <View>
      <RestaurantCard />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
