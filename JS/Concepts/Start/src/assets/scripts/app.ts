function swapPositions(pos1: number, pos2: number, list: number[]): number[] {
  const position1El = list[pos1 - 1];
  const position2El = list[pos2 - 1];
  const temp = position1El;
  list[pos1 - 1] = position2El;
  list[pos2 - 1] = temp;

  return list;
}

const list = [1, 2, 3, 4, 5];
const pos1 = 2;
const pos2 = 4;
// console.log(swapPositions(pos1, pos2, list));

const addToWishlist = (productId: string) => {
  const wishlist = ['p1', 'p2', 'p3'];
  const existingProduct = wishlist.find(product => product === productId);
  console.log(existingProduct);
};

// addToWishlist('p1');

const paginateWishlists = (page: number): string[] => {
  let wishlist: string[] = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];
  const perPage = 2;
  wishlist = wishlist.slice((page - 1) * perPage).slice(0, perPage);

  return wishlist;
};

// console.log(paginateWishlists(3));

const removeFromWishList = (productId: string): string[] => {
  const wishlist = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];
  const removeProductIdx = wishlist.findIndex(product => product === productId);
  if (removeProductIdx >= 0) {
    wishlist.splice(removeProductIdx, 1);
  } else {
    throw new Error('Invalid product Id to purge');
  }

  return wishlist;
};

let impossible = 9;

switch (impossible) {
  case 1:
    console.log(`Value of impossible is 1`);
    break;
  case 2:
    console.log(`Value of impossible is 2`);
    break;
  case 9:
    console.log(`Value of impossible is 9`);
    break;
  case 9:
    console.log(`Value of impossible is 9000`);
    break;
  case 10:
    console.log(`Value of impossible is 10`);
    break;
  case 5:
    console.log(`Value of impossible is 5`);
    break;
}

const values = [1, 2, 3, 4, 5];

outerLoop: for (let iter = 0; iter <= 5; iter++) {
  let canBreak = false;
  console.log(`Iteration ${iter}`);
  innerLoop: for (let val of values) {
    console.log(`Value ${val}`);
    if (iter === 2) {
      canBreak = true;
      break;
    }
  }
  if (canBreak) {
    break;
  }
}
