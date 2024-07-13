import { Type } from "../models/Type.js";
import { NotFoundError } from "../utils/errors.js";

export const getTypes = async (req, res) => {
    const types = await Type.findAll();
    res.json(types);
    if (!types) {
        throw new NotFoundError("No types found");
    }
};

export const getType = async (req, res) => {
    const type = await Type.findByPk(req.params.id);
    res.json(type);
    if (!type) {
        throw new NotFoundError(`Type not found with id ${req.params.id}`);
    }
};

export const allPokemonByType = async (req, res) => {
    const type = await Type.findByPk(req.params.id);
    const pokemons = await type.getPokemons();
    res.json(pokemons);
    if (!pokemons) {
        throw new NotFoundError(`Type not found with id ${req.params.id}`);
    }
    if (!type) {
        throw new NotFoundError(`Type not found with id ${req.params.id}`);
    }
};