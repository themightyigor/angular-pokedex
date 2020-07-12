const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const faker = require('faker');
const PokemonService = require('../services/pokemon.service');
const PokemonModel = require('../models/Pokemon');

describe('Pokemon Service', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should add a new user to the db', async () => {
    const mockPokemon = {
      _id: faker.random.uuid(),
      name: faker.internet.userName(),
      damage: faker.random.number(100),
      isCaught: false,
      createdAt: faker.date.past(),
    };

    sinon.stub(PokemonModel, 'findOne').returns(null);
    sinon.stub(PokemonModel.prototype, 'save').returns(mockPokemon);

    const pokemon = await PokemonService.addPokemon(mockPokemon);

    expect(pokemon._id).to.equal(mockPokemon._id);
    expect(pokemon.name).to.equal(mockPokemon.name);
    expect(pokemon.damage).to.equal(mockPokemon.damage);
    expect(pokemon.isCaught).to.be.false;
    expect(pokemon.createdAt).to.equal(mockPokemon.createdAt);
  });
});
