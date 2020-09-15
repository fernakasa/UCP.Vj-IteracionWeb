const express = require('express');
const path = require('path');
const app = express2();

//config
app.set('port', 3000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./API/routes'));
app.use(express.static('Juego'))

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
