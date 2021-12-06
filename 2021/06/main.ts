import { fetchData } from "./input.ts";
import { run as partOne } from "./part-one.ts";

const fishes = await fetchData();
partOne(fishes);
