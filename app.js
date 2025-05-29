import express from "express";
const app = express();
export default app;
import foldersRouter from "#db/api"
import filesRouter from "#db/api"

app.use(express.json());

app.use("/folders", foldersRouter);

app.use("/files", filesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});

