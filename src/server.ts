import app from "./app";
import { connectDatabase } from "./database";

const port = process.env.PORT || 3000;

connectDatabase();

app.listen(port, () =>
  console.log(`App is runing on http://localhost:${port} 🚀`)
);
