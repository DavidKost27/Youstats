import "./styles.scss";
import TextField from "@material-ui/core/TextField";

export default function SearchInput(props) {
  return (
    <form
      id="SearchInput"
      className="search-container"
      onSubmit={props.submitHandler}
    >
      <div className="wrapper">
        <TextField
          id="outlined-basic"
          label="Type a Channel Name"
          variant="outlined"
          onChange={props.handleOnChange}
        />

        <button className="wrapper__submit-button">
          <span class="material-icons" id="search-icon">
            search
          </span>
        </button>
      </div>
    </form>
  );
}
