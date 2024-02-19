import RickAndMortyUSD from "../integrations/rickAndMortyUSD.js";

export default class RickAndMortyUSDAdapter {
    static getCharacters() {
        return RickAndMortyUSD.getCharactersFromXML();
    }
}