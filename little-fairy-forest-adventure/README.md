# 🌸 Little Fairy Forest Adventure

An interactive, educational visual novel adventure game for children aged 6–12, built with **Python**, **Django**, **React**, **TypeScript**, **Tailwind CSS**, **Three.js**, and **Web Audio API**.

---

## 🌟 Game Story & Objective

The player becomes a lost fairy princess/prince in the magical Enchanted Forest. Her father, the **Lion King**, rules the distant **Rainbow Blossom Kingdom**.

To find her way home, the player must complete 5 educational animal challenges to collect **5 Magical Map Pieces**:
1. **Phase 1 (Whispering Forest)**: Herbivores vs. Carnivores sorting with Wise Owl.
2. **Phase 2 (Baby Animal Meadow)**: Reuniting lost baby animals with their mothers.
3. **Phase 3 (Crystal Waterfall)**: Animal shadow matching to break the spell and rescue Fairy Rose.
4. **Phase 4 (Magic River)**: Footprint matching to build a stepping stone bridge across the river with Explorer Fox.
5. **Phase 5 (Tree of Wisdom)**: Sorting animals into their home habitats (Forest, Ocean, Desert, Farm, Arctic) with Guardian Turtle.
6. **Final Phase (Lion Castle Gate)**: Passing the Lion King's 5-Question Royal Animal Quiz to unlock the castle gate and celebrate home reunion!

---

## 🚀 How to Run Locally with Python & Django (VS Code)

### Prerequisites
- **Python 3.10+** installed on your machine.
- **VS Code** or any code editor.

### Step-by-step Setup Instructions

1. **Clone or Open Project in VS Code**:
   Open the repository folder in VS Code terminal.

2. **Create a Virtual Environment** (Optional but Recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate    # On macOS/Linux
   # OR
   venv\Scripts\activate       # On Windows PowerShell
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Database Migrations (SQLite)**:
   ```bash
   python manage.py migrate
   ```

5. **Start Django Development Server**:
   ```bash
   python manage.py runserver
   ```

6. **Play in Browser**:
   Open your browser to `http://127.0.0.1:8000/` or `http://localhost:8000/`.

---

## ⚡ How to Run with Node.js / Vite Preview

If you prefer running the live React + Vite interactive preview on port `3000`:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to play the full game!

---

## 📁 Django Project Structure

```
.
├── manage.py                   # Django management script
├── requirements.txt             # Python dependencies
├── fairy_forest_project/        # Root Django project package
│   ├── __init__.py
│   ├── settings.py              # SQLite, Static, Apps, CORS configuration
│   ├── urls.py                  # Main URL router
│   ├── wsgi.py                  # WSGI entry point
│   └── asgi.py                  # ASGI entry point
├── game/                        # Django app
│   ├── admin.py                 # Admin models registration
│   ├── apps.py
│   ├── models.py                # PlayerProfile, GameProgress, AnimalFact
│   ├── views.py                 # Index view & REST endpoints (/api/save-game/)
│   ├── urls.py                  # App URLs
│   ├── templates/game/          # HTML templates
│   └── static/                  # CSS, JS, assets
├── src/                         # React / Vite frontend source
│   ├── assets/images/           # Generated character portraits, logo, background
│   ├── components/              # Game screens & mini-game components
│   ├── data/gameData.ts         # Animal data, dialogue lines, quiz questions
│   ├── utils/audio.ts           # Web Audio API sound synthesizer
│   └── App.tsx                  # Main game state machine
```

---

## 💖 Values & Educational Scope
- **Values Taught**: Kindness, Friendship, Helping Others, Courage, Environmental Love.
- **Animal Knowledge**: Herbivores & Carnivores, Animal Families (Mother & Baby), Footprints, Shadows, World Habitats.
- **Child-Friendly**: 100% gentle, no violence, no scary scenes, bright colors, comforting melodies.

---

## 🎨 Asset Image Specifications
All character portraits and game backgrounds follow a consistent 3D Pixar-style storybook render:
- `golden_fairy_portrait.png`: Princess Fairy portrait
- `wise_owl_guide.png`: Wise Owl guide
- `fairy_rose_companion.png`: Fairy Rose companion
- `explorer_fox_guide.png`: Explorer Fox
- `guardian_turtle_protector.png`: Guardian Turtle
- `lion_king_portrait.png`: Lion King
- `magical_forest_background.png`: Enchanted Forest Start Screen
- `little_fairy_forest_adventure_logo.png`: Game Title Banner Logo
