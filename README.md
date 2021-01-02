# Create and Attend to Conferences!

This is a technical-test app created for people that want to create and speak at their own conference and also for people that want to attend their conferences.

Go the the app 

## Important things about the App
- Be sure that when you sign up you do it with the actual role you want to play at the conferences. If you are a the Speaker then you should sign up as a **speaker** and the other way around for **attendands**.
- The App is not responsive yet

#### If you sign up as a speaker
- When you create a conference and an attendant has already marked that they will attend then you cannot cancel or delete the conference. So be sure if you want to create a conference.
- The canceled conferences will not be available for attendants to see them.
#### If you sign up as an attendant
- You can register to a conference only if this one has "quota" or "spots" (these are the same, I just wanted to call them different in the App for attendants and speakers)

## About the App itself

- The app was built using React and has an API built with Node, Express and MongoDB.
- I used passport and express-session for session handling.
- the routes are protected by the role of the user at the endpoint /user. If you are a speaker you will only be able to see the speaker panel and the same happens for attendants.
- The two roles **Speaker** and **Attendant** are represented in the code as **0** and **1** respectively.

## Running the app locally
-	Clone the app and run ```npm install``` 
-	Create a ```.env``` file and add a ```DB``` variable with your path to a MongoDB database. Also add  a ```SECRET_WORD_FOR_SESSION_HANDLING```  variable with any value that you want to assign.

#### You're ready to go!