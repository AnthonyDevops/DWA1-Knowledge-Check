const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];
const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];

// Exercise 1: Use forEach to console log each name to the console.
names.forEach((name) => {
  console.log(name);
});

// Exercise 2: Use forEach to console log each name with a matching province.
names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

// Exercise 3: Using map, loop over all province names and turn the string to all uppercase.
const provincesUpperCase = provinces.map((province) => province.toUpperCase());
console.log(provincesUpperCase);

// Exercise 4: Create a new array with map that has the amount of characters in each name.
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

// Exercise 5: Using sort to sort all provinces alphabetically.
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

// Exercise 6: Use filter to remove all provinces that have the word "Cape" in them.
const filteredProvinces = provinces.filter(
  (province) => !province.includes("Cape")
);
console.log(filteredProvinces.length); // Return the amount of provinces left

// Exercise 7: Create a boolean array by using map and some to determine whether a name contains an 'S' character.
const namesWithS = names.map((name) => name.includes("S"));
console.log(namesWithS);

// Exercise 8: Using only reduce, turn the boolean array into an object indicating the province of an individual.
const provinceObject = namesWithS.reduce((obj, value, index) => {
  obj[names[index]] = value ? provinces[index] : null;
  return obj;
}, {});
console.log(provinceObject);
