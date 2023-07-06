
# Rest API Messenger
This API is part of a self imposed challenge to develop a messaging app (like Telegram - to give some comparison). Said API is suppose to work as the back-end API and dataset for the app. The front-end app is developed for Apple devices (iPhone / iPad with Obj-C) which will be uploaded on its own repo. This project at this point implements only CRUD actions however it's functional enough to develop basic front-end functionality.

The API is divided in three sections: Users, Sessions and Conversations. Users takes care of all related actions for users (register and hold user information), Sessions all related to current sessions on multiple devices (generating one-time access tokens, keeping track of how many sessions there are for each user, etc.) and ultimately, Conversations which stores conversations, messages and their respective authors.


## Tech Stack

Back-end

- Node.JS
- [Express](https://github.com/expressjs/express)
- Body Parser
- ULID
- MySQL

## How to run it

The API uses MySQL as database engine, which is necessary to run it out-of-the-box. The DB schema needed for the API is in the [DB-Schema.sql](DB-Schema.sql) file. When run, it creates the DB and required tables. No mock data is inserted.

Edit the config files inside the [config](config/) folder with the connection info for the MySQL server and rename them to remove the ```-sample``` part.

Install all dependencies in the repo root folder with ```npm install```.

After successfully install every dependency, run ```node app.js```.

The API can be test with software similar to [Postman](https://www.postman.com/) or cURL.

## URI Routes

All URI have the /api/ prefix. So, in order to do a GET request for the users route, the URI should be (for eg, locally): ```http://localhost:8080/api/users/```

### Users
```
/users/			: POST : Creates user
/users/			: GET : Lists all users
/users/:id		: GET : Get user with :id
/users/:id		: PUT : Edits user with :id
/users/:id		: DELETE : Deletes user with :id
```

### Session
```
/session/			: POST : Creates session
/session/			: GET : Lists all sessions
/session/:id		: GET : Get session with :id
/session/:id		: PUT : Edits session with :id
/session/:id		: DELETE : Deletes session with :id
```

The next three categories should work together given that it relates the conversations (aka chats) with the users and the messages sent between (in 1-to-1 chats) or among (1-to-many) users (participants).

### Conversation
```
/conversation/					: POST : Creates conversation
/conversation/					: GET : Lists all conversations
/conversation/:id/:length		: GET : Get conversation with :id + :length
/conversation/:id				: PUT : Edits conversation with :id
/conversation/:id				: DELETE : Deletes conversation with :id
```

### Conversation Message
```
/convoMsg/			: POST : Adds message to conversation
/convoMsg/			: GET : Lists all conversation messages
/convoMsg/:id		: GET : Get conversation message with :id
/convoMsg/:id		: PUT : Edits conversation message with :id
/convoMsg/:id		: DELETE : Deletes conversation message with :id
```

### Conversation User
```
/convoUser/			: POST : Adds user to conversation
/convoUser/			: GET : Lists all users in conversations
/convoUser/:id		: GET : Get user conversation with :id
/convoUser/:id		: DELETE : Deletes user from conversation :id
```

## DB Schema

These are the relations among the several tables that store this information.

![Img Schema](https://github.com/psiico/Rest-API-Messenger/blob/master/DB-Relations.jpeg?raw=true)

- Each user may have as many sessions as they want.
- Each conversation (chat) may have as many users as desired. Two users (or participants) should be considered as a 1-to-1 chat, more than two users should be considered as a group conversation.


## Known limitations

- Only text messages are supported at the moment;
- No API security (token / secret / etc.).


## To be coded

- Storing and sending different types of data (Such as audio, video, images, etc.);
- Session management;
- PGP encryption;
- And Moarrr!

## License
Released under GPL-v3.

© Jéssica Pereira —> 2023
