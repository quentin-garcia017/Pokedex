function checkIsLogged(req, res, next) {
  if (!req.loggedUser) {
      // Si l'utilisateur n'est pas connecté, on renvoie une réponse JSON
      if (req.path === '/auth/status') {
          return res.json({ isAuthenticated: false });
      }
      // Sinon, redirection
      return res.redirect('/pokemons?error=needToBeLogged');
  }
  // Si l'utilisateur est connecté, on renvoie une réponse JSON
  if (req.path === '/auth/status') {
      return res.json({ isAuthenticated: true });
  }
  next();
}

export default checkIsLogged;
