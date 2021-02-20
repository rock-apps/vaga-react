import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { products } from "./data.json";
import Product from "./components/Product/ProductItem";

function App() {
  console.log(products);
  return (
    <div className="App">
      <header className="navbar navbar-expand-lg d-flex justify-content-between bg-dark text-light">
        <h1>Futuredeck</h1>
        <nav>
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Profile
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Products
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Cart
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="products-list container mt-5 d-flex flex-wrap justify-content-between">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </main>

      <footer>
        <p>Copyright &copy; 2021</p>
      </footer>
    </div>
  );
}

export default App;
