# 💸 MyBank - Full Stack Banking Web App

MyBank is a fully responsive, role-based banking application that supports general users and agents. Users can send and receive money, view transaction history, cash out, and send money requests. Agents can add money to users and manage requests.

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
- 📨 **Send Money Request** to agents

### 🧑‍💼 Agent Functionality
- 🔐 Agent login with a separate dashboard
- ➕ **Add Money** to a user's account
- 📥 **Money Request Handling**:
  - View pending requests from users
  - Approve or reject requests
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

- `User` — Can send money, view transactions, cash out, and initiate money requests.
- `Agent` — Can add money to users, send money to agent, view transactions and respond to user requests .

> 🛑 **Note:** Same email cannot be used for both agent and user roles.

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
npm start
```
### 🌐 Open in Browser

After starting the development server, visit:

```http://localhost:4000```
And the bank agent
```http://localhost:5000```

---

## 📌 Future Improvements

- 📧 Email verification and password reset system
- 📊 Dashboard analytics for users and agents
- 🛠 Admin panel for system monitoring and user management
- 🔐 Pin verification system in every transaction

---

## 🛡 License

This project is open-source and free to use under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 🙌 Acknowledgement

Frontend designed and styled with the help of [ChatGPT](https://openai.com/chatgpt), developed as part of a full-stack learning journey.


