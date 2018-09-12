let express = require('express');
let compression = require('compression');
let index = require('./routes/actions');
let app = express();
const bodyParser = require('body-parser');


app.use(compression());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/', index);

app.listen(80, () => console.log('Svg-Noder app is now listening on port 80.'));
