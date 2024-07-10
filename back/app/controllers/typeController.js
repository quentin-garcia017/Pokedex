import { Type } from "../models/Type.js";

export const getTypes = async (req, res) => {
    const types = await Type.findAll();
    res.json(types);
};

export const getType = async (req, res) => {
    const type = await Type.findByPk(req.params.id);
    res.json(type);
};

export const allPokemonByType = async (req, res) => {
    const type = await Type.findByPk(req.params.id);
    const pokemons = await type.getPokemons();
    res.json(pokemons);
};