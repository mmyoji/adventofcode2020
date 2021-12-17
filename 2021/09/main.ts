import { fetchData } from "./input.ts";
import { run as partOne } from "./part-one.ts";
import { run as partTwo } from "./part-two.ts";

const data = await fetchData("./input.txt");
console.log("Part 1:", partOne(data)); // 532
console.log("Part 2:", partTwo(data)); // 1110780
