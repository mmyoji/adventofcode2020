import { fetchData } from "./input.ts";
import { run as partOne } from "./part-one.ts";

const [calledNumbers, boards] = await fetchData();
partOne(calledNumbers, boards);
