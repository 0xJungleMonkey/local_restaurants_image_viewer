# Local Restaurants Image Viewer

## Write-up
### How long did you spend working on the problem? What did you find to be the most challenging part?
I spent approximately 4 hours to the project. The most challenging aspect was implementing the card transition animations, specifically when incorporating the previous/next button functionality. I opted to use the 'Swiper' component from "react-native-deck-swiper," which lacked built-in buttons. Therefore, integrating the buttons and their corresponding functions required significant effort and time.

### What trade-offs did you make? What did you choose to spend time on, and what did you choose to ignore or do quickly for the sake of completing the project?
In order to deliver a functional and user-friendly experience, I made strategic trade-offs. I prioritized core functionality, focusing on fulfilling the outlined requirements effectively. I ensured the seamless operation of the app by dedicating time to error handling and managing edge cases. I had limited opportunity to focus extensively on UI design. However, I concentrated on ensuring the UI's cleanliness and visibility, providing a satisfactory user experience.



## Features

**Location Service**: The app utilizes the Expo Location API to access the device's GPS coordinates and fetch restaurants based on the latitude and longitude.

**Card Stack**: Restaurants are presented as cards, featuring essential details like the restaurant name, image, and rating.

**Swipe Interaction**: Users can swipe left to dismiss the current card, revealing the next restaurant, or swipe right to bring back the previous card.

**Intuitive Buttons**: Alternatively, users can utilize the "Next" and "Previous" buttons for smooth navigation through the cards.

**Endless Browsing**: The app dynamically loads additional results from the Yelp API as the user nears the end of the card stack. This process seamlessly integrates in the background, ensuring a continuous browsing experience.

**Responsive Design**: The app is designed to function flawlessly on various screen sizes for Android devices.

## Screenshots & Demo

![demo gif](https://github.com/0xJungleMonkey/local_restaurants_image_viewer/blob/5fb44dbd5c0cd54fbdb012d718076c69c11452a7/screenshot/02mainpage.gif  "demo") | 
label 1 | label 2
--- | ---
![get device location page](https://github.com/0xJungleMonkey/local_restaurants_image_viewer/blob/5fb44dbd5c0cd54fbdb012d718076c69c11452a7/screenshot/getdevicelocation.png "get device location page") | ![mainpage](https://github.com/0xJungleMonkey/local_restaurants_image_viewer/blob/5fb44dbd5c0cd54fbdb012d718076c69c11452a7/screenshot/mainpage.png "mainpage")


## To run the program
With Expo/Android studio set up, get API key from yelp developers, then run:
```
npm install
npm run android
```
