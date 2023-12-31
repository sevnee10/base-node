const authRoute = require('./auth')
const path = require('path')

const routes = [
  {
    path: '/api/auth',
    route: authRoute,
  },
];

module.exports = app => {
  app.get('/dashboard', (req, res) => {
    res.send('This is dashboard')
  });

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/auth/login.html'))
  });

  routes.forEach((route) => {
    app.use(route.path, route.route);
  });
}