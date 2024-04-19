import express from "express";

console.log("Initialising JSON API ...");

const app = express();
app.use(express.json());
app.get("/", (_, res) => {
  res.send("JSON API /api");
});

app.post("/api/echo", (request, response) => {
  console.log(`${new Date().getTime()} : Echo`);
  response.json(request.body);
});

const PORT = 8081;
const server = app.listen(PORT, () =>
  console.log(`Running JSON API server on http://localhost:${PORT}`),
);

const closeHandler = async () => {
  server.close(async (error: any) => {
    console.log("JSON API server closed");
    if (error) {
      console.error(`Error on close : ${error}`);
    }
    process.exit(error ? 1 : 0);
  });
};

process.on("SIGTERM", closeHandler);
process.on("SIGINT", closeHandler);
