# Chess
A chess game built with JavaScript and HTML Canvas featuring custom movement logic, check and checkmate detection.


# Chess Game ♟️

A chess game built with **JavaScript, HTML Canvas and CSS**.

This project was created as a learning project to improve my skills in:
- Object-Oriented Programming
- Canvas API
- Game logic development
- Event handling
- Debugging complex systems

---

## 🎮 Features

- Rendering chess board using HTML Canvas
- Sprite sheet based chess pieces
- Object-oriented chess piece system
- Click based piece selection
- Turn management (White / Black)
- Legal movement rules for all chess pieces:
  - Pawn
  - Rook
  - Knight
  - Bishop
  - Queen
  - King
- Capturing opponent pieces
- Check detection
- Checkmate detection
- Game over screen

---

## 🛠 Technologies

- HTML5
- CSS3
- JavaScript
- Canvas API

---

## 📌 Development Process

The project was built step by step:

### 1. Canvas System
- Created the canvas environment
- Loaded and rendered the chess board
- Calculated board cells using rows and columns

### 2. Chess Piece System
Created a reusable `Chess` class containing:

- Image data
- Sprite coordinates
- Position
- Piece type
- Color
- Movement state

Each chess piece is an object created from this class.

### 3. Movement System

Implemented movement rules for every chess piece:

- Pawn movement and capturing
- Knight L-shaped movement
- Bishop diagonal movement
- Rook straight movement
- Queen combined movement
- King one-square movement

Added path checking for pieces that cannot jump over other pieces.

### 4. Game Logic

Implemented:

- Turn system
- Detecting friendly and enemy pieces
- Capturing system
- Checking if the king is under attack
- Preventing illegal moves that leave the king in check
- Checkmate detection

---

## 🧠 What I Learned

During this project I practiced:

- Working with JavaScript classes
- Managing game objects with arrays
- Using array methods like:
  - `find()`
  - `filter()`
  - `some()`
- Building logic-heavy systems
- Separating movement rules from attack rules
- Debugging recursive logic problems

---

## 🤖 Development Assistance

AI assistance was used during development for:

- Reviewing algorithms
- Debugging complex problems
- Improving chess rule implementation
- Designing solutions for check and checkmate logic

The main project structure, Canvas implementation, object system, assets handling and development process were created and implemented by me.

---

## 🚀 Future Improvements

Possible future features:

- Castling
- En passant
- Pawn promotion
- Move history
- Chess timer
- AI opponent
- Online multiplayer

---

## 📷 Preview

(Add screenshot or GIF of the game here)

---

## 📄 License

This project is made for learning purposes.
