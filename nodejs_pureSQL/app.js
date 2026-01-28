import "dotenv/config";
import express from "express";
import usersRouter from "./src/router/users.js";
import ticketsRouter from "./src/router/tickets.js";
import authRouter from "./src/router/userAuth.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/tickets", ticketsRouter);

// Register the global error handler AFTER all routes so it can catch any errors they throw
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "This endpoint does not exist" });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
