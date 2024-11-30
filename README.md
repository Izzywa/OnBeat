# OnBeat

- `backend.views.register`:
    - remove note on `login(request, user)` after creating user


what you did and why you did it

## Distinctiveness and Complexity
-  why it satisfies distinctiveness and complexity requirements:
    - 

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

6. Navigate into the Django app file with `cd OnBeat`
    - this folder should be the one containing the `manage.py` file.

7. Run the server with `./manage.py runserver`

## Any other additional information the staff should know about your project.