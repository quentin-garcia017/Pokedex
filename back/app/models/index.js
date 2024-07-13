import { Type } from "./Type.js";
import { Team } from "./Team.js";
import { Pokemon } from "./Pokemon.js";

// Définir les relations Many-to-Many entre Pokemon et Type
Pokemon.belongsToMany(Type, {
    through: 'pokemon_type',
    as: 'types',
    foreignKey: 'pokemon_id',
    otherKey: 'type_id'
});

Type.belongsToMany(Pokemon, {
    through: 'pokemon_type',
    as: 'pokemons',
    foreignKey: 'type_id',
    otherKey: 'pokemon_id'
});

// Définir les relations Many-to-Many entre Pokemon et Team
Pokemon.belongsToMany(Team, {
    through: 'team_pokemon',
    as: 'teams',
    foreignKey: 'pokemon_id',
    otherKey: 'team_id'
});

Team.belongsToMany(Pokemon, {
    through: 'team_pokemon',
    as: 'pokemons',
    foreignKey: 'team_id',
    otherKey: 'pokemon_id'
});



export { Type, Team, Pokemon };
