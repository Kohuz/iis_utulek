const express = require('express');

// Express Application, it is a global variable, that takes options for the
// whole backend and it also executes everything.
const app = express();

require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT + '.')
});
