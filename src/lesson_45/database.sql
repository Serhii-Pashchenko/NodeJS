create TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

create TABLE tokens (
  id SERIAL PRIMARY KEY,
  token VARCHAR(255),
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);