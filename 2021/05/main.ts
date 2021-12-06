import { fetchData } from "./input.ts";
import { run as partOne } from "./part-one.ts";
import { run as partTwo } from "./part-two.ts";

const vents = await fetchData();
// partOne(vents);
partTwo(vents);
