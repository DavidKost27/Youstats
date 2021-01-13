import React, { useState } from "react";
import "./App.scss";
import "normalize.css";
import axios from "axios";

// Importing Components
import TopBar from "./components/TopBar";
import SerachInput from "./components/SearchInput";
import StatsCard from "./components/StatsCard";

function App() {
  const [channelBanner, setChannelBanner] = useState("null");
  const [channelAvatar, setChannelAvatar] = useState("null");
  const [channelStats, setChannelStats] = useState({
    Subscribers: 0,
    Uploaded_Videos: 0,
    Total_Views: 0,
  });

  // Call to the YOUTUBE API for Channel Statistics and Channel Avatar (Thumbnail)
  const apiRequestHandler = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=brandingSettings&part=snippet&part=statistics&forUsername=${userInput}&key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        if (response.data.items) {
          const channelStats = response.data.items[0].statistics;
          setChannelAvatar(
            response.data.items[0].snippet.thumbnails.default.url
          );
          setChannelBanner(
            response.data.items[0].brandingSettings.image.bannerExternalUrl
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
        <SerachInput
          submitHandler={submitHandler}
          handleOnChange={handleOnChange}
        />
        {/*  */}

        {/* Stats Card to ShowCase all the stats */}
        <StatsCard
          channelAvatar={channelAvatar}
          channelBanner={channelBanner}
          channelStats={channelStats}
        />
        {/*  */}
      </div>
    </div>
  );
}

export default App;
