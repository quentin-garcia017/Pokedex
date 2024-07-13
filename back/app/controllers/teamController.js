import { Team, Pokemon, Type } from "../models/index.js";
import { NotFoundError } from "../utils/errors.js"


export const getTeams = async (req, res) => {
    const teams = await Team.findAll();
    res.json(teams);
    
};

export const getTeam = async (req, res) => {
    const team = await Team.findByPk(req.params.id);
    res.json(team);
    if (!team) throw new NotFoundError(`Team not found with id ${req.params.id}`);
};

export const createTeam = async (req, res) => {
    const team = await Team.create(req.body);
    res.json(team); 
};

export const updateTeam = async (req, res) => {
    const team = await Team.findByPk(req.params.id);
    if (!team) throw new NotFoundError(`Team not found with id ${req.params.id}`);
    await team.update(req.body);
    res.json(team);

};

export const deleteTeam = async (req, res) => {
    const team = await Team.findByPk(req.params.id);
    if (!team) throw new NotFoundError(`Team not found with id ${req.params.id}`);
    await team.destroy();
    res.json(team);
};



export async function getOneTeamAndPokemons(req, res){
    const {id} = req.params
    const team = await Team.findByPk(Number(id), {
        include : [{
            association: "pokemons", include : "types"
        }]
    })
    if(!team) return res.status(404).json(`Pas de team à l'id : ${id}`);
    res.status(200).json(team);
}


export const addPokemonToTeam = async (req, res) => {
    
        const pokemon = await Pokemon.findByPk(req.params.pokemonId);
        const team = await Team.findByPk(req.params.teamId);

        if (!pokemon) {
            throw new NotFoundError(`Pokemon not found with id ${req.params.pokemonId}`);
        }
        if (!team) {
            throw new NotFoundError(`Team not found with id ${req.params.teamId}`);
        }

        // Ajouter le Pokémon à l'équipe
        
        await team.addPokemon(pokemon);
        
        // Récupérer l'équipe mise à jour avec tous ses Pokémon
        const updatedTeam = await Team.findByPk(req.params.teamId, {
            include: [{ model: Pokemon, as: 'pokemons' }]
        });

        res.json(updatedTeam);
   
};


export const removePokemonFromTeam = async (req, res) => {
    
        const pokemon = await Pokemon.findByPk(req.params.pokemonId);
        const team = await Team.findByPk(req.params.teamId);

        if (!pokemon) {
            throw new NotFoundError(`Pokemon not found with id ${req.params.pokemonId}`);
        }
        if (!team) {
            throw new NotFoundError(`Team not found with id ${req.params.teamId}`);
        }

        // Vérifier si le Pokémon est dans l'équipe
        const isInTeam = await team.hasPokemon(pokemon);
        if (!isInTeam) {
            return res.status(400).json({ message: "Ce Pokémon n'est pas dans cette équipe" });
        }

        // Retirer le Pokémon de l'équipe
        await team.removePokemon(pokemon);

        // Récupérer l'équipe mise à jour avec tous ses Pokémon restants
        const updatedTeam = await Team.findByPk(req.params.teamId, {
            include: [{ model: Pokemon, as: 'pokemons' }]
        });

        res.json(updatedTeam);
   
};


