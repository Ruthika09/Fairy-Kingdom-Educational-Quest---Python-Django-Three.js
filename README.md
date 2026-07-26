# 🧚 Little Fairy Forest Adventure

## 📖 Overview

Little Fairy Forest Adventure is a **full-stack educational web application** developed for children aged **6–12 years**. The game combines storytelling with interactive learning to help children understand different types of animals through fun educational mini-games.

The story begins with a young fairy princess who becomes lost in a magical forest while exploring. To return to her father's kingdom, ruled by the Lion King, she must complete **six adventure phases**. Each phase contains a unique educational mini-game that teaches children about animals, such as herbivores and carnivores, mother and baby animals, animal shadows, footprints, habitats, and a final animal quiz.

The main objective of the project is not only to entertain children but also to provide an engaging learning experience through an interactive web application.

---

# 🎮 Educational Mini-Games

### 🌿 Phase 1 – Herbivores and Carnivores
Children classify animals into herbivores and carnivores to unlock the first map piece.

### 🦌 Phase 2 – Mother and Baby Animals
Players match baby animals with their respective mothers.

### 🧚 Phase 3 – Animal Shadow Matching
Players rescue Fairy Rose by matching animals with their correct shadows.

### 🐾 Phase 4 – Animal Footprints
Players identify animals based on their footprints.

### 🌍 Phase 5 – Animal Habitats
Players match each animal to its natural habitat.

### 👑 Phase 6 – Animal Quiz
The player answers five animal-related questions. A minimum of three correct answers is required to complete the adventure and return to the Lion King's kingdom.

---

# 💻 Technology Stack

## Backend

- Python
- Django
- SQLite

## Frontend

- HTML5
- CSS3
- JavaScript

## Graphics & Animation

- Three.js
- GSAP Animation Library

---

# ⚙️ How the Application Works

## Python

Python is the core programming language used to build the application. It handles the backend logic, game progression, session management, quiz validation, and communication between the user interface and the database.

---

## Django

Django is used as the web framework that manages the entire backend of the application.

It is responsible for:

- URL routing
- Processing user requests
- Rendering HTML pages
- Managing player sessions
- Handling game progression
- Saving player progress
- Database communication using SQLite

---

## HTML

HTML provides the structure of every webpage in the game.

It is used to build:

- Start Screen
- Story Pages
- World Map
- Mini-Game Pages
- Quiz Page
- Ending Screen

---

## CSS

CSS is responsible for the visual appearance of the application.

It provides:

- Responsive layouts
- Storybook-themed design
- Buttons and menus
- Animations
- Colors and typography

---

## JavaScript

JavaScript makes the game interactive.

It is used for:

- Mini-game logic
- Drag-and-drop activities
- Quiz validation
- Page transitions
- Character dialogue
- Interactive buttons

---

## Three.js

Three.js is used to enhance the visual experience of the game with lightweight animations.

Examples include:

- Fairy dust particles
- Sparkling effects
- Fireflies
- Glowing objects
- Magical scene transitions

---

## SQLite

SQLite is the default database used by Django.

It stores:

- Player name
- Current level
- Completed phases
- Quiz score
- Saved game progress

---

# 🚀 Installation

## Install Python Dependencies

```bash
pip install -r requirements.txt
```

## Apply Database Migrations

```bash
python manage.py migrate
```

## Run the Django Development Server

```bash
python manage.py runserver
```

---

# ▶️ Open the Application

Open your browser and visit:

```
http://127.0.0.1:8000/
```

The application will launch, displaying the Start Screen where players can begin their adventure.

---



# 👩‍💻 Developer

**Ruthika S**

Bachelor of Engineering – Electronics and Communication Engineering

This project was developed as an educational full-stack web application to demonstrate skills in Python, Django, frontend development, and interactive game design.
