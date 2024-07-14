import { Router } from "express";
import * as pokemonController from "./controllers/pokemonController.js";
import * as typeController from "./controllers/typeController.js";
import * as teamController from "./controllers/teamController.js";
import authController from "./controllers/authController.js";
import cw from "./utils/controllerWrapper.js";
import checkIsLogged from "./middlewares/checkIsLogged.js";
import checkIsAdmin from "./middlewares/checkIsAdmin.js";



export const router = Router();

router.get("/pokemons", cw(pokemonController.getPokemons));
router.get("/pokemons/:id", cw(pokemonController.getPokemon));
router.get("/pokemons/pokemon/:name", cw(pokemonController.getpokemonbyname));

router.get("/types", cw(typeController.getTypes));
router.get("/types/:id", cw(typeController.getType));
router.get("/types/:id/pokemons", cw(typeController.allPokemonByType));



router.get("/teams", cw(teamController.getTeams));
router.get("/teams/:id", cw(teamController.getTeam));
router.post("/teams", cw(teamController.createTeam));
router.patch("/teams/:id", cw(teamController.updateTeam));
router.delete("/teams/:id", cw(teamController.deleteTeam));


router.get("/teams/:id/pokemons", cw(teamController.getOneTeamAndPokemons));

router.put("/teams/:teamId/pokemons/:pokemonId", cw(teamController.addPokemonToTeam));
router.delete("/teams/:teamId/pokemons/:pokemonId", cw(teamController.removePokemonFromTeam));

/*
router.post("/pokemons/:id/votes", pokemonController.addPokemonVote);
router.get("/pokemons/leaderboard", pokemonController.getPokemonLeaderboard);
*/


router.post("/signup", authController.signupAction);
router.post("/login", authController.loginAction);
router.get("/logout", authController.logout);

router.get("/auth/status", authController.getAuthStatus);




