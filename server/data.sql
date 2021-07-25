CREATE TABLE users (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    user_password VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, user_password) VALUES ('ebuka@gmil.com', 'pass1234');

CREATE TABLE todos (
    todo_id BIGSERIAL NOT NULL PRIMARY KEY,
    todo TEXT NOT NULL,
    todo_creator BIGINT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    isCompleted BOOLEAN DEFAULT FALSE,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subtodos (
   subtodo_id  BIGSERIAL NOT NULL PRIMARY KEY,
    subtodo TEXT NOT NULL,
    todo_creator BIGINT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    todo_under BIGINT REFERENCES todos(todo_id) ON DELETE CASCADE NOT NULL,
    isCompleted BOOLEAN DEFAULT FALSE,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO classes (class_name, class_creator, class_description) VALUES ('ODE', 2, 'A wonderful place to get all the solutions to ODE and the rest');

CREATE TABLE expos (
    expo_id BIGSERIAL NOT NULL PRIMARY KEY,
    expo_title VARCHAR(100) NOT NULL,
    expo_creator BIGINT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    expo_class BIGINT REFERENCES classes(class_id) ON DELETE CASCADE NOT NULL,
    expo_content TEXT,
    expo_imageurl TEXT,
    expo_nswf BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO expos (expo_title, expo_creator, expo_class, expo_content) VALUES ('welcome to Ode', 2, 2, 'A wonderful place to get all the solutions to ODE and the rest');