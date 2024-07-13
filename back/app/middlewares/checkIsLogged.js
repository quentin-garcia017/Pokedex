function checkIsLogged(req, res, next) {
    // Si l'utilisateur n'est pas connecter
    if (!req.loggedUser) {
      // Je le redirige vers la page de login
      res.redirect('/pokemons?error=needToBeLogged');
    } else {
      next();
    }
  }
  
  export default checkIsLogged;
  