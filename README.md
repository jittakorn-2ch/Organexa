
# Organexa

Fullstack project using **Django (backend)** and **React (frontend)**.

---

## 📦 Clone Repository

```bash
git clone <repository-url>
```

## 🚀 Backend Setup (Django)

### Create & Activate Virtual Environment
```bash
python -m venv env
env\Scripts\activate
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Load Environment Variables
- PowerShell
```bash
Invoke-Expression -Command (Get-Content .env -Raw)
```
- CMD
```bash
for /f "usebackq delims=" %a in (.env) do set %a
```

### Run Backend Server
- For First Time
```bash
cd backend
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
Invoke-Expression -Command (Get-Content .env -Raw)
python manage.py migrate
python manage.py runserver
```
- For Another Time
```bash
cd backend
env\Scripts\activate
Invoke-Expression -Command (Get-Content .env -Raw)
python manage.py runserver
```

Backend URL: http://127.0.0.1:8000


## 🖥️ Frontend Setup (React)

### Install Dependencies
```bash
npm install
```

### Run Frontend Server
- For First Time
```bash
cd frontend
npm install
npm run dev
```
- For Another Time
```bash
cd frontend
npm run dev
```

Backend URL: http://localhost:5173


## 📁 Project Structure

```text
Organexa/
├── backend/
│   ├── manage.py
│   ├── app/
│   ├── env/
│   ├── .env
│   └── requirements.txt
│
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```
