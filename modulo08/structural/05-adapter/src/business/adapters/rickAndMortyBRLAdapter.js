import RickAndMortyBRL from "../integrations/rickAndMortyBRL.js";

export default class RickAndMortyBRLAdapter {
    static getCharacters() {
        return RickAndMortyBRL.getCharactersFromJSON();
    }
}