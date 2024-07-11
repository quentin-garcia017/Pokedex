import { Router } from "express";
import * as pokemonController from "./controllers/pokemonController.js";
import * as typeController from "./controllers/typeController.js";
import * as teamController from "./controllers/teamController.js";


export const router = Router();

router.get("/pokemons", pokemonController.getPokemons);
router.get("/pokemons/:id", pokemonController.getPokemon);
router.get("/pokemons/pokemon/:name", pokemonController.getpokemonbyname);

router.get("/types", typeController.getTypes);
router.get("/types/:id", typeController.getType);
router.get("/types/:id/pokemons", typeController.allPokemonByType);



router.get("/teams", teamController.getTeams);
router.get("/teams/:id", teamController.getTeam);
router.post("/teams", teamController.createTeam);
router.patch("/teams/:id", teamController.updateTeam);
router.delete("/teams/:id", teamController.deleteTeam);


router.get("/teams/:id/pokemons", teamController.getOneTeamAndPokemons);

router.put("/teams/:teamId/pokemons/:pokemonId", teamController.addPokemonToTeam);
router.delete("/teams/:teamId/pokemons/:pokemonId", teamController.removePokemonFromTeam);

/*
router.post("/pokemons/:id/votes", pokemonController.addPokemonVote);
router.get("/pokemons/leaderboard", pokemonController.getPokemonLeaderboard);
*/