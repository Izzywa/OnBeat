# OnBeat

## Distinctiveness and Complexity
- This project is a full stack web application fully integrating the Django framework with the React library.
- This Django project have two application that serve as the backend and the frontend of the application, and named as such.
    - The `Backend` application will be responsible for the server side logic and database interactions, with the primary goal of handling requests and delivering responses.
    - The `Frontend` will utilise React to render the client-side interface providing a user interactive application.
- In the previous `Network` and `Mail` project, a single Django application will render the templates of appliction while the interactive user interface is implemented by asynchronous fetch requests or using `Babel` to translate JSX code written directly into the script of the HTML file.
    - This `OnBeat` project distinctiveness and complexity stems mostly on the setting the React app into the application.

### React
- Two Django applications were created, `Backend` and `Frontend`.
- In the `Frontend` application, folders for `static` files and `templates` were created. This application will serve to render all client side interactivity for the application.
- The Models for this project will be stored in the `Backend` application, which will be responding to requests made by the client from the `Frontend` application with API responses.
<details>
<summary> Why </summary>
<hr></hr>

- In the previous projects, the application could function without the separation of the application into frontend and backend portions.
- The decision to do such originates mostly from the interest to explore and learn more of React as it offers many benefits such as:
    - Providing interactive user interface
    - Components reusability
    - Rich library

- By integrating React with Django, separating the backend and frontend portions of the application had been proven to keep the project more organised and streamlined.
- Changes to either frontend or backend of the application was more manageable, as the entire procedure was compartmentalised into smaller pieces. This ease the troubleshooting process as it makes it easier to pinpoint any irregularities.
- This also makes the development process more flexible and efficient, as each task is delegated and tackled separately with less likely chances that it would break the whole application.
<hr></hr>
</details>

- After setting up a Node project with `npm init` in the `Frontend` application, several packages and modules were installed including but not limited to:
    - [webpack](https://www.npmjs.com/package/webpack)
    - [babel](https://www.npmjs.com/package/Babel)
    - [react](https://www.npmjs.com/package/react)
    - [react-router-dom](https://www.npmjs.com/package/react-router-dom)
    - [react-dom](https://www.npmjs.com/package/react-dom)


The distinctiveness of this project includes the use of other third-party packages such as:
<details>
<summary><i>Material UI Icon</i></summary>
<hr></hr>

- This project uses [Material UI Icons](https://mui.com/material-ui/material-icons/) to style the application.

![menu bar example](README_images/expand_menu_bar1.png)
![menu bar example](README_images/expand_menu_bar2.png)

- Material UI also have a powerful and flexible styling system for React components, however bootstrap library was used for this project solely for familiarity sake.
<hr></hr>
</details>

<details>
<summary><i>react-youtube</i></summary>
<hr></hr>

- [react-youtube](https://www.npmjs.com/package/react-youtube) is a simple react component acting as a thin layer over the [Youtube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference).
- Props passed to this component allow the application to access the player in a similar way to the official api, but takes away the complexity of setting up the player in the first place.
- The use of this API also separates this `OnBeat` project from the rest. Aside from playing the video, the component and API is used to:
    - Render certain components before or after the video is ready to be played.

    ![On video ready example](README_images/OnReadyExample.gif)

    - Timestamp input is automatically set to the current time of the video.

    ![Timestamp auto time input](README_images/timestampTimeExample.gif)

    - Handle the input of timestamps to make sure that the given timestamps does not exceed the duration of the video.

    ![Timestamp invalid time](README_images/TimestampErrorExample.gif)

    - Added error handling for invalid video.

    ![Video Error](README_images/VideoError.gif)

    - Play the video to the specified time according to the timestamp.

    ![Timestamp clicked](README_images/TimestampClick.gif)

    - In the search function of the applicaton, timestamps will be loaded with the video at the time corresponding with the timestamp. 

    ![Timestamp search](README_images/TimestampSearch.gif)

    - Automatically scroll to the appropriate timestamp note that correspond to the current time playing on the video when the `OnBeat` function is on.

    ![OnBeat function](README_images/OnBeatExample.gif)

<hr></hr>
</details>



<details>
<summary><i>react-markdown</i></summary>
<hr></hr>

- Notes in this application is formatted from plaintext into markdwon using [react-markdown](https://www.npmjs.com/package/react-markdown/v/8.0.6).
- Although inspired from the `wiki` project, it differs in that this application renders the text client-side without having to make a request to the server. This allows the markdown component to be rendered even while the user is writing the note.

![Markdown Example](README_images/markdownExample.gif)
<hr></hr>
</details>

### Asyncronous fetch request

- Asynchrnous fetch request and React state are used to display the search results, the list of notes, and the bookmarked notes.
    - With changes in the pagination, only the components displayed were changed following the response from the request.
    - This provides a fast and responsive page especially with the `/search` function of the application where the results are rendered with every input the user make in the search bar and changes made to the filter toggles.
<details>
<summary>image</summary>

![Search toggles](README_images/Search.gif)
</details>

- It is also used to determine and alter the bookmark status of a note.
<details>
<summary>image</summary>

![Bookmark toggles](README_images/bookmarkFunction.gif)
</details>

### Mobile responsiveness

- Using mobile first approach, this application was developed to be responsive and fluid, taking into consideration on how this application will be displayed in a mobile setting.

<details>
<summary>image</summary>

![Navbar Desktop](README_images/DesktopSizeNav.gif)
![Navbar Mobile](README_images/MobileNav.gif)
</details>

### OnBeat

- The heart of this project is ultimately to make a web application that allows user to watch youtube videos while reading or taking notes simultaneously.
- It is estimated the numbers of smartphones in the world is about [90% of the global population](https://explodingtopics.com/blog/smartphone-stats), but the amount of person that owned a PC varies across the globe.

![PC per 100 person](README_images/PCper100.png)
<small><i>image courtesy of [world pupulation review](https://worldpopulationreview.com/country-rankings/computers-per-capita-by-country)</i></small>

- Firstly, the note portion of the application is made scrollable should a youtube video is available to make the video still visible to the user.


<details>
<summary>image</summary>

![Mobile view of note without video](README_images/MobileNoVideo.gif)
</details>

- This also applied when the user is taking notes, the component for inputing new notes is scrolled into view on click as it will be hidden initially. 


## What’s contained in each file you created.

### .github/workflows
- cy.yml


### Backend
<details>
<summary>views.py</summary>
</details>

<details>
<summary>helpers.py</summary>
</details>

- urls.py
- models.py
- admin.py
- test.py

### Frontend
#### src
<details>
<summary>/components</summary>


<details>
<summary><i>App.js</i></summary>
</details>

<details>
<summary><i>AuthContext.js</i></summary>
</details>

<details>
<summary><i>BasicModal.js</i></summary>
</details>

<details>
<summary><i>CreateNote.js</i></summary>
</details>

<details>
<summary><i>CSRFCookie.js</i></summary>
</details>

<details>
<summary><i>DisplayNoteComponent.js</i></summary>
</details>

<details>
<summary><i>DisplayTimestamp.js</i></summary>
</details>

<details>
<summary><i>ExpandMenu.js</i></summary>
</details>

<details>
<summary><i>getVideoID.js</i></summary>
</details>

<details>
<summary><i>Homepage.js</i></summary>
</details>

<details>
<summary><i>ListOfNotes.js</i></summary>
</details>

<details>
<summary><i>LoadingSpinner.js</i></summary>
</details>

<details>
<summary><i>Login.js</i></summary>
</details>

<details>
<summary><i>MarkdownDisplay.js</i></summary>
</details>

<details>
<summary><i>NavBar.js</i></summary>
</details>

<details>
<summary><i>NewNoteInput.js</i></summary>
</details>

<details>
<summary><i>NewTimestamp.js</i></summary>
</details>

<details>
<summary><i>Note.js</i></summary>
</details>

<details>
<summary><i>NoteCard.js</i></summary>
</details>

<details>
<summary><i>NoteInputField.js</i></summary>
</details>

<details>
<summary><i>Paginator.js</i></summary>
</details>

<details>
<summary><i>PrivateRoutes.js</i></summary>
</details>

<details>
<summary><i>Register.js</i></summary>
</details>

<details>
<summary><i>Search.js</i></summary>
</details>

<details>
<summary><i>TextInputField.js</i></summary>
</details>

<details>
<summary><i>YoutubeIframe.js</i></summary>
</details>

<details>
<summary><i>YoutubeLinkInput.js</i></summary>
</details>

</details>

- This folder contains all of the React component used by the application

- `index.js`

#### static
<details>
<summary>/css</summary>

- `index.css`
    - The css file, compiled with Sass from `index.scss`
- `index.scss`
    - Using `--watch index.scss : index.css`, this file was automatically compiled when writing the styles for the application.

</details>

- `frontend/main.js`
    - The bundle of all of the Javascript from the `src` file.
#### templates/frontend
- `index.html`
    - This is the rendered HTML template

## How to run the application.
1. Install virtualenv

```
pip install virtualenv
```

2. Create a virtual environment

```
python -m venv venv
```

3. Activate the virtual environment

```
venv\Scripts\activate
```

4. Install the required python packages 

```
python -m pip install -r requirements.txt
```

5. Create a .env file
    - The .env file should contain two variables. 
    - The `DJANGO_SECRET_KEY` should hold the value for the `SECRET_KEY` found in the `settings.py` file.
    - The variable `DJANGO_APP_URL` should hold the value for the url of the server when running `manage.py runserver`. For example: `http://127.0.0.1:8000`.

6. Navigate into the Django app file
```
cd OnBeat
```
    - this folder should be the one containing the `manage.py` file.

7. Run the server
```
./manage.py runserver
```

## Any other additional information the staff should know about your project.
