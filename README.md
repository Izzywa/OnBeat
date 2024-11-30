# OnBeat

## Distinctiveness and Complexity
- This project is a full stack web application fully integrating the Django framework with the React library.
- This Django project have two application that serve as the backend and the frontend of the application, and named as such.
    - The Backend application will be responsible for the server side logic and database interactions, with the primary goal of handling requests and delivering responses.
    - The Frontend will utilise React to render the client-side interface providing a user interactive application.
- In previous projects, the Django server will render the templates of appliction and interactive user interface is implemented by asynchronous fetch requests or using `Babel` to translate JSX code written directly into the HTML file.
    - This `OnBeat` project distinctiveness and complexity stems mostly on the setting the React app into the application
### React application

## What’s contained in each file you created.

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
    - The variable `DJANGO_APP_URL` should hold the value for the url of the server when running `manage.py runserver`. For example: "http://127.0.0.1:8000".

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