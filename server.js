const express = require("express");
const cors = require("cors");
const cartRoutes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", cartRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started http://localhost:${port}`);
});

// Use Express to create your server.
// 2. Require the module that will contain the routes you have created.
// 3. Start your server out with a hard-coded array of cart items, each including id, product,
// price, and quantity.
// 4. Test your endpoints using Postman.
// 5. Also test your finished API using https://gc-express-tester.surge.sh. To do so, you must
// enable CORS support using the node cors package.
