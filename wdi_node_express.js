var express = require('express');
var app = express();

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Example app listening on port '+PORT);
});