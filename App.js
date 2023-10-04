import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Swiper from "react-native-deck-swiper";

import ENV from "./env";

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
  //fetch initial 20 record when loading the page
  useEffect(() => {
    loadData();
  }, []);
  console.log(businesses[0]);
  return (
    <View>
      <Swiper
        cards={businesses.map((business) => business.name)}
        renderCard={(card) => {
          const restaurant = businesses[0];
          //prevent rendering restaurant.name, url before restaurant is logged.
          if (!restaurant) {
            console.log("nothing is populated yet");
            return null; // Return null if restaurant is not defined yet
          }
          return (
            <RestaurantCard style={styles.container} restaurant={restaurant} />
          );
        }}
      />
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
