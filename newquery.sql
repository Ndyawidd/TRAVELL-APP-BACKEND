-- Biar connect ke database nya di cmd ketik:
-- npx prisma db push

-- User
CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'USER') DEFAULT 'USER',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, username, password, role)
VALUES ('Nadya', 'nadya@example.com', 'nadyaw', 'hashed_password', 'USER');


-- Ticket
-- POST 
-- http://localhost:5000/tickets
-- {
--   "name": "Trip to Bandung",
--   "price": 250000,
--   "capacity": 30,
--   "description": "Wisata kuliner dan alam di Bandung",
--   "image": "https://via.placeholder.com/150",
--   "location": "Bandung Indah Plaza",
--   "latitude": -6.9147,
--   "longitude": 107.6098
-- }
