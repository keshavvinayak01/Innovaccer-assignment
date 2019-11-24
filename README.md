## This is the assignment task for the summergeeks 2020 SDE internship

# Tech Stack used : 
1. Python/Django + Django rest framework
2. Celery/Redis
3. React + axios
4. Google SMTP (Email client)
5. Twilio (Automated messaging service)

# How to run :
1. Fire up a terminal, and run 
(preferably use a virtualenv)
```python3
pip3 install -r requirements.txt
```
2. Initialise the database
```python3
python3 manage.py makemigrations
python3 manage.py migrate
```
3. Start the Django server
```
python3 manage.py runserver
```
4. Make sure you have celery and redis-cli installed, then run the celery worker(queue)
```
celery worker -A innovaccer worker -l info
```

5. Install the npm packages and start the react client
```
cd innovaccer-frontend
npm install 
npm start
```
6. Before starting submitting the form, make sure there exists Users, if not, try this at root directory:
```shell
python3 manage.py 
from django.contrib.auth.models import User
User.objects.create(
    username="host1", 
    email="kvrox113@gmail.com", 
    first_name = "Ramesh", 
    last_name = "Kumar"
)
```
6. Try submitting the form, observe the output on the celery terminal, and your email address and phone numbers for messages.

# Examples : 
![alt_text](https://github.com/keshavvinayak01/innovaccer-assignment/blob/master/media/app.png)
![alt_text](https://github.com/keshavvinayak01/innovaccer-assignment/blob/master/media/terminal.png)
![alt_text](https://github.com/keshavvinayak01/innovaccer-assignment/blob/master/media/mail.png)
![alt_text](https://github.com/keshavvinayak01/innovaccer-assignment/blob/master/media/phone.png)

# Things to note :
For obvious reasons, I've excluded my keys and settings from config.ini file, add your twilio key, gmail account to use these features. Also, change file name to config_prod.ini afterwards.

# Planned work:
Because my exams are ongoing, I was not able to fully complete all the features I had planned, so I'll list them here : 
1. Loading Screen for React after submission, and better alerts.
2. Making Host unavailable after form submission and making them available after check out of current visitor.
3. Letting user know of closest time when a host will be free.