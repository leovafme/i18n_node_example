'use strict'

const path         = require('path');
const express      = require('express');
const cookieParser = require('cookie-parser');

// this library
const i18n = require('i18n-x');

// create Express application
const app = express();
app.use(cookieParser());

// enable i18n
app.use(i18n({
    // array of locales to use in application
    locales: ['en', 'ru', 'es']
}));

// use Pug (formerly Jade)
app.set('view engine', 'pug');

app.get('/:var(en|ru|es)?', (req, res) => {
    // template path
    const template = path.resolve(__dirname, 'template', 'template.pug');
    // current locale
    let options = {}
    if (req.params.var) {
        req.i18n.setLocale(req.params.var)
        options = { locale: req.params.var };
    } else {
        options = { locale: req.i18n.getLocale() };
    }
    
    res.render(template, options);
});

// run Express application
app.listen(1555, () => {
    console.log('Test app listening on port 1555!');
});