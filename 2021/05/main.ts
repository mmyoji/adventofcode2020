import { fetchData } from "./input.ts";
import { run as partOne } from "./part-one.ts";

const vents = await fetchData();
partOne(vents);
