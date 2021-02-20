import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { products } from "./data.json";
import { Route } from "react-router";
import Shop from "./Routes/Shop";
import ProductPage from "./Routes/ProductPage/ProductPage";

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
        <Route path="/shop" render={() => <Shop products={products} />} />
        <Route path="/:id" component={ProductPage} />
      </main>

      <footer>
        <p>Copyright &copy; 2021</p>
      </footer>
    </div>
  );
}

export default App;
