#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createLayersIfNotExistent } from "./createLayers.js";
import { createFiles } from "./createFiles.js";

const {
    argv: { componentName },
} = yargs(hideBin(process.argv))
    .command("skeleton", "Create project skeleton", (builder) => {
        return builder
            .option("component-name", {
                alias: "c",
                demandOption: true,
                describe: "Component name",
                type: "array",
            })
            .example(
                "skeleton --component-name product",
                "Creates a project with a single domain - Product"
            )
            .example(
                "skeleton -c product -c person -c colors",
                "Creates a project with three domains - Product, Person, and Colors"
            );
    })
    .epilog("Copyright 2024 - Otavio Petry enterprises");

console.log({ componentName });

const env = process.env.NODE_ENV;
const defaultMainFolder = env === "dev" ? "tmp" : "src";
const layers = ["repository", "service", "factory"].sort();
const config = {
    layers,
    defaultMainFolder,
    mainPath: ".",
};

await createLayersIfNotExistent(config);

const pendingPromises = [];

for (const domain of componentName) {
    const result = createFiles({
        ...config,
        componentName: domain,
    });

    pendingPromises.push(result);
}

await Promise.all(pendingPromises);
