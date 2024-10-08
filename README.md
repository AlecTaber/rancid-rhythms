# Rancid Rhythms
  ![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
## Description 

**Rancid Rhythms** is a full-stack web application for discovering, rating, and reviewing albums. Users can search for albums, leave reviews, and see the ratings and reviews left by other users. This project uses the **MusicBrainz API** to search for albums and fetch album information and the **iTunes API** to provide song previews. The app is built with **React**, **Node.js**, **Express.js**, **PostgreSQL**, **Sequelize**, **Tailwind CSS**, and **JWT-based authentication**. This application has been deployed using **Render**. Here is the live deployed site, https://rancid-rhythms-tnyn.onrender.com, feel free to leave a review on your favorite album!

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Tests](#tests)
- [Contact](#contact)

## Installation

## Installation

1. Clone the repository:
    ```bash
    git clone
    ```
2. Navigate into the project directory:
    ```bash
    cd rancid-rhythms
    ```
3. Install dependencies for both the client and server:
    ```bash
    npm install
    cd client && npm install
    cd ..
    cd server && npm install
    cd ..
    ```
4. Create a `.env` file in the server directory and add the following environment variables:
    ```plaintext
    DB_NAME="rancid_db"
    DB_USER="your_db_username"
    DB_PASSWORD="your_db_password"
    JWT_SECRET="your_jwt_secret"
    ```
5. Start the development server:
    ```bash
    npm run start:dev
    ```
    When you complete the steps above, the server will start and you will be redirected to the localhost running the frontend and backend concurrently.

## Usage

- **Home Page**: View highest-rated and lowest-rated albums. Click the login button, located in the top right corner, to log into your account or create a new one.
- **User Profiles**: Log in to see the reviews you have left and the related albums.
- **Search Albums**: Use the search bar to find albums by title and/or artist. Click on an album to see more details and reviews.
- **Leave Reviews**: Leave a review for any album and rate it using the star rating system.

## Code Snippets

- **Front End**:
![MusicBrainz API code snippet](./code_snippets/MusicBrainz_api.png)
    Uses a link, including an id, to retrieve album information from the MusicBrainz API and save it to our system.

![iTunes API code snippet](./code_snippets/Itunes_api.png)
    Uses a link to fetch a 30 second preview from one of the songs from the displayed album.

![iTunes API partial information code snippet](./code_snippets/Itunes_partialmatch.png)
    Searches for a 30 song preview for albums that we don't have all of the information for.

![Highest rated albums front end code snippet](./code_snippets/FE_highest_rated.png)
    Retrieves and displays the albums with highest ratings in our database (based on reviews left on our website). There is similar code that does this for lowest rated albums.

![Submit review code snippet](./code_snippets/submit_review.png)
    Check if user is logged in. If not, redirect them to make an account. If user is logged in, add the review to our database.

![Add review front end code snippet](./code_snippets/FE_add_review.png)
    Function that actually adds the reviews and relevant information to the database.

![Fetch reviews code snippet](./code_snippets/fetch_reviews.png)
    Fetches reviews from local storage. These are displayed on the user's profile page.

- **Back End**:
    ![JWT authentication middleware code snippet](./code_snippets/jwt-auth.png)
        How we handle JWT authentication and validating users.
    
    ![Album model code snippet](./code_snippets/album-model.png)
        The information that we are storing - some of which is pulled from the MusicBrainz API. Albums are stored when a user leaves a review for that album.
    
    ![Albums controller code snippet](./code_snippets/albums_controller.png)
        The get methods we have in our controller for retrieving album information from our database.

    ![Highest rated albums back end code snippet](./code_snippets/BE_highest_rated.png)
        The back end code that handles retrieving the highest rated albums in our database.
    
    ![Add review back end code snippet](./code_snippets/BE_add_review.png)
        The function in the back end that handles adding a review to our database. Also adds the album to our database if it isn't already there.

    ![Get reviews by user code snippet](./code_snippets/get_reviews_by_user.png)
        Back end code that retrieves all the reviews a specific user has left so that they can be displayed on the user's profile page.

    ![Get reviews by album code snippet](./code_snippets/get_reviews_by_album.png)
        How the back end handles fetching all reviews that pertain to one specific album so that they can be displayed when that album is viewed by other users.

## Credits

This application was created by Alec Taber, Ashlin Lee, and Jacob Menlove.

## License
  
  This project uses the MIT License. For more information, visit [license link](https://opensource.org/licenses/MIT).

## Features

- **Search Albums**: Search for albums using the MusicBrainz API, displaying album art and a preview of the album, as well as other users reviews for that album.
- **User Reviews**: Users can leave reviews and ratings for albums.
- **Star Rating System**: Albums are rated using a 5-star rating system.
- **User Profiles**: Each user can view all of their reviews on their profile page.
- **Top Rated Albums**: The home page displays the highest and lowest-rated albums.
- **Song Previews**: Listen to previews of album tracks fetched from the iTunes API.

## Tests

N/A

## Contact

**Alec Taber**

- GitHub: [AlecTaber](https://github.com/AlecTaber)
- Email: [alectaber12@gmail.com](mailto:alectaber12@gmail.com)

**Ashlin Lee**

- GitHub: [AshlinLee](https://github.com/ashlinlee98)
- Email:[ashlinlee98@gmail.com](mailto:ashlinlee98@gmail.com)

**Jacob Menlove**

- GitHub:
- Email: