
import NavBar from "./components/Nav/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Download from "./components/Content/Download/Download";
import Price from "./components/Content/Price/Price";
import Reason from "./components/Content/Reason/Reason";
import Safety from "./components/Content/Safety/Safety";
import Support from "./components/Content/Support/Support";
import Home from "./components/Content/Home/Home";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/download" exact component={Download} />
        <Route path="/reason" exact component={Reason} />
        <Route path="/price" exact component={Price} />
        <Route path="/safety" exact component={Safety} />
        <Route path="/support" exact component={Support} />
      </Switch>
    </Router>
  );
}

export default App;
