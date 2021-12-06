import { fetchData } from "./input.ts";
import { run as partOne } from "./part-one.ts";
import { run as partTwo } from "./part-two.ts";

const depths = await fetchData();
// partOne(depths);
partTwo(depths);
