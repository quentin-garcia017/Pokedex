import { Pokemon } from "../models/Pokemon.js";
import { Sequelize } from "sequelize";

export const getPokemons = async (req, res) => {
    const pokemons = await Pokemon.findAll();
    res.json(pokemons);
};

export const getPokemon = async (req, res) => {
    const pokemon = await Pokemon.findByPk(req.params.id);
    res.json(pokemon);
};

export const getpokemonbyname = async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({
            where: {
                name: {
                    [Sequelize.Op.iLike]: req.params.name
                }
            }
        });
        if (!pokemon) {
            return res.status(404).json({ message: "Pokemon not found" });
        }
        res.status(200).json(pokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
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