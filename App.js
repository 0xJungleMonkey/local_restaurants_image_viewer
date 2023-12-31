import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from "react";
import Swiper from "react-native-deck-swiper";
import { Platform } from "react-native";
import * as Location from "expo-location";

import ENV from "./env";

export default function App() {
  //Businesses save all the loaded business data.
  const [businesses, setBusinesses] = useState([]);
  //CurrentIndex is the index of businesses, it will change when card go previous/Next.
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef();
  //offset, latitude, longitude will be used in api request url
  const [offset, setOffset] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  //check and request device gps permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");

        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLongitude(location.coords.longitude);
      setLatitude(location.coords.latitude);
    })();
  }, []);
  //yelp api request hook
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
        `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&sort_by=best_match&limit=20&${offset}`,
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

  //when clicking on next button, swipeLeft.
  const swipeLeft = () => {
    if (currentIndex < businesses.length - 1) {
      swiperRef.current.swipeLeft();
    } else {
      // Refill cards with new data from the API
      loadData(); // Call the function to fetch data again
    }
  };
  //when clicking on next button, swipeRight.
  const swipeRight = () => {
    if (currentIndex > 0) {
      swiperRef.current.swipeRight();
    }
  };

  return (
    <View style={styles.container}>
      {/* Display device geolocation once located. */}

      {latitude !== 0 && longitude !== null && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Latitude: {latitude}</Text>
          <Text style={styles.locationText}>Longitude: {longitude}</Text>
        </View>
      )}
      {/* Display swiper and restaurant info */}
      <View style={styles.swiperContainer}>
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
            console.log("currentIndex: " + currentIndex);
            return (
              <View style={styles.card}>
                <Image
                  style={styles.cardImage}
                  source={{ uri: restaurant.image_url }}
                />
                <Text style={styles.cardText}>{restaurant.name}</Text>
                <Text style={styles.cardRating}>
                  Rating: {restaurant.rating}
                </Text>
              </View>
            );
          }}
          onSwipedLeft={() => {
            if (currentIndex < businesses.length - 1) {
              setCurrentIndex((prevIndex) => prevIndex + 1);
            } else {
              // Refill cards with new data from the API
              loadData();
            }
          }}
          onSwipedRight={() => {
            if (currentIndex > 0) {
              setCurrentIndex((prevIndex) => prevIndex - 1);
            }
          }}
          cardIndex={currentIndex}
          backgroundColor="white"
          stackSize={1}
        />
      </View>
      {/* Buttons trigger swipe animation */}
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
  swiperContainer: {
    height: "50%",
    width: "100%",
  },
  locationContainer: {
    height: "10%",
    marginTop: 10,
    // marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },

  card: {
    width: "100%",
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
