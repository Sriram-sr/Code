const swapFirstLastElements: (list: Array<number>) => Array<number> = (
  list
) => {
  const firstElement = list.at(0) as number;
  const lastElement = list.at(-1) as number;
  const temp = lastElement;

  list[-1] = firstElement;
  list[0] = temp;

  return list;
};

const list = [12, 35, 9, 56, 24];
console.log(swapFirstLastElements(list));
