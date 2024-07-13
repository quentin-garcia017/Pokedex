-- alter_tables.sql

-- Modifier la contrainte de clé étrangère pour activer la suppression en cascade
-- alter_tables.sql

-- Modifier la contrainte de clé étrangère pour activer la suppression en cascade
ALTER TABLE team_pokemon
DROP CONSTRAINT team_pokemon_team_id_fkey,
ADD CONSTRAINT team_pokemon_team_id_fkey
FOREIGN KEY (team_id)
REFERENCES team(id)
ON DELETE CASCADE;

ALTER TABLE team_pokemon
DROP CONSTRAINT team_pokemon_pokemon_id_fkey,
ADD CONSTRAINT team_pokemon_pokemon_id_fkey
FOREIGN KEY (pokemon_id)
REFERENCES pokemon(id)
ON DELETE CASCADE;

ALTER TABLE pokemon_type
DROP CONSTRAINT pokemon_type_pokemon_id_fkey,
ADD CONSTRAINT pokemon_type_pokemon_id_fkey
FOREIGN KEY (pokemon_id)
REFERENCES pokemon(id)
ON DELETE CASCADE;

ALTER TABLE pokemon_type
DROP CONSTRAINT pokemon_type_type_id_fkey,
ADD CONSTRAINT pokemon_type_type_id_fkey
FOREIGN KEY (type_id)
REFERENCES type(id)
ON DELETE CASCADE;

