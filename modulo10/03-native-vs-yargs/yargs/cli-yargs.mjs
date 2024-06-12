#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() });
const { argv } = yargs(hideBin(process.argv)).command(
  "createHero",
  "create a hero",
  (builder) => {
    return builder
      .option("name", {
        alias: "n",
        demand: true,
        describe: "Hero name",
        type: "string",
      })
      .option("age", {
        alias: "a",
        demand: true,
        describe: "Hero age",
        type: "number",
      })
      .option("power", {
        alias: "p",
        demand: true,
        describe: "Hero special power",
        type: "string",
      })
      .example(
        'createHero --name "Superman" --age 30 --power "Super strength"',
        "Creates a Hero"
      )
      .example(
        'createHero -n "Superman" -a 30 -p "Super strength"',
        "Creates a Hero"
      )
      .epilog("Copyright 2024 - Otavio Petry Enterprises.");
  }
);

console.log(hero(argv));
