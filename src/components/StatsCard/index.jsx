import "./styles.scss";

export default function StatsCard(props) {
  return (
    <div className="stats-card-container">
      <div
        className="branding-container"
        style={{ backgroundImage: `url(${props.channelBanner})` }}
      >
        <img
          className="branding-container__avatar"
          src={props.channelAvatar}
          alt=""
        />
      </div>

      <div className="stats-card-container">
        {props.channelStats &&
          Object.entries(props.channelStats).map((item, index) => (
            <div className="stats-card__displayed-stats" key={index}>
              {" "}
              <div className="stats-card__displayed-stats__headers">
                {item[0].replace("_", " ")}:
              </div>{" "}
              <div className="stats-card__displayed-stats__numbers">
                {parseInt(item[1]).toLocaleString()}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
