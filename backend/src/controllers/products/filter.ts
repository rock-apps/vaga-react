import db from '../../../products.json';

class Filter {
  public id(product_id: string): object {
    const id = Number(product_id) - 1;
    return db.products[id];
  }

  public name(product_name: string): object {
    return {
      products: db.products.filter(({ title }) => ~title.indexOf(product_name)),
    };
  }

  public category(product_category: string): object {
    const categoryId = Number(product_category);
    const selectedCategory = db.categories[categoryId];

    return {
      products: db.products.filter((prod) => prod.categoryId === categoryId),
      category: selectedCategory,
    };
  }
}

export default new Filter();
