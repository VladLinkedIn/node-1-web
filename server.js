var express = require(`express`),
    request = require(`request`),
    fs = require('fs'),
    app = express(),
    hbs = require(`hbs`);
//--------------------------------------------
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {//maintenance middleware, no call next => next handlers don't fire
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

//---------------CALL-----------------------------
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle:'about page',
    welcomeMessage: 'WELCOME, USER'
  });
});
//-----------------CALL---------------------------
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle:'about page'
  });
});
//------------------CALL--------------------------
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to handle request'
  });
});
//-----------------LISTEN---------------------------
app.listen(3000, () => {
  console.log('PORT 3000 ONLINE');
});
