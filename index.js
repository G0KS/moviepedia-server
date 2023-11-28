require("dotenv").config();
require("./DB/connection");

const express = require("express");
const cors = require("cors");
const router = require("./Routes/router")

const movieServer = express();

movieServer.use(cors());
movieServer.use(express.json())
movieServer.use(router)
movieServer.use("/uploads", express.static("./Uploads"))

const PORT = 4200 || process.env.PORT;

movieServer.listen(PORT, () => {
   console.log("Server running in port: ", PORT);
});

