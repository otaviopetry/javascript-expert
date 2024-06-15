import { expect, describe, test, jest, beforeEach, beforeAll, afterAll } from "@jest/globals";

import { tmpdir } from "os";
import fsPromises from "fs/promises";
import { join } from "path";
import { createLayersIfNotExistent } from "../../src/createLayers";

describe("#Integration - Layers - Folder Structure", () => {
    const config = {
        defaultMainFolder: "src",
        mainPath: "",
        layers: ["service", "factory", "repository"].sort(),
    };

    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "skeleton-"));
    });

    afterAll(async () => {
        await fsPromises.rm(config.mainPath, { recursive: true });
    });

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test("should not create folders if it exists", async () => {
        const beforeRun = await fsPromises.readdir(config.mainPath);

        await createLayersIfNotExistent(config);

        const afterRun = await getFolders(config);

        expect(beforeRun).not.toStrictEqual(afterRun);
        expect(afterRun).toEqual(config.layers);
    });

    test("should create folders if it doesn't exist", async () => {
        const beforeRun = await getFolders(config);

        await createLayersIfNotExistent(config);

        const afterRun = await getFolders(config);

        expect(beforeRun).toStrictEqual(afterRun);
    });
});

function getFolders({ mainPath, defaultMainFolder }) {
    return fsPromises.readdir(join(mainPath, defaultMainFolder));
}
