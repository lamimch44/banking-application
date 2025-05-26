# 💸 MyBank - Full Stack Banking Web App

MyBank is a fully responsive, role-based banking application that supports general users and agents. Users can send and receive money, view transaction history, cash out, and manage requests. Agents can add money to users and send money requests.

---

## 📌 Features

### 👥 User Functionality
- 🔐 **Login/Signup** with validation
- 🏦 **Dashboard** with balance display and action buttons
- 💸 **Send Money** to other users
- 💼 **Cash Out** via agents
- 📜 **Transaction History** with:
  - Scrollable transaction list
  - Modal pop-up with transaction details (ID, sender, receiver, date, amount)
- 📥 **Money Request Handling**:
  - View pending requests from agents
  - Approve or reject requests

### 🧑‍💼 Agent Functionality
- 🔐 Agent login with a separate dashboard
- ➕ **Add Money** to a user's account
- 📨 **Send Money Request** to users
- 📄 View request status (pending/approved/rejected)

---

## 🧠 Tech Stack

| Layer         | Technology            |
|---------------|------------------------|
| Frontend      | HTML, CSS, JavaScript (Vanilla) |
| Backend       | Node.js, Express.js   |
| Templating    | EJS                   |
| Database      | MongoDB (Mongoose)    |
| Styling       | Single shared `style.css` file with class-based styling |
| UI Design     | Fully responsive, mobile-friendly layout |

---

## 🔐 User Roles

- `User` — Can send money, view transactions, cash out, and respond to agent requests.
- `Agent` — Can add money to users and initiate money requests.

> 🛑 **Note:** Same email cannot be used for both agent and user roles to avoid transaction confusion.

---

## 📁 Folder Structure (Frontend)
```
root/
│
├── bank-agent/                 # Agent
│   
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── public/
│   ├── routers/
│   ├── utilities/
│   ├── views/
│   ├── app.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json  
│
├── user/                 # User
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── public/
│   ├── routers/
│   ├── utilities/
│   ├── views/
│   ├── app.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json  

```

---

## 🚀 Getting Started

### 🔧 Install Dependencies
```bash
npm install
```
```bash
npm run dev
```

