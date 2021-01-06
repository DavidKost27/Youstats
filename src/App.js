import "./App.scss";
import "normalize.css";
import axios from "axios";

function App() {
  const apiRequestHandler = () => {
    axios
      .get(
        "https://youtube.googleapis.com/youtube/v3/channels?part=statistics&forUsername=Wycc220&key=AIzaSyCCEVLyUMtok_H-b3-Z4hWRIFSsHfmCzTg"
      )
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <div className="App">
      YouTube Stats
      <button onClick={apiRequestHandler}>Get Info</button>
    </div>
  );
}

export default App;
