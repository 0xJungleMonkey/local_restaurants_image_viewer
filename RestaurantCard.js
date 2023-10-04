import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
import { View, Image, StyleSheet } from "react-native";
const RestaurantCard = ({ restaurant }) => (
  <View style={styles.card}>
    <Image style={styles.cardImage} source={{ uri: restaurant.image_url }} />
    <Text style={styles.cardText}>{restaurant.name}</Text>
    <Text style={styles.cardRating}>Rating: {restaurant.rating}</Text>
  </View>
);

export default RestaurantCard;
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
