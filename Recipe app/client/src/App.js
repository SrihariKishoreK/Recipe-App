import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth }  from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import { SavedRecipes } from "./pages/saved-recipes";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Auth />} />
          <Route path="/home" element = {<Home />} />
          <Route path="/create-recipe" element = {<CreateRecipe />} />
          <Route path="/saved-recipes" element = {<SavedRecipes />} />
          <Route path="/auth" element = {<Auth />} />  
          {/* delete line 19 and change "/"to render Home instead of auth */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;