import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
export default function App() {
  const [businesses, setBusinesses] = useState([]);
  const loadData = async () => {
    const apiKey = ENV.YELP_API_KEY;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + apiKey,
      },
    };
    try {
      let response = await fetch(
        `https://api.yelp.com/v3/businesses/search?location=New%20York%20City&sort_by=best_match&limit=20`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      setBusinesses(data.businesses);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <View>
      <RestaurantCard style={styles.container} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
