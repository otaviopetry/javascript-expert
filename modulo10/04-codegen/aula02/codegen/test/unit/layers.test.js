import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import fsPromises from "fs/promises";
import fs from "fs";
import { createLayersIfNotExistent } from "../../src/createLayers";

describe("#Layers - Folder Structure", () => {
    const defaultLayers = ["service", "repository", "factory"];

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test("should create folders if they do not exist", async () => {
        jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);
        jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();

        await createLayersIfNotExistent({ mainPath: "", layers: defaultLayers });

        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
        expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length);
    });
    test("should not create folders if they already exist", async () => {
        jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);
        jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();

        await createLayersIfNotExistent({ mainPath: "", layers: defaultLayers });

        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
        expect(fsPromises.mkdir).not.toHaveBeenCalled();
    });
});
