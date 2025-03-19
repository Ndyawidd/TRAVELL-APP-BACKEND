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

-- orders
CREATE TABLE orders (
    orderId        INT AUTO_INCREMENT PRIMARY KEY,
    userId        INT NOT NULL,
    ticketId      INT NOT NULL,
    quantity      INT NOT NULL,
    totalPrice    DECIMAL(10,2) NOT NULL,
    paymentStatus ENUM('PENDING', 'PAID', 'CANCELLED') DEFAULT 'PENDING',
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (ticketId) REFERENCES tickets(ticketId) ON DELETE CASCADE
);

INSERT INTO orders (userId, ticketId, quantity, totalPrice, paymentStatus) 
VALUES (1, 1, 2, 500000, 'PENDING');

-- ADD TEMPLATE
-- {
--    "userId": 1,
--    "ticketId": 1,
--    "quantity": 3,
--    "totalPrice": 150000,
--    "paymentStatus": "PAID"
-- }

-- wishlists
CREATE TABLE wishlists (
    wishlistId    INT AUTO_INCREMENT PRIMARY KEY,
    userId        INT NOT NULL,
    destinationId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (destinationId) REFERENCES destinations(destinationId) ON DELETE CASCADE
);

INSERT INTO wishlists (userId, destinationId) 
VALUES (1, 1);

-- reviews
CREATE TABLE reviews (
    reviewId      INT AUTO_INCREMENT PRIMARY KEY,
    userId        INT NOT NULL,
    destinationId INT NOT NULL,
    rating        INT CHECK (rating BETWEEN 1 AND 5),
    comment       VARCHAR(500) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (destinationId) REFERENCES destinations(destinationId) ON DELETE CASCADE
);

INSERT INTO reviews (userId, destinationId, rating, comment) 
VALUES (1, 1, 5, 'Tempatnya bagus banget, worth it!');

-- ADD REVIEWS
-- {
--         "userId": 3,
--         "destinationId": 1,
--         "rating": 4,
--         "comment": "seru banget liburan disini, next time mau kesini lagi ah"
-- }

-- ADMIN RESPONSE
CREATE TABLE responses (
    responseId    INT AUTO_INCREMENT PRIMARY KEY,
    reviewId      INT NOT NULL,
    userId        INT NOT NULL,
    response      TEXT NOT NULL,
    createdAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reviewId) REFERENCES reviews(reviewId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

INSERT INTO responses (reviewId, userId, response) 
VALUES (2, 3, 'Terimakasih atas ulasannya');

