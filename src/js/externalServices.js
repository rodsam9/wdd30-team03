export function convertToJson(res) {
  let json = JSON.stringify(res);
  if (res.ok) {
    return res.json();
  } else {
    throw { name: 'servicesError', message: res.toString() };
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = "http://157.201.228.93:2992/products/search/" + category;
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
