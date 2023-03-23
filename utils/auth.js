// const withAuth = (req, res, next) => {
//     if (!req.session.logged_in) {
//       res.redirect('/login');
//     } else {
//       next();
//     }
//   };
  
//   module.exports = withAuth;

const withAuth = (req, res, next) => {
  if (!req.session.logged_in &&
    !(//Any pages added to the site that should not be authenicated should be added to this list
      req.path.includes('login') ||
      req.path.includes('api') ||
      req.path.includes('signup') ||
      req.path === '/'
    )) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = withAuth;
