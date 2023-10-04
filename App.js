import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
// import RestaurantCard from "./RestaurantCard";
import { useEffect, useState, useRef } from "react";
import Swiper from "react-native-deck-swiper";

import ENV from "./env";

export default function App() {
  //Businesses save all the loaded business data.
  const [businesses, setBusinesses] = useState([]);
  //CurrentIndex is the index of businesses, it will change when card go previous/Next.
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const swiperRef = useRef();

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
        `https://api.yelp.com/v3/businesses/search?location=New%20York%20City&sort_by=best_match&limit=20&${offset}`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      //offset to avoid repeat data.
      setOffset(offset + 20);
      // When load more data, save into businesses.
      setBusinesses((prevBusinesses) => [
        ...prevBusinesses,
        ...data.businesses,
      ]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  //fetch initial 20 record when loading the page
  useEffect(() => {
    loadData();
  }, []);
  // console.log(businesses[0]);
  const swipeLeft = () => {
    if (currentIndex > 0) {
      swiperRef.current.swipeLeft();
    }
  };

  const swipeRight = () => {
    if (currentIndex < businesses.length - 1) {
      swiperRef.current.swipeRight();
    } else {
      // Refill cards with new data from the API
      loadData(); // Call the function to fetch data again
    }
  };
  return (
    <View>
      <Swiper
        ref={swiperRef}
        cards={businesses.map((business) => business.name)}
        renderCard={(card) => {
          const restaurant = businesses[currentIndex];
          //prevent rendering restaurant.name, url before restaurant is logged.
          if (!restaurant) {
            console.log("nothing is populated yet");
            return null; // Return null if restaurant is not defined yet
          }
          console.log(currentIndex);
          return (
            <View style={styles.card}>
              <Image
                style={styles.cardImage}
                source={{ uri: restaurant.image_url }}
              />
              <Text style={styles.cardText}>{restaurant.name}</Text>
              <Text style={styles.cardRating}>Rating: {restaurant.rating}</Text>
            </View>
          );
        }}
        onSwipedLeft={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
        onSwipedRight={() => setCurrentIndex((prevIndex) => prevIndex - 1)}
        cardIndex={currentIndex}
        backgroundColor="white"
        stackSize={1}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={swipeRight}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={swipeLeft}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 300,
    height: 300,
    borderRadius: 10,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardRating: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "skyblue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
