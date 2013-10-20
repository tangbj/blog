var app = angular.module('pokemonApp', []);

app.controller('PokemonCtrl', ['$scope', 'AttackModifiersFactory', function($scope, AttackModifiersFactory) {

  $scope.data = {};
  $scope.data.previousSearches = [];
  var MAX_PREVOUS_SEARCHES = 5;

  scope = $scope;

  $scope.clear = function() {
    $scope.data.inputPokemon = '';
  }

  function findPokemon(searchName) {
    searchName = searchName.toLowerCase();

    //returns only pokemons that fit the searchtag
    var results =  _.filter(AttackModifiersFactory.overallPokemonModifiers, function(pokemon) {
      var searchIndex = pokemon['name'].indexOf(searchName);
      
      if (searchIndex !== -1) {
        //used to rank the searches
        pokemon.searchIndex = searchIndex;
      }

      return searchIndex !== -1;
    });

    results.sort(function(a, b) {
      return a.searchIndex - b.searchIndex;
    })

    for(var i = 0; i < results.length; i++) {
      console.log(results[i].name + ': ' + results[i].searchIndex)
    }
    return results;
  }

  $scope.usePrevSearch = function(searchPokemonIndex) {
    //removes the entry selected from previousSearches (to prevent duplicate keys)
    var searchPokemon = $scope.data.previousSearches.splice(searchPokemonIndex, 1);
    $scope.data.inputPokemon = searchPokemon[0];
    $scope.searchForPokemon();
  }

  $scope.searchForPokemon = function() {
    var searchResults = findPokemon($scope.data.inputPokemon);
    
    if (searchResults.length > 0) {
      //adds search item to end of array; if length exceeds max, remove first item of array
      $scope.data.previousSearches.push($scope.data.inputPokemon);
      if ($scope.data.previousSearches.length > MAX_PREVOUS_SEARCHES) $scope.data.previousSearches.shift();
    }

    for (var i = 0; i < searchResults.length; i++) {
      //converts name to full upper case
      searchResults[i].editedName = searchResults[i].name.toUpperCase();

      var temp = [];
      for (var key in searchResults[i].modifiers) {
        //if modifier is 1, do not show
        if (searchResults[i].modifiers[key] !== 1) {
          temp.push({
            element: key,
            modifier: searchResults[i].modifiers[key] 
          });
        }
      } //end for loop

      //sort according to modifier (descending order)
      temp.sort(function(a, b) {
        return b.modifier - a.modifier;
      })
      searchResults[i].editedModifiers = temp;
    }

    $scope.pokemonModifiers = searchResults;
  }
}]);

app.factory('AttackModifiersFactory', function(PokemonFactory) {
    
  //attack multiplier for attack types vs defender types
  //if results are undefined, assume base multiplier (1)
  var attackModifiers = {};
  var overallPokemonModifiers = [];

  attackModifiers['normal'] = {};
  attackModifiers['fire'] = {};
  attackModifiers['water'] = {};
  attackModifiers['electric'] = {};
  attackModifiers['grass'] = {};
  attackModifiers['ice'] = {};
  attackModifiers['fighting'] = {};
  attackModifiers['poison'] = {};
  attackModifiers['ground'] = {};
  attackModifiers['flying'] = {};
  attackModifiers['psychic'] = {};
  attackModifiers['bug'] = {};
  attackModifiers['rock'] = {};
  attackModifiers['ghost'] = {};
  attackModifiers['dragon'] = {};
  attackModifiers['dark'] = {};
  attackModifiers['steel'] = {};
  attackModifiers['fairy'] = {};

  //contains the list of all the pokemon types
  var elementsList = Object.keys(attackModifiers);

  attackModifiers['normal']['ghost'] = 0;
  attackModifiers['normal']['rock'] = 0.5;
  attackModifiers['normal']['steel'] = 0.5;

  attackModifiers['fire']['fire'] = 0.5;
  attackModifiers['fire']['water'] = 0.5;
  attackModifiers['fire']['rock'] = 0.5;
  attackModifiers['fire']['dragon'] = 0.5;
  attackModifiers['fire']['grass'] = 2;
  attackModifiers['fire']['ice'] = 2;
  attackModifiers['fire']['bug'] = 2;
  attackModifiers['fire']['steel'] = 2;

  attackModifiers['water']['water'] = 0.5;
  attackModifiers['water']['grass'] = 0.5;
  attackModifiers['water']['dragon'] = 0.5;
  attackModifiers['water']['fire'] = 2;
  attackModifiers['water']['ground'] = 2;
  attackModifiers['water']['rock'] = 2;

  attackModifiers['electric']['ground'] = 0;
  attackModifiers['electric']['electric'] = 0.5;
  attackModifiers['electric']['grass'] = 0.5;
  attackModifiers['electric']['dragon'] = 0.5;
  attackModifiers['electric']['water'] = 2;
  attackModifiers['electric']['flying'] = 2;

  attackModifiers['grass']['fire'] = 0.5;
  attackModifiers['grass']['grass'] = 0.5;
  attackModifiers['grass']['poison'] = 0.5;
  attackModifiers['grass']['flying'] = 0.5;
  attackModifiers['grass']['bug'] = 0.5;
  attackModifiers['grass']['dragon'] = 0.5;
  attackModifiers['grass']['steel'] = 0.5;
  attackModifiers['grass']['water'] = 2;
  attackModifiers['grass']['ground'] = 2;
  attackModifiers['grass']['rock'] = 2;

  attackModifiers['ice']['fire'] = 0.5;
  attackModifiers['ice']['water'] = 0.5;
  attackModifiers['ice']['ice'] = 0.5;
  attackModifiers['ice']['steel'] = 0.5;
  attackModifiers['ice']['grass'] = 2;
  attackModifiers['ice']['ground'] = 2;
  attackModifiers['ice']['flying'] = 2;
  attackModifiers['ice']['dragon'] = 2;

  attackModifiers['fighting']['ghost'] = 0;
  attackModifiers['fighting']['poison'] = 0.5;
  attackModifiers['fighting']['flying'] = 0.5;
  attackModifiers['fighting']['psychic'] = 0.5;
  attackModifiers['fighting']['bug'] = 0.5;
  attackModifiers['fighting']['fairy'] = 0.5;
  attackModifiers['fighting']['normal'] = 2;
  attackModifiers['fighting']['ice'] = 2;
  attackModifiers['fighting']['rock'] = 2;
  attackModifiers['fighting']['dark'] = 2;
  attackModifiers['fighting']['steel'] = 2;

  attackModifiers['poison']['steel'] = 0;
  attackModifiers['poison']['poison'] = 0.5;
  attackModifiers['poison']['rock'] = 0.5;
  attackModifiers['poison']['ground'] = 0.5;
  attackModifiers['poison']['ghost'] = 0.5;
  attackModifiers['poison']['grass'] = 2;
  attackModifiers['poison']['fairy'] = 2;

  attackModifiers['ground']['flying'] = 0;
  attackModifiers['ground']['grass'] = 0.5;
  attackModifiers['ground']['bug'] = 0.5;
  attackModifiers['ground']['fire'] = 2;
  attackModifiers['ground']['electric'] = 2;
  attackModifiers['ground']['poison'] = 2;
  attackModifiers['ground']['rock'] = 2;
  attackModifiers['ground']['steel'] = 2;

  attackModifiers['flying']['electric'] = 0.5;
  attackModifiers['flying']['rock'] = 0.5;
  attackModifiers['flying']['steel'] = 0.5;
  attackModifiers['flying']['grass'] = 2;
  attackModifiers['flying']['fighting'] = 2;
  attackModifiers['flying']['bug'] = 2;

  attackModifiers['psychic']['dark'] = 0;
  attackModifiers['psychic']['psychic'] = 0.5;
  attackModifiers['psychic']['steel'] = 0.5;
  attackModifiers['psychic']['fighting'] = 2;
  attackModifiers['psychic']['poison'] = 2;

  attackModifiers['bug']['fire'] = 0.5;
  attackModifiers['bug']['fighting'] = 0.5;
  attackModifiers['bug']['poison'] = 0.5;
  attackModifiers['bug']['flying'] = 0.5;
  attackModifiers['bug']['ghost'] = 0.5;
  attackModifiers['bug']['steel'] = 0.5;
  attackModifiers['bug']['fairy'] = 0.5;
  attackModifiers['bug']['grass'] = 2;
  attackModifiers['bug']['psychic'] = 2;
  attackModifiers['bug']['dark'] = 2;

  attackModifiers['rock']['fighting'] = 0.5;
  attackModifiers['rock']['ground'] = 0.5;
  attackModifiers['rock']['steel'] = 0.5;
  attackModifiers['rock']['fire'] = 2;
  attackModifiers['rock']['ice'] = 2;
  attackModifiers['rock']['flying'] = 2;
  attackModifiers['rock']['bug'] = 2;

  attackModifiers['ghost']['normal'] = 0;
  attackModifiers['ghost']['dark'] = 0.5;
  attackModifiers['ghost']['psychic'] = 2;
  attackModifiers['ghost']['ghost'] = 2;

  attackModifiers['dragon']['fairy'] = 0;
  attackModifiers['dragon']['steel'] = 0.5;
  attackModifiers['dragon']['dragon'] = 2;  

  attackModifiers['dark']['fighting'] = 0.5;
  attackModifiers['dark']['dark'] = 0.5;
  attackModifiers['dark']['fairy'] = 0.5;
  attackModifiers['dark']['psychic'] = 2;
  attackModifiers['dark']['ghost'] = 2;

  attackModifiers['steel']['fire'] = 0.5;
  attackModifiers['steel']['water'] = 0.5;
  attackModifiers['steel']['electric'] = 0.5;
  attackModifiers['steel']['steel'] = 0.5;
  attackModifiers['steel']['ice'] = 2;
  attackModifiers['steel']['rock'] = 2;
  attackModifiers['steel']['fairy'] = 2;

  attackModifiers['fairy']['fire'] = 0.5;
  attackModifiers['fairy']['poison'] = 0.5;
  attackModifiers['fairy']['steel'] = 0.5;
  attackModifiers['fairy']['fighting'] = 2;
  attackModifiers['fairy']['dragon'] = 2;
  attackModifiers['fairy']['dark'] = 2;

  //the attack modifiers that will used when a pokemon is attacking 
  //if elements are not defined, assume base value of 1
  function getAttackModifiers(attack, defense) {
    if (typeof attackModifiers[attack][defense] === 'undefined') return 1;
    return attackModifiers[attack][defense];
  }

  //given a pokemon name, return the elements of the pokemon
  function getPokemonElement(name) {
    var temp = _.filter(PokemonFactory, function(pokemon) {
      return pokemon.name.toLowerCase() ===  name;
    })[0];
    return temp['elements'];
  }

  //given a pokemon's resultsMatrix and its ability, modify the passed matrix
  function modifyResultMatrixForPokemonAbility(matrix, ability) {
    if (ability === 'sapSipper') {
      matrix['grass'] = 0;
    } 

    else if (ability === 'heatProof') {
      matrix['fire'] *= 0.5;
    }

    //absorbs electric attack
    else if (ability === 'voltAbsorb') {
      matrix['electric'] = -1;
    }    

    //absorbs water attack
    else if (ability === 'waterAbsorb') {
      matrix['water'] = -1;
    } 

    else if (ability === 'levitate') {
      matrix['ground'] = 0;
    }
  }

  //given a pokemon's name, return a matrix of the various elements attack modifiers against it
  function computeResultsMatrix(name) {
    var pokemonElements = getPokemonElement(name);

    var resultsMatrix = {};

    for (var i = 0; i < pokemonElements.length; i++) {
      for (var j = 0; j < elementsList.length; j++) {
        var element = elementsList[j];

        //initializes the resultsMatrix with each of the elements and sets modifiers to 1
        if (typeof resultsMatrix[element] === 'undefined') {
          resultsMatrix[element] = getAttackModifiers(elementsList[j], pokemonElements[i]);
        } 
        //otherwise multiplies the defense modifiers from the second element
        else {
          resultsMatrix[element] *= getAttackModifiers(elementsList[j], pokemonElements[i]);        
        }

      } //end inner for loop
    } //end outer for loop

    return resultsMatrix;
  } //end computeResultsMatrix function

  for (var i = 0; i < PokemonFactory.length; i++) {
    var pokemon = PokemonFactory[i].name, ability, resultsMatrix;

    if (typeof PokemonFactory[i].abilities === 'undefined') {
      abilities = [];
    } else {
      abilities = PokemonFactory[i].abilities;
    }

    //obtains the results matrix for each pokemon and modifies it accordingly to its abilities
    resultsMatrix = computeResultsMatrix(pokemon);

    for ( var j = 0; j < abilities.length; j++) {
      modifyResultMatrixForPokemonAbility(resultsMatrix, abilities[j]);  
    }
    
    overallPokemonModifiers.push({
      name: pokemon,
      elements: PokemonFactory[i].elements,
      abilities: PokemonFactory[i].abilities,
      modifiers: resultsMatrix
    });
  }
  this.overallPokemonModifiers = overallPokemonModifiers;

  return this;
})

app.factory('PokemonFactory', function() {

  return [
    {name: "bulbasaur", elements: ["grass", "poison"]},
    {name: "ivysaur", elements: ["grass", "poison"]},
    {name: "venusaur", elements: ["grass", "poison"]},
    {name: "charmander", elements: ["fire"]},
    {name: "charmeleon", elements: ["fire"]},
    {name: "charizard", elements: ["fire", "flying"]},
    {name: "squirtle", elements: ["water"]},
    {name: "wartortle", elements: ["water"]},
    {name: "blastoise", elements: ["water"]},
    {name: "caterpie", elements: ["bug"]},
    {name: "metapod", elements: ["bug"]},
    {name: "butterfree", elements: ["bug", "flying"]},
    {name: "weedle", elements: ["bug", "poison"]},
    {name: "kakuna", elements: ["bug", "poison"]},
    {name: "beedrill", elements: ["bug", "poison"]},
    {name: "pidgey", elements: ["normal", "flying"]},
    {name: "pidgeotto", elements: ["normal", "flying"]},
    {name: "pidgeot", elements: ["normal", "flying"]},
    {name: "rattata", elements: ["normal"]},
    {name: "raticate", elements: ["normal"]},
    {name: "spearow", elements: ["normal", "flying"]},
    {name: "fearow", elements: ["normal", "flying"]},
    {name: "ekans", elements: ["poison"]},
    {name: "arbok", elements: ["poison"]},
    {name: "pikachu", elements: ["electric"]},
    {name: "raichu", elements: ["electric"]},
    {name: "sandshrew", elements: ["ground"]},
    {name: "sandslash", elements: ["ground"]},
    {name: "nidoran", elements: ["poison"]},
    {name: "nidorina", elements: ["poison"]},
    {name: "nidoqueen", elements: ["poison", "ground"]},
    {name: "nidoran", elements: ["poison"]},
    {name: "nidorino", elements: ["poison"]},
    {name: "nidoking", elements: ["poison", "ground"]},
    {name: "clefairy", elements: ["fairy"]},
    {name: "clefable", elements: ["fairy"]},
    {name: "vulpix", elements: ["fire"]},
    {name: "ninetales", elements: ["fire"]},
    {name: "jigglypuff", elements: ["normal", "fairy"]},
    {name: "wigglytuff", elements: ["normal", "fairy"]},
    {name: "zubat", elements: ["poison", "flying"]},
    {name: "golbat", elements: ["poison", "flying"]},
    {name: "oddish", elements: ["grass", "poison"]},
    {name: "gloom", elements: ["grass", "poison"]},
    {name: "vileplume", elements: ["grass", "poison"]},
    {name: "paras", elements: ["bug", "grass"]},
    {name: "parasect", elements: ["bug", "grass"]},
    {name: "venonat", elements: ["bug", "poison"]},
    {name: "venomoth", elements: ["bug", "poison"]},
    {name: "diglett", elements: ["ground"]},
    {name: "dugtrio", elements: ["ground"]},
    {name: "meowth", elements: ["normal"]},
    {name: "persian", elements: ["normal"]},
    {name: "psyduck", elements: ["water"]},
    {name: "golduck", elements: ["water"]},
    {name: "mankey", elements: ["fighting"]},
    {name: "primeape", elements: ["fighting"]},
    {name: "growlithe", elements: ["fire"]},
    {name: "arcanine", elements: ["fire"]},
    {name: "poliwag", elements: ["water"], abilities: ['waterAbsorb']},
    {name: "poliwhirl", elements: ["water"], abilities: ['waterAbsorb']},
    {name: "poliwrath", elements: ["water", "fighting"], abilities: ['waterAbsorb']},
    {name: "abra", elements: ["psychic"]},
    {name: "kadabra", elements: ["psychic"]},
    {name: "alakazam", elements: ["psychic"]},
    {name: "machop", elements: ["fighting"]},
    {name: "machoke", elements: ["fighting"]},
    {name: "machamp", elements: ["fighting"]},
    {name: "bellsprout", elements: ["grass", "poison"]},
    {name: "weepinbell", elements: ["grass", "poison"]},
    {name: "victreebel", elements: ["grass", "poison"]},
    {name: "tentacool", elements: ["water", "poison"]},
    {name: "tentacruel", elements: ["water", "poison"]},
    {name: "geodude", elements: ["rock", "ground"]},
    {name: "graveler", elements: ["rock", "ground"]},
    {name: "golem", elements: ["rock", "ground"]},
    {name: "ponyta", elements: ["fire"]},
    {name: "rapidash", elements: ["fire"]},
    {name: "slowpoke", elements: ["water", "psychic"]},
    {name: "slowbro", elements: ["water", "psychic"]},
    {name: "magnemite", elements: ["electric", "steel"]},
    {name: "magneton", elements: ["electric", "steel"]},
    {name: "farfetch'd", elements: ["normal", "flying"]},
    {name: "doduo", elements: ["normal", "flying"]},
    {name: "dodrio", elements: ["normal", "flying"]},
    {name: "seel", elements: ["water"]},
    {name: "dewgong", elements: ["water", "ice"]},
    {name: "grimer", elements: ["poison"]},
    {name: "muk", elements: ["poison"]},
    {name: "shellder", elements: ["water"]},
    {name: "cloyster", elements: ["water", "ice"]},
    {name: "gastly", elements: ["ghost", "poison"], abilities: ['levitate']},
    {name: "haunter", elements: ["ghost", "poison"], abilities: ['levitate']},
    {name: "gengar", elements: ["ghost", "poison"], abilities: ['levitate']},
    {name: "onix", elements: ["rock", "ground"]},
    {name: "drowzee", elements: ["psychic"]},
    {name: "hypno", elements: ["psychic"]},
    {name: "krabby", elements: ["water"]},
    {name: "kingler", elements: ["water"]},
    {name: "voltorb", elements: ["electric"]},
    {name: "electrode", elements: ["electric"]},
    {name: "exeggcute", elements: ["grass", "psychic"]},
    {name: "exeggutor", elements: ["grass", "psychic"]},
    {name: "cubone", elements: ["ground"]},
    {name: "marowak", elements: ["ground"]},
    {name: "hitmonlee", elements: ["fighting"]},
    {name: "hitmonchan", elements: ["fighting"]},
    {name: "lickitung", elements: ["normal"]},
    {name: "koffing", elements: ["poison"], abilities: ['levitate']},
    {name: "weezing", elements: ["poison"], abilities: ['levitate']},
    {name: "rhyhorn", elements: ["ground", "rock"]},
    {name: "rhydon", elements: ["ground", "rock"]},
    {name: "chansey", elements: ["normal"]},
    {name: "tangela", elements: ["grass"]},
    {name: "kangaskhan", elements: ["normal"]},
    {name: "horsea", elements: ["water"]},
    {name: "seadra", elements: ["water"]},
    {name: "goldeen", elements: ["water"]},
    {name: "seaking", elements: ["water"]},
    {name: "staryu", elements: ["water"]},
    {name: "starmie", elements: ["water", "psychic"]},
    {name: "mr. mime", elements: ["psychic", "fairy"]},
    {name: "scyther", elements: ["bug", "flying"]},
    {name: "jynx", elements: ["ice", "psychic"]},
    {name: "electabuzz", elements: ["electric"]},
    {name: "magmar", elements: ["fire"]},
    {name: "pinsir", elements: ["bug"]},
    {name: "tauros", elements: ["normal"]},
    {name: "magikarp", elements: ["water"]},
    {name: "gyarados", elements: ["water", "flying"]},
    {name: "lapras", elements: ["water", "ice"], abilities: ['waterAbsorb']},
    {name: "ditto", elements: ["normal"]},
    {name: "eevee", elements: ["normal"]},
    {name: "vaporeon", elements: ["water"], abilities: ['waterAbsorb']},
    {name: "jolteon", elements: ["electric"], abilities: ['voltAbsorb']},
    {name: "flareon", elements: ["fire"]},
    {name: "porygon", elements: ["normal"]},
    {name: "omanyte", elements: ["rock", "water"]},
    {name: "omastar", elements: ["rock", "water"]},
    {name: "kabuto", elements: ["rock", "water"]},
    {name: "kabutops", elements: ["rock", "water"]},
    {name: "aerodactyl", elements: ["rock", "flying"]},
    {name: "snorlax", elements: ["normal"]},
    {name: "articuno", elements: ["ice", "flying"]},
    {name: "zapdos", elements: ["electric", "flying"]},
    {name: "moltres", elements: ["fire", "flying"]},
    {name: "dratini", elements: ["dragon"]},
    {name: "dragonair", elements: ["dragon"]},
    {name: "dragonite", elements: ["dragon", "flying"]},
    {name: "mewtwo", elements: ["psychic"]},
    {name: "mew", elements: ["psychic"]},
    {name: "chikorita", elements: ["grass"]},
    {name: "bayleef", elements: ["grass"]},
    {name: "meganium", elements: ["grass"]},
    {name: "cyndaquil", elements: ["fire"]},
    {name: "quilava", elements: ["fire"]},
    {name: "typhlosion", elements: ["fire"]},
    {name: "totodile", elements: ["water"]},
    {name: "croconaw", elements: ["water"]},
    {name: "feraligatr", elements: ["water"]},
    {name: "sentret", elements: ["normal"]},
    {name: "furret", elements: ["normal"]},
    {name: "hoothoot", elements: ["normal", "flying"]},
    {name: "noctowl", elements: ["normal", "flying"]},
    {name: "ledyba", elements: ["bug", "flying"]},
    {name: "ledian", elements: ["bug", "flying"]},
    {name: "spinarak", elements: ["bug", "poison"]},
    {name: "ariados", elements: ["bug", "poison"]},
    {name: "crobat", elements: ["poison", "flying"]},
    {name: "chinchou", elements: ["water", "electric"], abilities: ['voltAbsorb', 'waterAbsorb']},
    {name: "lanturn", elements: ["water", "electric"], abilities: ['voltAbsorb', 'waterAbsorb']},
    {name: "pichu", elements: ["electric"]},
    {name: "cleffa", elements: ["fairy"]},
    {name: "igglybuff", elements: ["normal", "fairy"]},
    {name: "togepi", elements: ["fairy"]},
    {name: "togetic", elements: ["fairy", "flying"]},
    {name: "natu", elements: ["psychic", "flying"]},
    {name: "xatu", elements: ["psychic", "flying"]},
    {name: "mareep", elements: ["electric"]},
    {name: "flaaffy", elements: ["electric"]},
    {name: "ampharos", elements: ["electric"]},
    {name: "bellossom", elements: ["grass"]},
    {name: "marill", elements: ["water", "fairy"], abilities: ['sapSipper']},
    {name: "azumarill", elements: ["water", "fairy"], abilities: ['sapSipper']},
    {name: "sudowoodo", elements: ["rock"]},
    {name: "politoed", elements: ["water"], abilities: ['waterAbsorb']},
    {name: "hoppip", elements: ["grass", "flying"]},
    {name: "skiploom", elements: ["grass", "flying"]},
    {name: "jumpluff", elements: ["grass", "flying"]},
    {name: "aipom", elements: ["normal"]},
    {name: "sunkern", elements: ["grass"]},
    {name: "sunflora", elements: ["grass"]},
    {name: "yanma", elements: ["bug", "flying"]},
    {name: "wooper", elements: ["water", "ground"], abilities: ['waterAbsorb']},
    {name: "quagsire", elements: ["water", "ground"], abilities: ['waterAbsorb']},
    {name: "espeon", elements: ["psychic"]},
    {name: "umbreon", elements: ["dark"]},
    {name: "murkrow", elements: ["dark", "flying"]},
    {name: "slowking", elements: ["water", "psychic"]},
    {name: "misdreavus", elements: ["ghost"], abilities: ['levitate']},
    {name: "unown", elements: ["psychic"], abilities: ['levitate']},
    {name: "wobbuffet", elements: ["psychic"]},
    {name: "girafarig", elements: ["normal", "psychic"], abilities: ['sapSipper']},
    {name: "pineco", elements: ["bug"]},
    {name: "forretress", elements: ["bug", "steel"]},
    {name: "dunsparce", elements: ["normal"]},
    {name: "gligar", elements: ["ground", "flying"]},
    {name: "steelix", elements: ["steel", "ground"]},
    {name: "snubbull", elements: ["fairy"]},
    {name: "granbull", elements: ["fairy"]},
    {name: "qwilfish", elements: ["water", "poison"]},
    {name: "scizor", elements: ["bug", "steel"]},
    {name: "shuckle", elements: ["bug", "rock"]},
    {name: "heracross", elements: ["bug", "fighting"]},
    {name: "sneasel", elements: ["dark", "ice"]},
    {name: "teddiursa", elements: ["normal"]},
    {name: "ursaring", elements: ["normal"]},
    {name: "slugma", elements: ["fire"]},
    {name: "magcargo", elements: ["fire", "rock"]},
    {name: "swinub", elements: ["ice", "ground"]},
    {name: "piloswine", elements: ["ice", "ground"]},
    {name: "corsola", elements: ["water", "rock"]},
    {name: "remoraid", elements: ["water"]},
    {name: "octillery", elements: ["water"]},
    {name: "delibird", elements: ["ice", "flying"]},
    {name: "mantine", elements: ["water", "flying"], abilities: ['waterAbsorb']},
    {name: "skarmory", elements: ["steel", "flying"]},
    {name: "houndour", elements: ["dark", "fire"]},
    {name: "houndoom", elements: ["dark", "fire"]},
    {name: "kingdra", elements: ["water", "dragon"]},
    {name: "phanpy", elements: ["ground"]},
    {name: "donphan", elements: ["ground"]},
    {name: "porygon2", elements: ["normal"]},
    {name: "stantler", elements: ["normal"], abilities: ['sapSipper']},
    {name: "smeargle", elements: ["normal"]},
    {name: "tyrogue", elements: ["fighting"]},
    {name: "hitmontop", elements: ["fighting"]},
    {name: "smoochum", elements: ["ice", "psychic"]},
    {name: "elekid", elements: ["electric"]},
    {name: "magby", elements: ["fire"]},
    {name: "miltank", elements: ["normal"], abilities: ['sapSipper']},
    {name: "blissey", elements: ["normal"]},
    {name: "raikou", elements: ["electric"], abilities: ['voltAbsorb']},
    {name: "entei", elements: ["fire"]},
    {name: "suicune", elements: ["water"], abilities: ['waterAbsorb']},
    {name: "larvitar", elements: ["rock", "ground"]},
    {name: "pupitar", elements: ["rock", "ground"]},
    {name: "tyranitar", elements: ["rock", "dark"]},
    {name: "lugia", elements: ["psychic", "flying"]},
    {name: "ho-oh", elements: ["fire", "flying"]},
    {name: "celebi", elements: ["psychic", "grass"]},
    {name: "treecko", elements: ["grass"]},
    {name: "grovyle", elements: ["grass"]},
    {name: "sceptile", elements: ["grass"]},
    {name: "torchic", elements: ["fire"]},
    {name: "combusken", elements: ["fire", "fighting"]},
    {name: "blaziken", elements: ["fire", "fighting"]},
    {name: "mudkip", elements: ["water"]},
    {name: "marshtomp", elements: ["water", "ground"]},
    {name: "swampert", elements: ["water", "ground"]},
    {name: "poochyena", elements: ["dark"]},
    {name: "mightyena", elements: ["dark"]},
    {name: "zigzagoon", elements: ["normal"]},
    {name: "linoone", elements: ["normal"]},
    {name: "wurmple", elements: ["bug"]},
    {name: "silcoon", elements: ["bug"]},
    {name: "beautifly", elements: ["bug", "flying"]},
    {name: "cascoon", elements: ["bug"]},
    {name: "dustox", elements: ["bug", "poison"]},
    {name: "lotad", elements: ["water", "grass"]},
    {name: "lombre", elements: ["water", "grass"]},
    {name: "ludicolo", elements: ["water", "grass"]},
    {name: "seedot", elements: ["grass"]},
    {name: "nuzleaf", elements: ["grass", "dark"]},
    {name: "shiftry", elements: ["grass", "dark"]},
    {name: "taillow", elements: ["normal", "flying"]},
    {name: "swellow", elements: ["normal", "flying"]},
    {name: "wingull", elements: ["water", "flying"]},
    {name: "pelipper", elements: ["water", "flying"]},
    {name: "ralts", elements: ["psychic", "fairy"]},
    {name: "kirlia", elements: ["psychic", "fairy"]},
    {name: "gardevoir", elements: ["psychic", "fairy"]},
    {name: "surskit", elements: ["bug", "water"]},
    {name: "masquerain", elements: ["bug", "flying"]},
    {name: "shroomish", elements: ["grass"]},
    {name: "breloom", elements: ["grass", "fighting"]},
    {name: "slakoth", elements: ["normal"]},
    {name: "vigoroth", elements: ["normal"]},
    {name: "slaking", elements: ["normal"]},
    {name: "nincada", elements: ["bug", "ground"]},
    {name: "ninjask", elements: ["bug", "flying"]},
    {name: "shedinja", elements: ["bug", "ghost"]},
    {name: "whismur", elements: ["normal"]},
    {name: "loudred", elements: ["normal"]},
    {name: "exploud", elements: ["normal"]},
    {name: "makuhita", elements: ["fighting"]},
    {name: "hariyama", elements: ["fighting"]},
    {name: "azurill", elements: ["normal", "fairy"], abilities: ['sapSipper']},
    {name: "nosepass", elements: ["rock"]},
    {name: "skitty", elements: ["normal"]},
    {name: "delcatty", elements: ["normal"]},
    {name: "sableye", elements: ["dark", "ghost"]},
    {name: "mawile", elements: ["steel", "fairy"]},
    {name: "aron", elements: ["steel", "rock"]},
    {name: "lairon", elements: ["steel", "rock"]},
    {name: "aggron", elements: ["steel", "rock"]},
    {name: "meditite", elements: ["fighting", "psychic"]},
    {name: "medicham", elements: ["fighting", "psychic"]},
    {name: "electrike", elements: ["electric"]},
    {name: "manectric", elements: ["electric"]},
    {name: "plusle", elements: ["electric"]},
    {name: "minun", elements: ["electric"]},
    {name: "volbeat", elements: ["bug"]},
    {name: "illumise", elements: ["bug"]},
    {name: "roselia", elements: ["grass", "poison"]},
    {name: "gulpin", elements: ["poison"]},
    {name: "swalot", elements: ["poison"]},
    {name: "carvanha", elements: ["water", "dark"]},
    {name: "sharpedo", elements: ["water", "dark"]},
    {name: "wailmer", elements: ["water"]},
    {name: "wailord", elements: ["water"]},
    {name: "numel", elements: ["fire", "ground"]},
    {name: "camerupt", elements: ["fire", "ground"]},
    {name: "torkoal", elements: ["fire"]},
    {name: "spoink", elements: ["psychic"]},
    {name: "grumpig", elements: ["psychic"]},
    {name: "spinda", elements: ["normal"]},
    {name: "trapinch", elements: ["ground"]},
    {name: "vibrava", elements: ["ground", "dragon"], abilities: ['levitate']},
    {name: "flygon", elements: ["ground", "dragon"], abilities: ['levitate']},
    {name: "cacnea", elements: ["grass"], abilities: ['waterAbsorb']},
    {name: "cacturne", elements: ["grass", "dark"], abilities: ['waterAbsorb']},
    {name: "swablu", elements: ["normal", "flying"]},
    {name: "altaria", elements: ["dragon", "flying"]},
    {name: "zangoose", elements: ["normal"]},
    {name: "seviper", elements: ["poison"]},
    {name: "lunatone", elements: ["rock", "psychic"], abilities: ['levitate']},
    {name: "solrock", elements: ["rock", "psychic"], abilities: ['levitate']},
    {name: "barboach", elements: ["water", "ground"]},
    {name: "whiscash", elements: ["water", "ground"]},
    {name: "corphish", elements: ["water"]},
    {name: "crawdaunt", elements: ["water", "dark"]},
    {name: "baltoy", elements: ["ground", "psychic"], abilities: ['levitate']},
    {name: "claydol", elements: ["ground", "psychic"], abilities: ['levitate']},
    {name: "lileep", elements: ["rock", "grass"]},
    {name: "cradily", elements: ["rock", "grass"]},
    {name: "anorith", elements: ["rock", "bug"]},
    {name: "armaldo", elements: ["rock", "bug"]},
    {name: "feebas", elements: ["water"]},
    {name: "milotic", elements: ["water"]},
    {name: "kecleon", elements: ["normal"]},
    {name: "shuppet", elements: ["ghost"]},
    {name: "banette", elements: ["ghost"]},
    {name: "duskull", elements: ["ghost"], abilities: ['levitate']},
    {name: "dusclops", elements: ["ghost"]},
    {name: "tropius", elements: ["grass", "flying"]},
    {name: "chimecho", elements: ["psychic"], abilities: ['levitate']},
    {name: "absol", elements: ["dark"]},
    {name: "wynaut", elements: ["psychic"]},
    {name: "snorunt", elements: ["ice"]},
    {name: "glalie", elements: ["ice"]},
    {name: "spheal", elements: ["ice", "water"]},
    {name: "sealeo", elements: ["ice", "water"]},
    {name: "walrein", elements: ["ice", "water"]},
    {name: "clamperl", elements: ["water"]},
    {name: "huntail", elements: ["water"]},
    {name: "gorebyss", elements: ["water"]},
    {name: "relicanth", elements: ["water", "rock"]},
    {name: "luvdisc", elements: ["water"]},
    {name: "bagon", elements: ["dragon"]},
    {name: "shelgon", elements: ["dragon"]},
    {name: "salamence", elements: ["dragon", "flying"]},
    {name: "beldum", elements: ["steel", "psychic"]},
    {name: "metang", elements: ["steel", "psychic"]},
    {name: "metagross", elements: ["steel", "psychic"]},
    {name: "regirock", elements: ["rock"]},
    {name: "regice", elements: ["ice"]},
    {name: "registeel", elements: ["steel"]},
    {name: "latias", elements: ["dragon", "psychic"], abilities: ['levitate']},
    {name: "latios", elements: ["dragon", "psychic"]},
    {name: "kyogre", elements: ["water"]},
    {name: "groudon", elements: ["ground"]},
    {name: "rayquaza", elements: ["dragon", "flying"]},
    {name: "jirachi", elements: ["steel", "psychic"]},
    {name: "deoxys", elements: ["psychic"]},
    {name: "turtwig", elements: ["grass"]},
    {name: "grotle", elements: ["grass"]},
    {name: "torterra", elements: ["grass", "ground"]},
    {name: "chimchar", elements: ["fire"]},
    {name: "monferno", elements: ["fire", "fighting"]},
    {name: "infernape", elements: ["fire", "fighting"]},
    {name: "piplup", elements: ["water"]},
    {name: "prinplup", elements: ["water"]},
    {name: "empoleon", elements: ["water", "steel"]},
    {name: "starly", elements: ["normal", "flying"]},
    {name: "staravia", elements: ["normal", "flying"]},
    {name: "staraptor", elements: ["normal", "flying"]},
    {name: "bidoof", elements: ["normal"]},
    {name: "bibarel", elements: ["normal", "water"]},
    {name: "kricketot", elements: ["bug"]},
    {name: "kricketune", elements: ["bug"]},
    {name: "shinx", elements: ["electric"]},
    {name: "luxio", elements: ["electric"]},
    {name: "luxray", elements: ["electric"]},
    {name: "budew", elements: ["grass", "poison"]},
    {name: "roserade", elements: ["grass", "poison"]},
    {name: "cranidos", elements: ["rock"]},
    {name: "rampardos", elements: ["rock"]},
    {name: "shieldon", elements: ["rock", "steel"]},
    {name: "bastiodon", elements: ["rock", "steel"]},
    {name: "burmy", elements: ["bug"]},
    {name: "mothim", elements: ["bug", "flying"]},
    {name: "combee", elements: ["bug", "flying"]},
    {name: "vespiquen", elements: ["bug", "flying"]},
    {name: "pachirisu", elements: ["electric"], abilities: ['voltAbsorb']},
    {name: "buizel", elements: ["water"]},
    {name: "floatzel", elements: ["water"]},
    {name: "cherubi", elements: ["grass"]},
    {name: "cherrim", elements: ["grass"]},
    {name: "shellos", elements: ["water"]},
    {name: "gastrodon", elements: ["water", "ground"]},
    {name: "ambipom", elements: ["normal"]},
    {name: "drifloon", elements: ["ghost", "flying"]},
    {name: "drifblim", elements: ["ghost", "flying"]},
    {name: "buneary", elements: ["normal"]},
    {name: "lopunny", elements: ["normal"]},
    {name: "mismagius", elements: ["ghost"], abilities: ['levitate']},
    {name: "honchkrow", elements: ["dark", "flying"]},
    {name: "glameow", elements: ["normal"]},
    {name: "purugly", elements: ["normal"]},
    {name: "chingling", elements: ["psychic"], abilities: ['levitate']},
    {name: "stunky", elements: ["poison", "dark"]},
    {name: "skuntank", elements: ["poison", "dark"]},
    {name: "bronzor", elements: ["steel", "psychic"], abilities: ['heatProof', 'levitate']},
    {name: "bronzong", elements: ["steel", "psychic"], abilities: ['heatProof', 'levitate']},
    {name: "bonsly", elements: ["rock"]},
    {name: "mime jr.", elements: ["psychic", "fairy"]},
    {name: "happiny", elements: ["normal"]},
    {name: "chatot", elements: ["normal", "flying"]},
    {name: "spiritomb", elements: ["ghost", "dark"]},
    {name: "gible", elements: ["dragon", "ground"]},
    {name: "gabite", elements: ["dragon", "ground"]},
    {name: "garchomp", elements: ["dragon", "ground"]},
    {name: "munchlax", elements: ["normal"]},
    {name: "riolu", elements: ["fighting"]},
    {name: "lucario", elements: ["fighting", "steel"]},
    {name: "hippopotas", elements: ["ground"]},
    {name: "hippowdon", elements: ["ground"]},
    {name: "skorupi", elements: ["poison", "bug"]},
    {name: "drapion", elements: ["poison", "dark"]},
    {name: "croagunk", elements: ["poison", "fighting"]},
    {name: "toxicroak", elements: ["poison", "fighting"]},
    {name: "carnivine", elements: ["grass"], abilities: ['levitate']},
    {name: "finneon", elements: ["water"]},
    {name: "lumineon", elements: ["water"]},
    {name: "mantyke", elements: ["water", "flying"], abilities: ['waterAbsorb']},
    {name: "snover", elements: ["grass", "ice"]},
    {name: "abomasnow", elements: ["grass", "ice"]},
    {name: "weavile", elements: ["dark", "ice"]},
    {name: "magnezone", elements: ["electric", "steel"]},
    {name: "lickilicky", elements: ["normal"]},
    {name: "rhyperior", elements: ["ground", "rock"]},
    {name: "tangrowth", elements: ["grass"]},
    {name: "electivire", elements: ["electric"]},
    {name: "magmortar", elements: ["fire"]},
    {name: "togekiss", elements: ["fairy", "flying"]},
    {name: "yanmega", elements: ["bug", "flying"]},
    {name: "leafeon", elements: ["grass"]},
    {name: "glaceon", elements: ["ice"]},
    {name: "gliscor", elements: ["ground", "flying"]},
    {name: "mamoswine", elements: ["ice", "ground"]},
    {name: "porygon-z", elements: ["normal"]},
    {name: "gallade", elements: ["psychic", "fighting"]},
    {name: "probopass", elements: ["rock", "steel"]},
    {name: "dusknoir", elements: ["ghost"]},
    {name: "froslass", elements: ["ice", "ghost"]},
    {name: "uxie", elements: ["psychic"], abilities: ['levitate']},
    {name: "mesprit", elements: ["psychic"], abilities: ['levitate']},
    {name: "azelf", elements: ["psychic"], abilities: ['levitate']},
    {name: "dialga", elements: ["steel", "dragon"]},
    {name: "palkia", elements: ["water", "dragon"]},
    {name: "heatran", elements: ["fire", "steel"]},
    {name: "regigigas", elements: ["normal"]},
    {name: "giratina", elements: ["ghost", "dragon"], abilities: ['levitate']},
    {name: "cresselia", elements: ["psychic"], abilities: ['levitate']},
    {name: "phione", elements: ["water"]},
    {name: "manaphy", elements: ["water"]},
    {name: "darkrai", elements: ["dark"]},
    {name: "shaymin", elements: ["grass", "flying"]},
    {name: "arceus", elements: ["normal"]},
    {name: "victini", elements: ["psychic", "fire"]},
    {name: "snivy", elements: ["grass"]},
    {name: "servine", elements: ["grass"]},
    {name: "serperior", elements: ["grass"]},
    {name: "tepig", elements: ["fire"]},
    {name: "pignite", elements: ["fire", "fighting"]},
    {name: "emboar", elements: ["fire", "fighting"]},
    {name: "oshawott", elements: ["water"]},
    {name: "dewott", elements: ["water"]},
    {name: "samurott", elements: ["water"]},
    {name: "patrat", elements: ["normal"]},
    {name: "watchog", elements: ["normal"]},
    {name: "lillipup", elements: ["normal"]},
    {name: "herdier", elements: ["normal"]},
    {name: "stoutland", elements: ["normal"]},
    {name: "purrloin", elements: ["dark"]},
    {name: "liepard", elements: ["dark"]},
    {name: "pansage", elements: ["grass"]},
    {name: "simisage", elements: ["grass"]},
    {name: "pansear", elements: ["fire"]},
    {name: "simisear", elements: ["fire"]},
    {name: "panpour", elements: ["water"]},
    {name: "simipour", elements: ["water"]},
    {name: "munna", elements: ["psychic"]},
    {name: "musharna", elements: ["psychic"]},
    {name: "pidove", elements: ["normal", "flying"]},
    {name: "tranquill", elements: ["normal", "flying"]},
    {name: "unfezant", elements: ["normal", "flying"]},
    {name: "blitzle", elements: ["electric"], abilities: ['sapSipper']},
    {name: "zebstrika", elements: ["electric"], abilities: ['sapSipper']},
    {name: "roggenrola", elements: ["rock"]},
    {name: "boldore", elements: ["rock"]},
    {name: "gigalith", elements: ["rock"]},
    {name: "woobat", elements: ["psychic", "flying"]},
    {name: "swoobat", elements: ["psychic", "flying"]},
    {name: "drilbur", elements: ["ground"]},
    {name: "excadrill", elements: ["ground", "steel"]},
    {name: "audino", elements: ["normal"]},
    {name: "timburr", elements: ["fighting"]},
    {name: "gurdurr", elements: ["fighting"]},
    {name: "conkeldurr", elements: ["fighting"]},
    {name: "tympole", elements: ["water"], abilities: ['waterAbsorb']},
    {name: "palpitoad", elements: ["water", "ground"], abilities: ['waterAbsorb']},
    {name: "seismitoad", elements: ["water", "ground"], abilities: ['waterAbsorb']},
    {name: "throh", elements: ["fighting"]},
    {name: "sawk", elements: ["fighting"]},
    {name: "sewaddle", elements: ["bug", "grass"]},
    {name: "swadloon", elements: ["bug", "grass"]},
    {name: "leavanny", elements: ["bug", "grass"]},
    {name: "venipede", elements: ["bug", "poison"]},
    {name: "whirlipede", elements: ["bug", "poison"]},
    {name: "scolipede", elements: ["bug", "poison"]},
    {name: "cottonee", elements: ["grass"]},
    {name: "whimsicott", elements: ["grass", "fairy"]},
    {name: "petilil", elements: ["grass"]},
    {name: "lilligant", elements: ["grass"]},
    {name: "basculin", elements: ["water"]},
    {name: "sandile", elements: ["ground", "dark"]},
    {name: "krokorok", elements: ["ground", "dark"]},
    {name: "krookodile", elements: ["ground", "dark"]},
    {name: "darumaka", elements: ["fire"]},
    {name: "darmanitan", elements: ["fire", "psychic"]},
    {name: "maractus", elements: ["grass"], abilities: ['waterAbsorb']},
    {name: "dwebble", elements: ["bug", "rock"]},
    {name: "crustle", elements: ["bug", "rock"]},
    {name: "scraggy", elements: ["dark", "fighting"]},
    {name: "scrafty", elements: ["dark", "fighting"]},
    {name: "sigilyph", elements: ["psychic", "flying"]},
    {name: "yamask", elements: ["ghost"]},
    {name: "cofagrigus", elements: ["ghost"]},
    {name: "tirtouga", elements: ["water", "rock"]},
    {name: "carracosta", elements: ["water", "rock"]},
    {name: "archen", elements: ["rock", "flying"]},
    {name: "archeops", elements: ["rock", "flying"]},
    {name: "trubbish", elements: ["poison"]},
    {name: "garbodor", elements: ["poison"]},
    {name: "zorua", elements: ["dark"]},
    {name: "zoroark", elements: ["dark"]},
    {name: "minccino", elements: ["normal"]},
    {name: "cinccino", elements: ["normal"]},
    {name: "gothita", elements: ["psychic"]},
    {name: "gothorita", elements: ["psychic"]},
    {name: "gothitelle", elements: ["psychic"]},
    {name: "solosis", elements: ["psychic"]},
    {name: "duosion", elements: ["psychic"]},
    {name: "reuniclus", elements: ["psychic"]},
    {name: "ducklett", elements: ["water", "flying"]},
    {name: "swanna", elements: ["water", "flying"]},
    {name: "vanillite", elements: ["ice"]},
    {name: "vanillish", elements: ["ice"]},
    {name: "vanilluxe", elements: ["ice"]},
    {name: "deerling", elements: ["normal", "grass"], abilities: ['sapSipper']},
    {name: "sawsbuck", elements: ["normal", "grass"], abilities: ['sapSipper']},
    {name: "emolga", elements: ["electric", "flying"]},
    {name: "karrablast", elements: ["bug"]},
    {name: "escavalier", elements: ["bug", "steel"]},
    {name: "foongus", elements: ["grass", "poison"]},
    {name: "amoonguss", elements: ["grass", "poison"]},
    {name: "frillish", elements: ["water", "ghost"], abilities: ['waterAbsorb']},
    {name: "jellicent", elements: ["water", "ghost"], abilities: ['waterAbsorb']},
    {name: "alomomola", elements: ["water"]},
    {name: "joltik", elements: ["bug", "electric"]},
    {name: "galvantula", elements: ["bug", "electric"]},
    {name: "ferroseed", elements: ["grass", "steel"]},
    {name: "ferrothorn", elements: ["grass", "steel"]},
    {name: "klink", elements: ["steel"]},
    {name: "klang", elements: ["steel"]},
    {name: "klinklang", elements: ["steel"]},
    {name: "tynamo", elements: ["electric"], abilities: ['levitate']},
    {name: "eelektrik", elements: ["electric"], abilities: ['levitate']},
    {name: "eelektross", elements: ["electric"], abilities: ['levitate']},
    {name: "elgyem", elements: ["psychic"]},
    {name: "beheeyem", elements: ["psychic"]},
    {name: "litwick", elements: ["ghost", "fire"]},
    {name: "lampent", elements: ["ghost", "fire"]},
    {name: "chandelure", elements: ["ghost", "fire"]},
    {name: "axew", elements: ["dragon"]},
    {name: "fraxure", elements: ["dragon"]},
    {name: "haxorus", elements: ["dragon"]},
    {name: "cubchoo", elements: ["ice"]},
    {name: "beartic", elements: ["ice"]},
    {name: "cryogonal", elements: ["ice"], abilities: ['levitate']},
    {name: "shelmet", elements: ["bug"]},
    {name: "accelgor", elements: ["bug"]},
    {name: "stunfisk", elements: ["ground", "electric"]},
    {name: "mienfoo", elements: ["fighting"]},
    {name: "mienshao", elements: ["fighting"]},
    {name: "druddigon", elements: ["dragon"]},
    {name: "golett", elements: ["ground", "ghost"]},
    {name: "golurk", elements: ["ground", "ghost"]},
    {name: "pawniard", elements: ["dark", "steel"]},
    {name: "bisharp", elements: ["dark", "steel"]},
    {name: "bouffalant", elements: ["normal"], abilities: ['sapSipper']},
    {name: "rufflet", elements: ["normal", "flying"]},
    {name: "braviary", elements: ["normal", "flying"]},
    {name: "vullaby", elements: ["dark", "flying"]},
    {name: "mandibuzz", elements: ["dark", "flying"]},
    {name: "heatmor", elements: ["fire"]},
    {name: "durant", elements: ["bug", "steel"]},
    {name: "deino", elements: ["dark", "dragon"]},
    {name: "zweilous", elements: ["dark", "dragon"]},
    {name: "hydreigon", elements: ["dark", "dragon"], abilities: ['levitate']},
    {name: "larvesta", elements: ["bug", "fire"]},
    {name: "volcarona", elements: ["bug", "fire"]},
    {name: "cobalion", elements: ["steel", "fighting"]},
    {name: "terrakion", elements: ["rock", "fighting"]},
    {name: "virizion", elements: ["grass", "fighting"]},
    {name: "tornadus", elements: ["flying"]},
    {name: "thundurus", elements: ["electric", "flying"], abilities: ['voltAbsorb']},
    {name: "reshiram", elements: ["dragon", "fire"]},
    {name: "zekrom", elements: ["dragon", "electric"]},
    {name: "landorus", elements: ["ground", "flying"]},
    {name: "kyurem", elements: ["dragon", "ice"]},
    {name: "keldeo", elements: ["water", "fighting"]},
    {name: "genesect", elements: ["bug", "steel"]},
    {name: "chespin", elements: ["grass"]},
    {name: "quilladin", elements: ["grass"]},
    {name: "chesnaught", elements: ["grass", "fighting"]},
    {name: "fennekin", elements: ["fire"]},
    {name: "braixen", elements: ["fire"]},
    {name: "delphox", elements: ["fire", "psychic"]},
    {name: "froakie", elements: ["water"]},
    {name: "frogadier", elements: ["water"]},
    {name: "greninja", elements: ["water", "dark"]},
    {name: "bunnelby", elements: ["normal"]},
    {name: "diggersby", elements: ["normal", "ground"]},
    {name: "fletchling", elements: ["normal", "flying"]},
    {name: "fletchinder", elements: ["fire", "flying"]},
    {name: "talonflame", elements: ["fire", "flying"]},
    {name: "scatterbug", elements: ["bug"]},
    {name: "spewpa", elements: ["bug"]},
    {name: "vivillon", elements: ["bug", "flying"]},
    {name: "litleo", elements: ["fire", "normal"]},
    {name: "pyroar", elements: ["fire", "normal"]},
    {name: "flabebe", elements: ["fairy"]},
    {name: "floette", elements: ["fairy"]},
    {name: "florges", elements: ["fairy"]},
    {name: "skiddo", elements: ["grass"], abilities: ['sapSipper']},
    {name: "gogoat", elements: ["grass"]},
    {name: "pancham", elements: ["fighting"]},
    {name: "pangoro", elements: ["fighting", "dark"]},
    {name: "furfrou", elements: ["normal"]},
    {name: "espurr", elements: ["psychic"]},
    {name: "meowstic", elements: ["psychic"]},
    {name: "honedge", elements: ["steel", "ghost"]},
    {name: "doublade", elements: ["steel", "ghost"]},
    {name: "aegislash", elements: ["steel", "ghost"]},
    {name: "spritzee", elements: ["fairy"]},
    {name: "aromatisse", elements: ["fairy"]},
    {name: "swirlix", elements: ["fairy"]},
    {name: "slurpuff", elements: ["fairy"]},
    {name: "inkay", elements: ["dark", "psychic"]},
    {name: "malamar", elements: ["dark", "psychic"]},
    {name: "binacle", elements: ["rock", "water"]},
    {name: "barbaracle", elements: ["rock", "water"]},
    {name: "skrelp", elements: ["poison", "water"]},
    {name: "dragalge", elements: ["poison", "dragon"]},
    {name: "clauncher", elements: ["water"]},
    {name: "clawitzer", elements: ["water"]},
    {name: "helioptile", elements: ["electric", "normal"]},
    {name: "heliolisk", elements: ["electric", "normal"]},
    {name: "tyrunt", elements: ["rock", "dragon"]},
    {name: "tyrantrum", elements: ["rock", "dragon"]},
    {name: "amaura", elements: ["rock", "ice"]},
    {name: "aurorus", elements: ["rock", "ice"]},
    {name: "sylveon", elements: ["fairy"]},
    {name: "hawlucha", elements: ["fighting", "flying"]},
    {name: "dedenne", elements: ["electric", "fairy"]},
    {name: "carbink", elements: ["rock", "fairy"]},
    {name: "goomy", elements: ["dragon"]},
    {name: "sliggoo", elements: ["dragon"]},
    {name: "goodra", elements: ["dragon"]},
    {name: "klefki", elements: ["steel", "fairy"]},
    {name: "phantump", elements: ["grass", "ghost"]},
    {name: "trevenant", elements: ["grass", "ghost"]},
    {name: "pumpkaboo", elements: ["grass", "ghost"]},
    {name: "gourgeist", elements: ["grass", "ghost"]},
    {name: "bergmite", elements: ["ice"]},
    {name: "avalugg", elements: ["ice"]},
    {name: "noibat", elements: ["flying", "dragon"]},
    {name: "noivern", elements: ["flying", "dragon"]},
    {name: "xerneas", elements: ["fairy"]},
    {name: "yveltal", elements: ["dark", "flying"]},
    {name: "zygarde", elements: ["dragon", "ground"]}  
  ]
})