interface RowItem {
  value: number;
  open: boolean;
}

type Row = RowItem[];

export class Board {
  rows: Row[];

  constructor(data: string[]) {
    this.rows = this.#buildRows(data);
  }

  open(target: number): void {
    for (const row of this.rows) {
      for (const item of row) {
        if (item.value === target) {
          item.open = true;
        }
      }
    }
  }

  bingo(): boolean {
    const opening = (item: RowItem) => item.open;

    // horizontal
    for (const row of this.rows) {
      if (row.every(opening)) {
        return true;
      }
    }

    // virtical
    for (let i = 0; i < 5; i++) {
      const column = this.rows.map((row) => row[i]);
      if (column.every(opening)) {
        return true;
      }
    }

    // // cross
    // const leftToRightCross: RowItem[] = [];
    // for (let i = 0; i < 5; i++) {
    //   leftToRightCross.push(this.rows[i][i]);
    // }
    // if (leftToRightCross.every(opening)) {
    //   return true;
    // }

    // const rightToLeftCross: RowItem[] = [];
    // for (let i = 0; i < 5; i++) {
    //   rightToLeftCross.push(this.rows[i][4 - i]);
    // }
    // if (rightToLeftCross.every(opening)) {
    //   return true;
    // }

    return false;
  }

  score(): number {
    let sumOfUnmarked: number = 0;

    for (const row of this.rows) {
      sumOfUnmarked += row
        .map((item) => {
          if (!item.open) {
            return item.value;
          }

          return 0;
        })
        .reduce((p, c) => p + c);
    }

    return sumOfUnmarked;
  }

  #buildRows(data: string[]): Row[] {
    if (data.length !== 5) {
      throw new Error(`Invalid data length: ${data.length}`);
    }

    if (data.some((row) => typeof row !== "string")) {
      throw new Error("Data has invalid row data type.");
    }

    const rows = data.map((row) =>
      row
        .split(" ")
        .filter((s) => !!s)
        .map((s) => parseInt(s, 10))
    );

    for (const row of rows) {
      if (row.length !== 5) {
        throw new Error("Invalid bingo row length");
      }
    }

    return rows.map((row) => row.map((n) => ({ value: n, open: false })));
  }
}
