import { fetchData } from "./input.ts";
import { run as partOne } from "./part-one.ts";
import { run as partTwo } from "./part-two.ts";

/**
 * binary string -> Number :: parseInt("00100", 2)
 * Reverse bit             :: 1001 ^ 1111 = 0110
 */

const data = await fetchData();
// partOne(data);
partTwo(data);
