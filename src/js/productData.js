function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = "http://157.201.228.93:2992/products/search/" + category;
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson).then((data) => data.Result);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
