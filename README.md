# [Fwitter](https://timothyglee94.github.io/fwitter)

This project was made with React and Firebase to clone twitter's basic functions 

## Repository 

In this project there are several components and routes that makes up this application 

* src 
  * components
    * App.js
    * AuthForm.js
    * Fweet.js
    * Fweetboard.js
    * Navigation.js
    * Route.js
  * routes
    * Auth.js
    * Home.js
    * Profile.js
  * styles
    * AuthFormStyle.css
    * AuthStyle.css
    * FweetBoardStyle.css
    * FweetStyle.css
    * Profile.css
  * fbase.js
  * index.js
  * style.css

#### App.js 
App.js is basic frontline of the application
It calls firebase to see if user is logged in, and passes user information to navigation

#### AuthForm.js
AuthForm contains Authentication form of the application. 
Sign in, Creat an account and log in with Social accounts. 

#### Fweet.js
Fweet (meaning fake tweet) consist of text and/or image 

#### Fweetboard.js 
consist of adding, editing and deleting fweets. 
Editing and deleting is only allowed to the owner of the fweet. 

#### Navigation.js
Navigation helps users to navigate betweet profile page and home page.

#### Router.js
Hashrouter was used to make page routes, contains user object that has been passed by App.js 

#### Auth.js 
Authentication page which shows log in page 

#### Home.js
Home page of the application, shows home button, profile button fweetboard and fweets 

#### Profile.js 
User's profile page. allows to change user name, and shows fweets that has been made by the user 

#### fbase.js
Firebase component of the application, authorizing and authenticating with firebase. 


## Overview 

<img src="https://github.com/timothyglee94/fwitter/blob/master/public/sign_in.png/" alt="sign_in" width="300"/>
<img src="https://github.com/timothyglee94/fwitter/blob/master/public/creat_account.png/" alt="creataccount" width="300"/>
<img src="https://github.com/timothyglee94/fwitter/blob/master/public/homepage.png/" alt="homepage" width="300"/>
<img src="https://github.com/timothyglee94/fwitter/blob/master/public/profile_page.png/" alt="sign_in" width="300"/>


## Note
#### Currently github log-in is not supportive 
