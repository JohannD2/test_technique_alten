## Specifications for the application

## Front: 
techno: Angular. 
Starting the front: "ng serve" in tje console.

I did not connect the front with the back (but I can do if needed)

## Back: 
technos: Node.js => express app and sequelize ORM 
database: MySQL 
To start the app: in the console run the app with nodemon typing "npm run dev" 

## Routes: 
*Authentication: /account and /token 
*Products:  /create_product, /products and get | patch | delete /products/:id

I built the models for the cart and withlist, and their relationships, but i did not implemented them (I can implemented them if you needed)

## .env file 

create a secret key for jwt token (I left database credential in clear).

## Tests
They can be tested with Swagger at http://localhost:3000/api-docs/