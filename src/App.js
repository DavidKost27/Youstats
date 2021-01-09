import React, { useState } from "react";
import "./App.scss";
import "normalize.css";
import axios from "axios";

function App() {
  const apiRequestHandler = () => {
    axios
      .get(
        "https://youtube.googleapis.com/youtube/v3/channels?part=statistics&forUsername=" +
          `${userInput}` +
          "&key=AIzaSyCCEVLyUMtok_H-b3-Z4hWRIFSsHfmCzTg"
      )
      .then((response) => {
        if (response.data.items) {
          const { subscriberCount } = response.data.items[0].statistics;
          const { videoCount } = response.data.items[0].statistics;
          const { viewCount } = response.data.items[0].statistics;
          console.log(response.data.items[0].statistics);
          console.log(subscriberCount, videoCount, viewCount);
        } else {
          console.log("Channel was not found");
        }
      });
  };
  const [userInput, setUserInput] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(userInput);
    apiRequestHandler();
  };

  const handleOnChange = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        YouTube Stats
        <input
          type="text"
          placeholder="YouTube Channel Name"
          onChange={handleOnChange}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
