import React, { useState } from "react";
import "./App.scss";
import "normalize.css";
import axios from "axios";

function App() {
  const [channelAvatar, setChannelAvatar] = useState(null);
  const [channelStats, setChannelStats] = useState({
    Subscribers: 0,
    Uploaded_Videos: 0,
    Total_Views: 0,
  });

  const apiRequestHandler = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&forUsername=${userInput}&key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        if (response.data.items) {
          const channelStats = response.data.items[0].statistics;
          setChannelAvatar(
            response.data.items[0].snippet.thumbnails.default.url
          );
          const { viewCount, subscriberCount, videoCount } = channelStats;
          setChannelStats({
            Subscribers: subscriberCount,
            Uploaded_Videos: videoCount,
            Total_Views: viewCount,
          });
        } else {
          console.log("Channel was not found");
        }
      });
  };
  const [userInput, setUserInput] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
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

      <div>
        <img className="channel-avatar" src={channelAvatar} alt="" />
        {channelStats &&
          Object.entries(channelStats).map((item, index) => (
            <div key={index}>
              {" "}
              <h2>{item[0].replace("_", " ")}</h2>{" "}
              <span>{parseInt(item[1]).toLocaleString()}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
