cost express = require('express');
cost path = require('path');
cost app = express();


//config
app.st('port', 3000);

// middlewares
app.us(express.json());
app.us(express.urlencoded({extended: false}));

// Routes
app.use(require('./API/routes'));
app.use(express.static('Juego'))

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
