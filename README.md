# Genius Clone 

Genius Clone will allow for its users to curate their own personal playlists and share it with their friends. 

## Technologies Used

- HTML
- CSS
- Javascript
- Node

### Dependencies
- Mongoose
- Express
- Bcrypt
- Body-parser
- Dotenv
- EJS
- Express-session
- Method-override
- Morgan
- Node-fetch


## User Story

On the landing/home page, users will be greeted by a welcome message, and be prompted to log in or make an account.

Clicking the "Log In" button the user will be redirected to a page where they will be prompted to enter a username and password. Once they submit the form to create their account, the user will be redirected to their own user show page. 

The "view users" link on the home page will redirect users to a user index page where they can view all existing users. Clicking on the name of a user will redirect you to the users show page where you will be able to view a list of all of the playlists that the user has created. By clicking on the name of a playlist, the user will be redirected to that playlists show page where they can view the songs inside of the playlist.

The user will be able to view a list of all of their existing playlists on this page as well as their favorite artist. There will also be a button to edit the users information such as their password, favorite artist, and username. Clicking on a playlist will render that playlists show page where all of the songs on the playlist will be displayed. 

From the playlist show page, users will have the option to create, edit or delete a playlist by clicking on a button. The edit and create buttons will redirect to a new edit/create playlist page while the delete button will instantly remove the playlist from the users show page.

Songs can be added to a users playlist from the song show page which is accessible by pressing the "add song" button on the playlist show page. The search bar will use Genius's API to preload suggestions as you type. Once a song is entered, it will be added to the users playlist show page.

Each song will have a show page that can be accessed by clicking on the song from a playlist. On this show page, the songs name, artist, youtube video, song cover, and date released will be displayed. This information will be fetched from Genius' API



## Home Page
![Home](assets/home_route.PNG)

## ERD
![ERD](assets/ERD.PNG)

## Users
New
![Add](assets/users/new_route.PNG)

Show
![Show](assets/users/show_route.PNG)

Index
![Index](assets/users/index_route.PNG)

Edit
![Edit](assets/users/edit_route.PNG)

## Playlists
New/Edit
![Add/Edit](assets/playlists/add-edit_route.PNG)

Show
![Show](assets/playlists/show_route.PNG)

## Song
Add song
![Add](assets/addSong.PNG)

