import React, { useState } from "react";
import "./App.scss";
import "normalize.css";
import axios from "axios";

// Importing Components
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";

function App() {
  const [channelAvatar, setChannelAvatar] = useState(
    "https://treepress.net/wp-content/plugins/treepress/public/imgs/no-avatar.png"
  );
  const [channelStats, setChannelStats] = useState({
    Subscribers: 0,
    Uploaded_Videos: 0,
    Total_Views: 0,
  });

  // Call to the YOUTUBE API for Channel Statistics and Channel Avatar (Thumbnail)
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
      <TopBar />

      <div className="hero-section-container">
        {/* Search By YouTube Username */}
        <form className="search-container" onSubmit={submitHandler}>
          YouTube Stats:
          <input
            className="search-container__user-input"
            type="text"
            placeholder="Type a YouTube Channel Name"
            onChange={handleOnChange}
          ></input>
          <button className="search-container__submit-button">Submit</button>
        </form>
        {/*  */}

        <div className="stats-card">
          <img
            className="stats-card__channel-avatar"
            src={channelAvatar}
            alt=""
          />
          {channelStats &&
            Object.entries(channelStats).map((item, index) => (
              <div className="stats-card__displayed-stats" key={index}>
                {" "}
                <h2>{item[0].replace("_", " ")}</h2>{" "}
                <span>{parseInt(item[1]).toLocaleString()}</span>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
