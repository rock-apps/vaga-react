import JSONdb from '../../products.json';
import db from '../../database/connection';

class Filter {
  public async rate(product_id: string): Promise<{ rating: number }> {
    const [avg] = await db('rating')
      .where('rating.product_id', '=', product_id)
      .avg('rate');

    return {
      rating: avg['avg(`rate`)'] ?? 0,
    };
  }

  public async id(product_id: string): Promise<object> {
    const id = Number(product_id) - 1;
    const { rating } = await this.rate(product_id);

    return {
      product: {
        ...JSONdb.products[id],
        rating,
      },
    };
  }

  public name(product_name: string): object {
    return {
      products: JSONdb.products.filter(
        ({ title }) => ~title.indexOf(product_name)
      ),
    };
  }

  public category(product_category: string): object {
    const id = JSONdb.categories.indexOf(product_category);
    const categoryId = id >= 0 ? id : Number(product_category);

    return {
      products: JSONdb.products.filter(prod => prod.categoryId === categoryId),
      name: JSONdb.categories[categoryId],
      description: JSONdb.categoriesDescriptions[categoryId],
    };
  }

  public categories() {
    return {
      categories: JSONdb.categories,
    };
  }
}

export default new Filter();
