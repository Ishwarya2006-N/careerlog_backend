import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import applicationRouter from './routes/applicationRoutes.js'; // ✅ added

const app = express();
const port = process.env.PORT || 4000;

// Connect to DB
connectDB();

// ===== CORS CONFIG =====
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://your-production-domain.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed from this origin'), false);
    }
  },
  credentials: true
}));

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads")); // ✅ serve uploaded resumes

// ===== ROUTES =====
app.get('/', (req, res) => {
  res.send("API is working");
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/applications', applicationRouter); // ✅ added

// ===== START SERVER =====
app.listen(port, () => console.log(`Server is running on PORT: ${port}`));
