import cors from "cors";
import express from "express";
import errorHandler from "./middleware/errors";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening...");
});
