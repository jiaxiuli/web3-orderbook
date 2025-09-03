# web3 orderbook App (Frontend + Backend)

This project contains a **Frontend** (React) and a **Backend** (Node.js/Express) inside one repository.  
You can install dependencies and start both servers with **one command**.

---

## 📂 Project Structure
project-root/
Back-end/
server/ # Node.js + Express backend
Front-end/ # React frontend
package.json # Root config for scripts
README.md


---

## 🚀 Getting Started

### 1. Install Root Dependencies
We use [concurrently](https://www.npmjs.com/package/concurrently) to run both servers at the same time.
```bash
npm install
```

### 2. Install Frontend & Backend Dependencies

This will run npm install inside both Back-end/server and Front-end.
```bash
npm run install-all
```

### 3. Start Both Servers

This will start the backend and frontend concurrently.

Backend typically runs on http://localhost:3100

Frontend typically runs on http://localhost:3000
```bash
npm start
```