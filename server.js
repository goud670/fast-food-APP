// backend/server.js
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Firebase Admin SDK initialization
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com"
});

const db = admin.database();

// Fetch all foods
app.get("/foods", async (req, res) => {
  try {
    const snapshot = await db.ref("Foods").once("value");
    const data = snapshot.val();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch foods", error });
  }
});

// Add new food item (Admin only)
app.post("/foods", async (req, res) => {
  const { name, price, image, category } = req.body;
  try {
    const newFoodRef = db.ref("Foods").push();
    await newFoodRef.set({ name, price, image, category });
    res.status(201).json({ message: "Food item added", id: newFoodRef.key });
  } catch (error) {
    res.status(500).json({ message: "Failed to add food", error });
  }
});

// Place order
app.post("/orders", async (req, res) => {
  const { userId, items, total } = req.body;
  try {
    const newOrderRef = db.ref("Orders").push();
    await newOrderRef.set({ userId, items, total, status: "pending" });
    res.status(201).json({ message: "Order placed", id: newOrderRef.key });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
});

// Get user orders
app.get("/orders/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const snapshot = await db.ref("Orders").orderByChild("userId").equalTo(userId).once("value");
    res.status(200).json(snapshot.val());
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//end.



//File Setup
//In your project root:

pgsql
Copy
Edit
//backend
  ├── server.js
  ├── firebase-service-account.json
//Setup Instructions
//Install dependencies:

bash
Copy
Edit
npm init -y
npm install express firebase-admin cors
Add your Firebase Admin SDK key
Download it from Firebase Console > Project Settings > Service Accounts.

Start the server:

bash
Copy
Edit
node server.js
