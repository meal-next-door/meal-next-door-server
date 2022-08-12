------------------------
DISCLAIMER 

This is the BACKEND repositor (built in Express + MongoDB), the FRONTEND can be found here : https://github.com/meal-next-door/meal-next-door-client

------------------------
DESCRIPTION

In the context of our bootcamp at Ironhack we were asked to build an app where users could login and logout and add, create, update and delete content for at least two models.

With these instructions in mind, we decided to create an app to would allow anyone that doesn't know what to eat and doesn't want to cook to look for chefs (amateur or professionals) nearby and see what they have to offer. This app is an alternative to restaurant and food delivry services/app.

By connecting customers and cooks it allows customers to connect with cooks and enjoy their delicious meal. 

For cooks: if you are an amateur cook and have leftovers, this can be a way to find people with the same tastes and avoid wasting. For professional chefs you can use this app as your own "restaurant" and connect with customers near you.

For customers: this is an innovative way of finding what delicious meals are being prepared next to you.

Waste is a global problem and our app is a humble try at tackling this problem.

We hope that you enjoy it as much as we do ! 

------------------------
INSTRUCTIONS

In order to run this app on your local machine you will need to :
- create a .env file with the following varaiables :
    - PORT : the local port you want to host your app on
    - TOKEN_SECRET : to initiate a session. It can be whatever you want (eg: 'ilovepizza')
    - ORIGIN : which is the port on which your are hosting your frontend

- Cloudinary:
Our app is using the services of Cloudinary to manage picture uploads. In order to use, no backend configurations required but you will need to do follow the instructions in the frontend repository ;).

Before running your app you will also need to add dependencies. You can simply run the command 'npm install' in your terminal.

Then run the application with magic words : 'npm run dev'.

Enjoy !

------------------------
If you want to try the live version, is here the link to the demo : https://meal-next-door.netlify.app/

You can also fin the REST API on Heroku here : https://meal-next-door.herokuapp.com/api