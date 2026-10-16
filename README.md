# 🛒 Negative Mart

Single-file browser game for reviewing the **Present Simple negative** (don't / doesn't + V.1, and am / is / are not) with Grade 7 students.

| File | Language |
|------|----------|
| `negative-mart.html` | Thai interface |
| `negative-mart-en.html` | English interface (hints on every question + leaderboard) |
| `backend/Code.gs` + `backend/SETUP.md` | Optional Google Sheets backend for a class-wide leaderboard |

## How to play
Open either `.html` file in a browser (PC or mobile). No installation or internet needed.

- Level 1: click the correct answer
- Level 2: type a short answer
- Level 3: drag words into the blanks
- 7 questions per level, 15 seconds each, with a bomb countdown
- Hints, sound effects, music and read-aloud sentences

## Editing the questions
Open the file in a text editor and find `CONFIG` and `LEVELS` inside the `<script>` tag. Each question type is explained in the comments.

## Leaderboard (English version)
- **Default:** scores are stored in the browser (localStorage) of the device being used.
- **Class-wide board:** follow [`backend/SETUP.md`](backend/SETUP.md) (about 5 minutes, free) to send scores to a Google Sheet, then paste the Web App URL into `CONFIG.backendUrl`. If the backend is unreachable the game falls back to local scores automatically.

## Play online with GitHub Pages
Settings → Pages → Branch `main` → Save. The game will be at `https://<username>.github.io/negative-mart/negative-mart-en.html`.
