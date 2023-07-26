
# NestJS backend AlanTest

Event Scheduler API


## Installation

Clone the repository and install dependecies with the next command(in the root directory):

```bash
  npm install
```

For run the project run the follow commnad:

```bash
  npm run start
```



## Usage/Examples

For test the pagination, test and sorting in the getAll events you can add the next string in the url:
?page=1&pageSize=3&filter=tes&sortBy=description&sortOrder=asc

```javascript
POST /events: Create a new event.
GET /events: Retrieve all events.
GET /events/:id Retrieve a single event by its event_id.
PUT /events/:id Update an existing event by its event_id.
DELETE /events/:id Delete an existing event by its event_id.
```






## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

DATABASE_URL="postgres://cntdxgat:F2z4h3Rf64GNSiyZpTl3S5UF_avrPsoi@batyr.db.elephantsql.com/cntdxgat"


## Demo

Link production
https://nestjsalan-dbc9e24471ed.herokuapp.com/

## Tech Stack

Database: ElephantSQL - PostgreSQL

Host: Heroku

Framework: NodeJS v16, NestJS v10

ORM: Prisma client v5




