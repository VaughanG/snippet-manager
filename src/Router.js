import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/misc/Navbar";
import Home from "./components/home/Home";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">Login</Route>
        <Route path="/register">Register</Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
