import { TWordList } from "../ES4K";

export interface Routines {
  words: TWordList;
}

let arr = [4, 5, 1, 8, 15];

arr = arr.filter((n) => n <= 9);

let supplement = arr.map((n) => 9 - n);

let index: any[] = [];
arr.forEach((n, ni) => {
  supplement.forEach((s, si) => {
    if (s === n) {
      index = [ni, si];
    }
  });
});

console.log(arr[index[0]] + arr[index[1]]);

window.addEventListener("click", () => {});

import.meta;
