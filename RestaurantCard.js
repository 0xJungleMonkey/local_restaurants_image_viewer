import * as React from "react";
import { Button, Card, Text } from "react-native-paper";

const RestaurantCard = () => (
  <Card>
    <Card.Content>
      <Text variant="titleLarge">Restaurant Name: </Text>
      <Text variant="bodyMedium">Rating: </Text>
    </Card.Content>
    <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
    <Card.Actions>
      <Button>Previous</Button>
      <Button>Next</Button>
    </Card.Actions>
  </Card>
);

export default RestaurantCard;
