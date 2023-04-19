let products = require("../data/products.json");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile, getPostData } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, _reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, _reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/products.json", products);
    }
    resolve(products[index]);
  });
}
function remove(id, product) {
  return new Promise((resolve, _reject) => {
    const index = products.findIndex((p) => p.id === id);
    products.splice(index, 1);
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/products.json", products);
    }
    resolve(products[index]);
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
