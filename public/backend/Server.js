import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

// Middleware to log every request
app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log("Request Body:", req.body);  // Log form data
    next();
});

app.post("/submit-form", (req, res) => {
    console.log("🔥 New Form Submission!");
    console.log(`[${new Date().toISOString()}] POST /submit-form`);
    console.log("Received Data:", req.body);

    res.json({ message: "Form submitted successfully!" });
});



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
