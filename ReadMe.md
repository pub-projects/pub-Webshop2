# Web Shop 2

## Overview

The goal with the project is to create a fictive simple webshop.
I'm using JavaScript in both ends and a MongoDB database. I'm planning other similar projects that will probably use the same frontend but different backend support like .NET/C# SQLServer and PHP MySQL/MariaDB.

## Front-End

Front end is built in React initialized by npx create-react-app.
It's also using a Bootstrap version for react [React Bootstrap](https://react-bootstrap.github.io/)

## Back-End

Back end is also written in JavaScript and utilizes Node.js and express.js.
It also uses a local MongoDB database preloaded with the data found in the JSON array file initialDataProducts-mongodb.json located in the data-store folder.
Another initialization file for the user database will be added later when I get to login, user area, and site administration area.

## The Plan

- Login and Creating Accounts
  - Using username/email
  - Using Google
  - Using Facebook
  - Using LinkedIn
- User area where we can:
  - View orders
  - View invoices
  - Modify user's profile
- Admin area where we can update the database with:
  - Add new products
  - Update products
  - Delete products
  - Update user
  - Add new user
  - Delete Users
  - Assign user roles
- Site functionalities:
  - Logged in users can submit rating for products
  - A cart that can be used by both registered and non-registered users
  - Search function that searches the titles for given keyword(s)
  - A details page that displays all available information about an item
  - A star rating system that also displays the percentage of votes that each star rating has received
  - Hide and expand longer texts on the details page
  - Display price in different forms

Then we will also have the normal navigation bar that will change apperance depending on the user's role assignment and a simple footer.

\- Chris Johannesson 2022
