// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");
require("./db");

const express = require("express");
const app = express();
require("./config")(app);

app.use("/api", require("./routes/index.routes"));
app.use("/api", require("./routes/comment.routes"));
app.use("/api", require("./routes/auth.routes"));

require("./error-handling")(app);

module.exports = app;
