# 🍽️ CulinaryCloud  
### Full Stack Recipe Explorer Application  

CulinaryCloud is a full-stack web application that enables users to explore, search, and view detailed recipes through a modern and responsive interface.  
The project demonstrates clean architecture and strong separation of concerns using a React frontend and a FastAPI backend.

---

## 🚀 Features

- 🔍 Search and browse recipes  
- 📄 View detailed recipe information in a modal interface  
- 📑 Pagination for improved user experience  
- ⚡ High-performance REST API built with FastAPI  
- 🗂 Structured backend with routers, schemas, and CRUD layers  
- 🎨 Clean and responsive UI built with React  

---

## 🛠 Tech Stack

### Frontend
- React.js  
- JavaScript (ES6+)  
- CSS3  
- Axios  

### Backend
- FastAPI  
- Python  
- Pydantic  
- JSON-based data storage  

---

## 📂 Project Structure


CulinaryCloud/
│
├── backend/
│ ├── app/
│ │ ├── routers/
│ │ ├── models.py
│ │ ├── schemas.py
│ │ ├── crud.py
│ │ └── database.py
│ ├── data/
│ ├── main.py
│ └── requirements.txt
│
├── frontend/
│ ├── public/
│ ├── src/
│ ├── package.json
│ └── package-lock.json


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/CulinaryCloud.git
cd CulinaryCloud
2️⃣ Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs at:
http://127.0.0.1:8000

3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs at:
http://localhost:3000

📡 API Documentation

FastAPI automatically generates interactive API documentation at:

http://127.0.0.1:8000/docs

🎯 Learning Highlights

Built a structured REST API using FastAPI

Implemented clean component-based architecture in React

Managed state and data flow efficiently

Applied modular backend design (routers, schemas, CRUD separation)

Practiced full-stack integration and frontend-backend communication

👩‍💻 Author

MohanaPoorani Ragunathan
Computer Science & Engineering Student
