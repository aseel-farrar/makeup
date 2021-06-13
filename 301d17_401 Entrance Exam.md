# 401 Entrance Exam

## Instructions:

### Make sure before starting to:

- Turn off any means of communication (phone, Slack, Email).
- Start your screen recording and share your face camera.
- You are not allowed to use previous projects, notes , or GitHub.
- You can use Google search engine.

## Create a new repository on your GitHub.

## Requirements:

1. You will create a webapp to provide the users with all the products from Maybelline brand that are retrieved from [Make-up API](http://makeup-api.herokuapp.com/)

1. In the **Home Page**, the user wants to have the ability to get the products that are between a range of prices for Maybelline brand using this [endpoint](http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&price_greater_than=10&price_less_than=14). You will change the parameters values based on the user inputs in the form. Once the user fills in the form then should be redirected to the **Product By Price** page, where the results should be diaplayed as cards with name, price, image and description. **(12 points)**

1. In the **Maybelline Products** page, the user wants to get all Maybelline products that are retrieved from this [endpoint](http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline). The results should be displayed as cards (each card should have these data: name, price, image, description and add-to-card button). You have to use a **CONSTRUCTOR** function to construct the objects. when the user clicks on the 'add-to-card' button then this record should be added to the database and be redirected to the **My Card** page. **(28 points)**

1. In the **My Card** page, the user wants to view all the records that are retrieved from the database and displayed as cards (Each card should have the name, price, image, description and View-Details button). If there is no data in the database, then **No Products in Your Card** should be rendered. Once the user clicks on the 'View-Details' button then should be redirected to the **Product Details** page. **(12 points)**

1. In the **Product Details** page, the user wants to view the selected product details from the database(name, price, image, description, Update and Delete buttons). **(10 points)**

1. In the **Product Details** page, When the user clicks on the 'Delete' button, the record should be deleted from the database and be redirected to the **My Products** page. Also, when the user clicks on the 'UPDATE' button, an update form will be shown where the user can update the data in the database and should be redirected to the same page **Record Details**. **(10 points)**

1. The user should have a simple UI design (using Flexbox or Grid for all the cards in the webapp). **(5 points)**

1. Deploy your webapp on Heroku. **(5 points)**

1. Keep your code clean, also use proper naming for both variables and functions (idiomatic style) and proper indentation. **(3 points)**

1. Full run webapp. **(6 points)**

1. You should follow the provided wireframe structure in your webapp.

## Resources

- You can use **any technology** you've learned during code 301 course to achieve the above requirements.
- You can use this [SQL cheat sheet](https://www.sqltutorial.org/sql-cheat-sheet/).
- For connecting to database you can use:
  - for MAC `postgres://localhost:5432/DBNAME`
  - for WIN `postgresql://username:password@localhost:5432/DBNAME`
- For connecting the schema to your database `psql -f <path/to/schemaFile> -d <database-name>`
- For connecting the schema to Heroku `heroku pg:psql -f <path/to/schemaFile> -a <heroku-app-name>`
- If you face any connection issues to the database, don't forget to start your Postgres server:
  - for MAC `brew services start postgresql`
  - for WIN `sudo service postgresql start`
- If you use `WSL` and have weird issues with your server, you can use this command `killall -s KILL node`. **keep using `ctrl+c`**

```Javascript
//useful express codes
require('dotenv').config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
const client = new pg.Client(process.env.DATABASE_URL);
const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const client = new pg.Client( { connectionString: process.env.DATABASE_URL, ssl: process.env.LOCALLY ? false : {rejectUnauthorized: false}} );
```

## Libraries Resources

1. [Express](https://www.npmjs.com/package/express)
1. [Dotenv](https://www.npmjs.com/package/dotenv)
1. [Pg](https://node-postgres.com/)
1. [Ejs](https://www.npmjs.com/package/ejs)
1. [Method-override](https://www.npmjs.com/package/method-override)
1. [Superagent](https://www.npmjs.com/package/superagent)
1. [JQuery](https://code.jquery.com/)

## Submission Instructions:

- Submit the link of your GitHub repo for this project.
- Submit the Heroku link for the project.
- After completing the exam, do **NOT** commit or push anything to your repo.
- Send the recorded video to your instructor on Slack.