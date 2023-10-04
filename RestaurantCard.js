import * as React from "react";
import { Button, Card, Text } from "react-native-paper";

const RestaurantCard = ({ restaurant }) => (
  <Card>
    <Card.Content>
      <Text variant="titleLarge">Restaurant Name: {restaurant.name}</Text>
      <Text variant="bodyMedium">Rating: {restaurant.rating}</Text>
    </Card.Content>
    <Card.Cover source={{ uri: restaurant.image_url }} />
    <Card.Actions>
      <Button>Previous</Button>
      <Button>Next</Button>
    </Card.Actions>
  </Card>
);

export default RestaurantCard;
