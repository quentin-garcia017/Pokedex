import { apiBaseUrl } from "./config.js";
document.addEventListener('DOMContentLoaded', () => {
  const addTeamBtn = document.getElementById('add-team-btn');
  const teamModal = document.getElementById('team-modal');
  const pokemonModal = document.getElementById('pokemon-modal');
  const typeModal = document.getElementById('type-modal');
  const closeBtns = document.querySelectorAll('.close-btn');
  const teamForm = document.getElementById('team-form');
  const pokemonList = document.querySelector('.pokemon-list .grid');
  const pokemonTypes = document.querySelector('.pokemon-types .pokemon-types-list');
  const titleTeams = document.getElementById('titleTeams');
  const titleTypes = document.getElementById('titleTypes');
  const titlePokemons = document.getElementById('titlePokemons');
  const asideTeams = document.querySelector('aside.teams');
  const pokemontypes = document.querySelector('.pokemon-types');
  const sectionpokemons = document.querySelector('section.pokemon-list');
  const addPokemonToTeamModal = document.getElementById('add-pokemon-to-team-modal');
  const teamSelect = document.getElementById('team-select');
  const pokemonIdToAdd = document.getElementById('pokemon-id-to-add');




  // Récupérer les équipes et les Pokémon au chargement de la page
  fetchTeams();
  fetchPokemons();
  fetchPokemonTypes();
  
  // Ouvrir la modal d'ajout de team
  addTeamBtn.addEventListener('click', () => {
    teamModal.style.display = 'block';
  });
  // Fermer les modals
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });
  // Ajouter une équipe
  teamForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const teamName = document.getElementById('team-name').value;
    addTeam(teamName);
    teamModal.style.display = 'none';
  });

 

  // Fonction pour afficher ou cacher un élément
  function togglePartialOpacity(element) {
    if (element.style.opacity === '1') {
      element.style.opacity = '0.3';
    } else {
      element.style.opacity = '1';
    }
  }
  function toggleOpacity(element) {
    if (element.style.opacity === '1') {
      element.style.opacity = '0';
    } else {
      element.style.opacity = '1';
    }
  }
 
  titleTeams.addEventListener('click', () => {
    togglePartialOpacity(asideTeams);
  });
  titleTypes.addEventListener('click', () => {
    togglePartialOpacity(pokemontypes);
  });
  titlePokemons.addEventListener('click', () => {
    toggleOpacity(sectionpokemons);
  });
 
  // Fonction pour initialiser la fonctionnalité SortableJS

  const teamList = document.querySelector('.team-list');
  const typeList = document.querySelector('.pokemon-types-list');
  if (teamList) {
    new Sortable(teamList, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      onEnd: (event) => {
        const newOrder = Array.from(teamList.children).map((child, index) => ({
          id: child.id.replace('team-', ''),
          order: index + 1
        }));
        console.log('New order:', newOrder);
        updateTeamOrderOnServer(newOrder);
      }
    });
  }
  if (typeList) {
    new Sortable(typeList, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      onEnd: (event) => {
        const newOrder = Array.from(typeList.children).map((child, index) => ({
          id: child.id.replace('type-', ''),
          order: index + 1
        }));
        console.log('New order:', newOrder);
        updateTypeOrderOnServer(newOrder);
      }
    });
  }
  else {
    console.error('Cannot find the team list element.');
  }

  // Fonction pour mettre à jour l'ordre des équipes sur le serveur MARCHE PAS!!!
  function updateTeamOrderOnServer(newOrder) {
    fetch(`${apiBaseUrl}/teams/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Team order updated successfully:', data);
    })
    .catch(error => console.error('Error updating team order:', error));
  }

  function updateTypeOrderOnServer(newOrder) {
    fetch(`${apiBaseUrl}/types/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Type order updated successfully:', data);
    })
    .catch(error => console.error('Error updating type order:', error));
  }
 
 
























  // Fonction pour récupérer et afficher les équipes
  function fetchTeams() {
    fetch(`${apiBaseUrl}/teams`)
      .then(response => response.json())
      .then(data => {
        const teamList = document.querySelector('.team-list');
        teamList.textContent = ''; // Clear existing teams
        data.forEach(team => {
          addTeamToUI(team); 
        });
        
      })
      .catch(error => console.error('Error fetching teams:', error));
  }
  // Fonction pour ajouter une équipe via l'API
  function addTeam(name) {
    fetch(`${apiBaseUrl}/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
    .then(response => response.json())
    .then(data => {
      addTeamToUI(data);
    })
    .catch(error => console.error('Error adding team:', error));
  }
  // Fonction pour afficher une équipe dans l'interface
  function addTeamToUI(team) {
    const teamList = document.querySelector('.team-list');
    const teamDiv = document.createElement('div');
    
    teamDiv.className = 'team';
    teamDiv.textContent = `${team.name}`;

    const buttonContainer = document.createElement('div');
      // Créer le bouton de suppression
      const removeButton = document.createElement('button');
      removeButton.type = 'hidden';
      removeButton.className = 'icon is-clickable';
      removeButton.setAttribute('slot', 'remove-list-button');
      
      const removeIcon = document.createElement('i');
      removeIcon.className = 'fas fa-trash';
      
      removeButton.appendChild(removeIcon);
      removeButton.addEventListener('click', () => {
        removeTeam(team.id);
      });
  
      // Créer le bouton d'édition
      const editButton = document.createElement('button');
      editButton.type = 'hidden';
      editButton.className = 'icon is-clickable';
      editButton.setAttribute('slot', 'edit-list-button');
      
      const editIcon = document.createElement('i');
      editIcon.className = 'fas fa-edit';
      
      editButton.appendChild(editIcon);

      // Au clic sur le bouton d'édition, afficher la modale de modification de l'équipe

      editButton.addEventListener('click', () => {
        showEditTeamModal(team.id);
      });

      // Crée le bouton de détails
      const afficheToutLesPokemonsButton = document.createElement('button');
      afficheToutLesPokemonsButton.type = 'hidden';
      afficheToutLesPokemonsButton.className = 'icon is-clickable';
      afficheToutLesPokemonsButton.setAttribute('slot', 'affiche-tout-les-pokemons-button');

      const afficheToutLesPokemonsIcon = document.createElement('i');
      afficheToutLesPokemonsIcon.className = 'fas fa-list';

      afficheToutLesPokemonsButton.appendChild(afficheToutLesPokemonsIcon);

      // Au clic sur le bouton de détails, afficher la modale de détails de l'équipe

      afficheToutLesPokemonsButton.addEventListener('click', () => {
        showPokemonByTeam(team.id);
      });
  
      // Ajouter les boutons au div de l'équipe
      buttonContainer.appendChild(afficheToutLesPokemonsButton);
      buttonContainer.appendChild(editButton);
      buttonContainer.appendChild(removeButton);
      buttonContainer.classList.add('team-buttons');

    teamDiv.appendChild(buttonContainer);
     
      teamList.appendChild(teamDiv);

  }

  function removeTeam(teamId) {
    fetch(`${apiBaseUrl}/teams/${teamId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      fetchTeams();
    })
    .catch(error => console.error('Error removing team:', error));
  }

  function showEditTeamModal(teamId) {
    
    document.getElementById('edit-team-modal').style.display = 'block';

    const btnSubmit = document.querySelector('#edit-team-form');
    btnSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const editTeamFormData = new FormData(e.target);
      const teamName = editTeamFormData.get('team-name');
      const teamDescription = editTeamFormData.get('team-description');
      // Récupérer le nom de l'équipe
      
      editTeam(teamId, teamName, teamDescription);
      document.getElementById('edit-team-modal').style.display = 'none';
    });
  }
  
  function editTeam(id, teamName, teamDescription) {
    
    fetch(`${apiBaseUrl}/teams/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: teamName, description: teamDescription })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Team updated successfully:', data);
      fetchTeams(); // Call fetchTeams() after the successful update
    })
    .catch(error => console.error('Error updating team:', error));
  }
  
  function showPokemonByTeam(teamId) {
    document.getElementById('pokemon-team-modal').style.display = 'block';

    fetch(`${apiBaseUrl}/teams/${teamId}/pokemons`)
      .then(response => response.json()) // Récupérer les Pokémon d'une équipe
      .then(data => {
        
        const pokemonList = document.getElementById('pokemon-team-details');
        if (!pokemonList) {
          console.error('Élément avec l\'id "pokemon-team-details" non trouvé.');
          return;
        }
        pokemonList.textContent = '';
        // Accéder directement au tableau de Pokémon
        const pokemons = data.pokemons;
        pokemons.forEach(pokemon => {
          const imgPath = `./assets/img/${pokemon.id}.png`;
          const div = document.createElement('div');
          div.classList.add ='pokemon-grid';
          div.classList.add = 'pokemon-card';
          
          // Créer l'élément img
          const imgElement = document.createElement('img');
          imgElement.setAttribute('src', imgPath);
          imgElement.setAttribute('alt', pokemon.name);
          imgElement.setAttribute('class', 'pokemon-image');
          
          // Créer l'élément p
          const pElement = document.createElement('p');
          pElement.setAttribute('class', 'title-pokemon');
          pElement.textContent = pokemon.name;
          
          // Ajouter les éléments créés au div
          div.appendChild(imgElement);
          div.appendChild(pElement);
  

          div.addEventListener('click', () => {
            closeShowPokemonByTeam();
            showPokemonDetails(pokemon.id);
          });
          pokemonList.appendChild(div);
        });
      })
      .catch(error => console.error('Erreur lors de la récupération des Pokémon par équipe:', error));
    }
        
    function closeShowPokemonByTeam () {

     document.getElementById('pokemon-team-modal').style.display = 'none';
    }


     
      
 










  // Fonction pour récupérer et afficher les Pokémon
  function fetchPokemons() {
    fetch(`${apiBaseUrl}/pokemons`)
      .then(response => response.json())
      .then(data => {
        pokemonList.textContent = ''; // Clear existing pokemons
        data.forEach((pokemon, index) => {
          const imgPath = `./assets/img/${index + 1}.png`;
          const div = document.createElement('div');
          div.classList.add ='pokemon-grid';
          div.classList.add = 'pokemon-card';

          // Créer l'élément img
          const imgElement = document.createElement('img');
          imgElement.setAttribute('src', imgPath);
          imgElement.setAttribute('alt', pokemon.name);
          imgElement.setAttribute('class', 'pokemon-image');

          // Créer l'élément p
          const pElement = document.createElement('p');
          pElement.setAttribute('class', 'title-pokemon');
          pElement.textContent = pokemon.name;

          // Ajout du bouton d'ajout à une équipe
          const addToTeamButton = document.createElement('button');
          addToTeamButton.type = 'hidden';
          addToTeamButton.className = 'icon is-clickable';
          addToTeamButton.setAttribute('slot', 'add-to-team-button');
          
          const addToTeamIcon = document.createElement('i');
          addToTeamIcon.className = 'fas fa-plus';
          
          addToTeamButton.appendChild(addToTeamIcon);

          // Au clic sur le bouton d'ajout à une équipe, afficher la modale de sélection de l'équipe

          addToTeamButton.addEventListener('click', () => {
            showAddToTeamModal(pokemon.id);        
          });
          
          // Ajouter les éléments créés au div
          div.appendChild(imgElement);
          div.appendChild(pElement);
          div.appendChild(addToTeamButton);

          div.addEventListener('click', () => {
            showPokemonDetails(pokemon.id);
          });
          pokemonList.appendChild(div);
        });
      })
      .catch(error => console.error('Error fetching pokemons:', error));

        const addPokemonToTeamModal = document.getElementById('add-pokemon-to-team-modal');
        const teamSelect = document.getElementById('team-select');
        const pokemonIdToAdd = document.getElementById('pokemon-id-to-add');

        document.getElementById('add-pokemon-to-team-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const teamId = teamSelect.value;
            const pokemonId = pokemonIdToAdd.value;
            submitAddToTeamModal(teamId, pokemonId);
            addPokemonToTeamModal.style.display = 'none';
        });
     
  }

  // Fonction pour afficher les détails d'un Pokémon
  function showPokemonDetails(pokemonId) {
    fetch(`${apiBaseUrl}/pokemons/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        const pokemonDetails = document.getElementById('pokemon-details');
        pokemonDetails.classList.add('pokemon-grid');

        // Créer un élément ul
        const ul = document.createElement('ul');

        // Fonction pour créer un li et l'ajouter à ul
        const addListItem = (text) => {
            const li = document.createElement('li');
            li.textContent = text;
            ul.appendChild(li);
        };

        // Ajouter les détails du Pokémon dans des éléments li
        addListItem(`Nom : ${data.name}`);
        addListItem(`HP : ${data.hp}`);
        addListItem(`ATK : ${data.atk}`);
        addListItem(`DEF : ${data.def}`);
        addListItem(`ATK_SPE : ${data.atk_spe}`);
        addListItem(`DEF_SPE : ${data.def_spe}`);
        addListItem(`SPEED : ${data.speed}`);

        // Vider le contenu précédent de pokemonDetails
        pokemonDetails.textContent = '';

        // Ajouter ul à l'élément pokemonDetails
        pokemonDetails.appendChild(ul);


        const imgPath = `./assets/img/${pokemonId}.png`;
        // Créer un nouvel élément img
        const imgElement = document.createElement('img');

        // Définir les attributs de l'élément img
        imgElement.setAttribute('class', 'pokemon-detail-image');
        imgElement.setAttribute('src', imgPath);
        imgElement.setAttribute('alt', '');

        // Ajouter l'élément img au pokemonDetails
        pokemonDetails.appendChild(imgElement);

        // Afficher la modale de détails du Pokémon
        pokemonModal.style.display = 'block';
      })
      
  }

  

  function showAddToTeamModal(pokemonId) {
    const addPokemonToTeamModal = document.getElementById('add-pokemon-to-team-modal');
    document.getElementById('add-pokemon-to-team-form').reset();
    addPokemonToTeamModal.style.display = 'block';
    const teamSelect = document.getElementById('team-select');
    teamSelect.textContent = '';
    fetch(`${apiBaseUrl}/teams`)
      .then(response => response.json())
      .then(data => {
        data.forEach(team => {
          const option = document.createElement('option');
          option.value = team.id;
          option.textContent = team.name;
          teamSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching teams:', error));
    document.getElementById('pokemon-id-to-add').value = pokemonId;
  }
 
  function submitAddToTeamModal(teamId, pokemonId) {
    fetch(`${apiBaseUrl}/teams/${teamId}/pokemons/${pokemonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add Pokémon to team');
      }
      return response.json();
    })
    .then(data => {
      console.log('Pokémon ajouté à l\'équipe avec succès', data);
      alert('Pokémon ajouté à l\'équipe avec succès!');
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout du Pokémon à l\'équipe:', error);
      alert('Erreur lors de l\'ajout du Pokémon à l\'équipe.');
    });
  }
    
  
  

      























  // Fonction pour récupérer et afficher les types de Pokémon
  function fetchPokemonTypes() {
    fetch(`${apiBaseUrl}/types`)
      .then(response => response.json())
      .then(data => {
        pokemonTypes.textContent = ''; // Clear existing types
        data.forEach(type => {
          const div = document.createElement('div');
          div.classList.add('pokemon-type');
          div.textContent = `${type.name}`;

          // Ajouter un événement click pour afficher les détails du type
          div.addEventListener('click', () => {
            showTypeDetails(type.id);
            showPokemonByType(type.id); 
          });
          pokemonTypes.appendChild(div);

        });
      })
      .catch(error => console.error('Error fetching pokemon types:', error));
  }

  function showTypeDetails(typeId) {
    fetch(`${apiBaseUrl}/types/${typeId}`)
      .then(response => response.json())
      .then(data => {
        const typeDetails = document.querySelector('.type-details');
        // Clear existing type details
        typeDetails.textContent = '';
        

        typeDetails.classList.add('type-grid');

        const pElement = document.createElement('p');
        const spanElement = document.createElement('span');

        pElement.textContent = `Détails du type: ${data.name}`;
        
        spanElement.classList.add('color-circle');
        spanElement.style.backgroundColor = `#${data.color}`;

        pElement.appendChild(spanElement);
        typeDetails.appendChild(pElement);

        // Afficher la modale de détails du type
        typeModal.style.display = 'block';
      });
    }

      // Récupérer les Pokémon du type
    function showPokemonByType(typeId) {
      fetch(`${apiBaseUrl}/types/${typeId}/pokemons`)
        .then(response => response.json())
        .then(data => {
          console.log('Données des Pokémon du type récupérées:', data);
          
          const pokemonList = document.getElementById('type-details');
          pokemonList.querySelectorAll('.pokemon-grid').forEach(pokemonElement => pokemonElement.remove());
          
          // Accéder directement au tableau de Pokémon
          const pokemons = data;
          console.log('Données des Pokémon du type récupérées:', pokemons);
          pokemons.forEach(pokemon => {
            const imgPath = `./assets/img/${pokemon.id}.png`;
            const div = document.createElement('div');
            div.classList.add ='pokemon-grid';
            div.classList.add = 'pokemon-card';
            
            // Créer l'élément img
            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', imgPath);
            imgElement.setAttribute('alt', pokemon.name);
            imgElement.setAttribute('class', 'pokemon-image');
            
            // Créer l'élément p
            const pElement = document.createElement('p');
            pElement.setAttribute('class', 'title-pokemon');
            pElement.textContent = pokemon.name;
            
            // Ajouter les éléments créés au div
            div.appendChild(imgElement);
            div.appendChild(pElement);

            
            pokemonList.appendChild(div);
          });
        })
        .catch(error => console.error('Erreur lors de la récupération des Pokémon du type:', error));
    }
  
});