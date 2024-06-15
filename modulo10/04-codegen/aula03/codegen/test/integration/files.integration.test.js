import { expect, describe, test, jest, beforeEach, beforeAll, afterAll } from "@jest/globals";

import { tmpdir } from "os";
import fsPromises from "fs/promises";
import { join } from "path";
import { createLayersIfNotExistent } from "../../src/createLayers";
import { createFiles } from "../../src/createFiles";
import Util from "../../src/util";

describe("#Integration - Files - Files Structure", () => {
    const config = {
        defaultMainFolder: "src",
        mainPath: "",
        layers: ["service", "factory", "repository"].sort(),
        componentName: "heroes",
    };
    const packageJSON = "package.json";
    const packageJSONLocation = join("./test/integration/mocks", packageJSON);

    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "layers-"));
        await fsPromises.copyFile(packageJSONLocation, join(config.mainPath, packageJSON));
        await createLayersIfNotExistent(config);
    });

    afterAll(async () => {
        await fsPromises.rm(config.mainPath, { recursive: true });
    });

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test("Repository class should have create, read, update, and delete methods", async () => {
        const myConfig = {
            ...config,
            layers: ["repository"],
        };

        await createFiles(myConfig);

        const [repositoryFile] = generateFilePath(myConfig);

        const { default: Repository } = await import(repositoryFile);
        const instance = new Repository();
        const expectNotImplemented = (fn) => {
            expect(() => fn.call()).rejects.toEqual("Method not implemented!");
        };

        expectNotImplemented(instance.create);
        expectNotImplemented(instance.read);
        expectNotImplemented(instance.update);
        expectNotImplemented(instance.delete);
    });
    test("Service class should have the same signature of repository and call its methods", async () => {
        const myConfig = {
            ...config,
            layers: ["repository", "service"],
        };

        await createFiles(myConfig);

        const [repositoryFile, serviceFile] = generateFilePath(myConfig);

        const { default: Repository } = await import(repositoryFile);
        const { default: Service } = await import(serviceFile);
        const repositoryInstance = new Repository();
        const serviceInstance = new Service({ repository: repositoryInstance });
        const allRepositoryMethods = getAllFunctionsFromInstance(repositoryInstance);

        allRepositoryMethods.forEach((method) =>
            jest.spyOn(repositoryInstance, method).mockResolvedValue()
        );

        getAllFunctionsFromInstance(serviceInstance).forEach((method) =>
            serviceInstance[method].call(serviceInstance, [])
        );

        allRepositoryMethods.forEach((method) =>
            expect(repositoryInstance[method]).toHaveBeenCalled()
        );
    });

    test("Factory class should match layers", async () => {
        const myConfig = {
            ...config,
        };

        await createFiles(myConfig);

        const [factoryFile, repositoryFile, serviceFile] = generateFilePath(myConfig);

        const { default: Factory } = await import(factoryFile);
        const { default: Repository } = await import(repositoryFile);
        const { default: Service } = await import(serviceFile);
        const expectedInstance = new Service({ repository: new Repository() });
        const instance = Factory.getInstance();

        expect(instance).toMatchObject(expectedInstance);
        expect(instance).toBeInstanceOf(Service);
    });
});

function generateFilePath({ mainPath, defaultMainFolder, layers, componentName }) {
    return layers.map((layer) => {
        const fileName = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`;

        return join(mainPath, defaultMainFolder, layer, fileName);
    });
}

function getAllFunctionsFromInstance(instance) {
    return Reflect.ownKeys(Reflect.getPrototypeOf(instance)).filter(
        (method) => method !== "constructor"
    );
}
