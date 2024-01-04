const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

// Exercise 1: Use forEach to console.log each product name to the console.
products.forEach((product) => {
  console.log(product.product);
});

// Exercise 2: Use filter to filter out products that have a name longer than 5 characters.
const filteredProducts = products.filter(
  (product) => product.product.length <= 5
);
console.log(filteredProducts);

// Exercise 3: Using both filter and map, convert string prices to numbers and remove products without prices.
const validPrices = products
  .filter((product) => product.price !== "" && !isNaN(product.price))
  .map((product) => ({ ...product, price: Number(product.price) }));

const totalPrice = validPrices.reduce((acc, product) => acc + product.price, 0);
console.log(totalPrice);

// Exercise 4: Use reduce to concatenate all product names into a string.
const concatenatedNames = products.reduce((acc, product, index) => {
  acc += product.product;
  if (index !== products.length - 1) {
    acc += ", ";
  }
  return acc;
}, "");
console.log(concatenatedNames);

// Exercise 5: Use reduce to calculate the highest and lowest-priced items.
const { highest, lowest } = products.reduce(
  (acc, product) => {
    if (!isNaN(product.price)) {
      if (
        acc.highest === null ||
        Number(product.price) > Number(acc.highest.price)
      ) {
        acc.highest = product;
      }
      if (
        acc.lowest === null ||
        Number(product.price) < Number(acc.lowest.price)
      ) {
        acc.lowest = product;
      }
    }
    return acc;
  },
  { highest: null, lowest: null }
);

console.log(`Highest: ${highest.product}. Lowest: ${lowest.product}`);

// Exercise 6: Recreate the object with modified keys using Object.entries and reduce.
const recreatedObject = products.reduce((acc, product) => {
  const modifiedProduct = Object.entries(product).reduce(
    (obj, [key, value]) => {
      if (key === "product") {
        obj.name = value;
      } else if (key === "price") {
        obj.cost = value;
      }
      return obj;
    },
    {}
  );
  acc.push(modifiedProduct);
  return acc;
}, []);

console.log(recreatedObject);
