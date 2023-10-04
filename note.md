1. initialize app with expo
```npx create-expo local_restaurants_image_viewer```
2. card component 
single card include: name, rating, image 

3. swipe function
when click on previous: index-1, display business[newIndex]
when click on next: index+1,display business[newIndex]
swipe animation: swiper from "react-native-decker-cards:
3. Try api in yelp documentation: 
need apikey, geolocation. limit = 20, will need offset to fetch more data. 
   react hook to fetch data from api. 
   use expo-constants to set up env file to save api key:
```
   npm install -g expo-cli
   expo install expo-constants
```
