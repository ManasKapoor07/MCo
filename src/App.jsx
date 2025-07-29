import "./App.css";
import { useMcoExamplePOSTMutation } from "./redux/api/api";

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
        <h1 onClick={handleMcoParams} className="text-3xl font-bold underline">
          Hello MCO!
        </h1>
      </div>
    </>
  );
}

export default App;
