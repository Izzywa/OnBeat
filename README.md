# OnBeat

## Distinctiveness and Complexity
- This project is a full stack web application fully integrating the Django framework with the React library.
- This Django project have two application that serve as the backend and the frontend of the application, and named as such.
    - The `Backend` application will be responsible for the server side logic and database interactions, with the primary goal of handling requests and delivering responses.
    - The `Frontend` will utilise React to render the client-side interface providing a user interactive application.
- In the previous `Network` and `Mail` project, a single Django application will render the templates of appliction while the interactive user interface is implemented by asynchronous fetch requests or using `Babel` to translate JSX code written directly into the script of the HTML file.
    - This `OnBeat` project distinctiveness and complexity stems mostly on the setting the React app into the application.

### React application and Django REST framework
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

- In learning to integrate React application with Django, it was seen separating the backend and frontend portions of the application keeps the project more organised and streamlined.
- Changes to either frontend or backend of the application was more manageable, as the entire procedure was compartmentalised into smaller pieces. This ease the troubleshooting process as it makes it easier to pinpoint any irregularities.
- This also makes the development process more flexible and efficient, as each task is delegated and tackled separately with less likely chances that it would break the whole application.
<hr></hr>
</details>

- After setting up a Node project with `npm init`, several packages and modules were installed including:
    - [webpack](https://www.npmjs.com/package/webpack)
    - [babel](https://www.npmjs.com/package/Babel)
    - [react](https://www.npmjs.com/package/react)
    - [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- 




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