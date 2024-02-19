import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import RickAndMortyUSD from '../../src/business/integrations/rickAndMortyUSD';
import RickAndMortyUSDAdapter from '../../src/business/adapters/rickAndMortyUSDAdapter';

describe('#RickAndMortyUSDAdapter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('#getCharacters should be an adapter for RickAndMortyUSD.getCharactersFromJSON', async () => {
        const USDIntegration = jest.spyOn(
            RickAndMortyUSD,
            RickAndMortyUSD.getCharactersFromXML.name,
        ).mockResolvedValue([]);

        const result = await RickAndMortyUSDAdapter.getCharacters();

        expect(result).toEqual([]);
        expect(USDIntegration).toHaveBeenCalled();
    });
});