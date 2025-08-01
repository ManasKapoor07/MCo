import "./App.css";
import { useMcoExamplePOSTMutation } from "./redux/api/api";
import Home from './pages/Home'
import About from "./pages/About";

function App() {
  const [mcoParams, { isLoading, data, error }] = useMcoExamplePOSTMutation();
  const handleMcoParams = () => {
    mcoParams({
      id: "id",
      example: "example",
      mco: "mco",
    });
  };
  return (
    <>
      <div>
       <Home />
      </div>
    </>
  );
}

export default App;
