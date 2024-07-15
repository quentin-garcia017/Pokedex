import { Pokemon } from "../models/Pokemon.js";
import { Sequelize } from "sequelize";
import { NotFoundError } from "../utils/errors.js";

export const getPokemons = async (req, res) => {
    const pokemons = await Pokemon.findAll();
    res.json(pokemons);
    if (!pokemons) {
        throw new NotFoundError("No pokemons found");
    }

};

export const getPokemon = async (req, res) => {
    const pokemon = await Pokemon.findByPk(req.params.id);
    res.json(pokemon);
    if (!pokemon) {
        throw new NotFoundError(`Pokémon not found with id ${req.params.id}`);
    }
};


    


/* marche pas
export const addPokemonVote = async (req, res) => {
    const pokemon = await Pokemon.findByPk(req.params.id);
    const vote = await pokemon.addVote(req.body.userId);
    res.json(vote);
};

export const getPokemonLeaderboard = async (req, res) => {
    const leaderboard = await Pokemon.getLeaderboard();
    res.json(leaderboard);
};
*/