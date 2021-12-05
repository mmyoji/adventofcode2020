import { fetchCommands } from "./input.ts";
import { run as partOne } from "./part-one.ts";
import { run as partTwo } from "./part-two.ts";

const commands = await fetchCommands();
// partOne(commands);
partTwo(commands);
