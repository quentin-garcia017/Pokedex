function checkIsAdmin(req, res, next) {
    // Si l'utilisateur n'est pas connecter
    // le `?` est un `optional chaining` qui permet de ne pas avoir d'erreur si `req.loggedUser` est `undefined`
    // Il n'essayera pas d'accès à la propriété `role`, il va juste retourner `undefined`
    if (req.loggedUser?.role !== 'admin') {
      // sinon sans cela il faudrait faire
      // if (!req.loggedUser || req.loggedUser.role !== 'admin') {
      // Je le redirige vers la page de login
      res.redirect('/pokemons?error=needToBeAdmin');
    } else {
      next();
    }
  }
  
  export default checkIsAdmin;
  