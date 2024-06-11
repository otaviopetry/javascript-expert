import { $ } from "zx";
import isSafe from "safe-regex";

$.verbose = false;

import { setTimeout } from "timers/promises";

await $`docker run -p "8080:80" -d nginx`;
await setTimeout(500);
const req = await $`curl --silent localhost:8080`;
console.log(`req\n`, req.stdout);

const containers = await $`docker ps`;
const expression = /(?<containerId>\w+)\W+(?=nginx)/;

if (!isSafe(expression)) throw new Error("Unsafe regex!");

const {
  groups: { containerId },
} = containers.toString().match(expression);

console.log(containerId);

const logs = await $`docker logs ${containerId}`;
console.log("logs \n", logs.stdout);

const rm = await $`docker rm -f ${containerId}`;
console.log("rm\n", rm.stdout);
