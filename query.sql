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

-- UPDATE (PUT) TEMPLATE
-- {
--   "name": "Najla Updated",
--   "email": "najla.updated@example.com",
--   "username": "najlawUpdated",
--   "password": "newsecurepassword",
--   "role": "ADMIN"
-- }


-- Destination
CREATE TABLE destinations (
    destinationId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO destinations (name, location, category, description) 
VALUES 
('Bali Beach', 'Bali, Indonesia', 'Beach', 'Beautiful beach with clear blue water.');

-- ADD (CREATE) TEMPLATE
-- {
--   "name": "Pantai Kuta",
--   "location": "Bali, Indonesia",
--   "category": "Nature",
--   "description": "Pantai dengan pasir putih dan ombak yang indah"
-- }


-- tickets
CREATE TABLE tickets (
    ticketId INT AUTO_INCREMENT PRIMARY KEY,
    destinationId INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    capacity INT NOT NULL,
    available INT NOT NULL,
    schedule DATETIME NOT NULL,
    FOREIGN KEY (destinationId) REFERENCES destinations(destinationId) ON DELETE CASCADE
);

INSERT INTO tickets (destinationId, price, capacity, available, schedule)
VALUES (1, 50000, 50, 50, '2025-04-01 10:00:00');

-- ADD TEMPLATE
-- {
--   "destinationId": 1,
--   "price": 250000,
--   "capacity": 50,
--   "available": 50,
--   "schedule": "2025-03-20T08:00:00.000Z"
-- }

