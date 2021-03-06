import db from '../../../products.json';

class Filter {
  public id(product_id: string): object {
    const id = Number(product_id) - 1;
    return {
      product: db.products[id],
    };
  }

  public name(product_name: string): object {
    return {
      products: db.products.filter(({ title }) => ~title.indexOf(product_name)),
    };
  }

  public category(product_category: string): object {
    const id = db.categories.indexOf(product_category);
    const categoryId = id >= 0 ? id : Number(product_category);

    return {
      products: db.products.filter(prod => prod.categoryId === categoryId),
      name: db.categories[categoryId],
      description: db.categoriesDescriptions[categoryId],
    };
  }

  public categories() {
    return {
      categories: db.categories,
    };
  }
}

export default new Filter();
