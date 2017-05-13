const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use( (req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res)=>{
  //res.send('<h1>Hello ExpressJs!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our Website!'
  });
});

// app.get('/maintenance', (req, res)=>{
//   //res.send('<h1>Hello ExpressJs!</h1>');
//    res.render('maintenance.hbs', {
//     pageTitle: 'maintenance',
//     maintanenceMessage: 'Will be back soon, thanks for your understanding.'
//   });
// });

app.get('/about', (req, res)=>{
  //res.send('<h1>About Page</h1>');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad2', (req, res)=>{
  res.send('<h1>404 Bad request.</h1>');
});

var eM = 'Error Handling Request';
app.get('/bad', (req, res)=>{
  res.send({
    errorMessge: eM
  });
});

app.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});





// app.get('/', (req, res)=>{
//   //res.send('<h1>Hello ExpressJs!</h1>');
//   res.send({
//     name: 'MSaif',
//     Likes: [
//       'Quran',
//       'Biking',
//       'Coding'
//     ]
//   });
// });
