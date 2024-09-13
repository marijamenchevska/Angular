# Car Dealership Server

## How to run the server

1. npm install
2. npm run start (If you want to change something and see changes, just run `npm run start:dev`)
3. Run PG Admin to see the database
4. Create a new database called `car_dealership`
5. Copy all properties from `.env.example` to `.env` and change them to your needs

## Using the server

- Api endpoints: `localhost:3000/api`
- Swagger: `localhost:3000/swagger`

## Using the server without authentication and authorization

Using the property `NO_AUTH` you can override the authentication and authorization. To disable auth, just set the value to `true`. To enable auth, set the value to `false` or remove the property from the `.env` file.

Before you start using the endpoints, invoke the following endpoint `api/users/init-users` to initialize two users: `admin` and `user`.

User information:

```json
[
  {
    "role": "User",
    "id": "d65387fe-f156-4e67-9054-66e695dbee1c",
    "email": "user@example.com",
    "password": "Pas$w0rd"
  },
  {
    "role": "Admin",
    "id": "2a23b510-e5d1-4688-a9d6-01cb92afc87d",
    "email": "admin@example.com",
    "password": "Pas$w0rd"
  }
]
```

Admin user will be used as default user for each request when the `NO_AUTH` property is set to `true`.

## Backfilling the database with data (cars)

Invoke the following endpoint `api/cars/backfill` to backfill the database with data.

You MUST invoke the users endpoint BEFORE you backfill the database with cars, as each car must have a sellerId.

### Using the backfill endpoint

To determine the number of cars to backfill, you can add any number in the count query parameter.
To manually set the userIds (must be existing users), you can add the query parameter `userIds` and pass an array of userIds, which will randomly be set as the sellerId of each car.

### Handling images

Mock expects the images to be in the `car-images` folder, and be named `1.jpg`, `2.jpg`, etc. It's expecting numbers from 1-30 in the name. Fell free to update the faker and increase/decrease the number of images or change the extension.
