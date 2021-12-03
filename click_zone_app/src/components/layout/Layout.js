import React, { useState, useEffect } from "react";
import classes from "./Layout.module.css";

// overview -> press blue button, red button and timer starts for 2-5 seconds, green button and new timer starts that ends when user presses button, and display

// Main Layout Page render
const Layout = (props) => {
  const [buttonState, setButtonState] = useState("blue");
  const [reactionStarted, setReactionStarted] = useState(false);
  const [currReactionTime, setCurrReactionTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  let BlueButtonMessage = "press this button to start your fast reaction time test";
  let RedButtonMessage =
    "Wait until the button turns green then click as fast as you can";
  let GreenButtonMessage = "Press the Button Now!";

  // let timeout = null;
  // let interval = null;

  const StartWaitTimer = () => {
    let randTime = (2 + Math.random() * 3) * 1000; // picks a random time between 2 and 5 seconds
    console.log("randTime: " + randTime);
    setTimeout(() => {
      setButtonState("green");
      StartReactionTimer();
    }, randTime);
  };

  const StartReactionTimer = () => {
    setStartTime(() => new Date().getTime());
    setReactionStarted(true);
  };

  const StopReactionTimer = () => {
    if (reactionStarted) {
      setEndTime(() => new Date().getTime());
      setReactionStarted(false);
    }
  };

  // carries out once the end time is set to avoid setting currReactionTime before setEndTime() finishes
  const SaveReactionResult = () => {
    console.log("end: " + endTime);
    console.log("start: " + startTime);
    setCurrReactionTime(endTime - startTime);
    setStartTime(0);
    setEndTime(0);
  }

  useEffect(() => {
    if (endTime !== 0) {
      SaveReactionResult()
    }
  // eslint-disable-next-line
  }, [endTime])

  // Main component for button ui changes
  const CustomButton = () => {
    if (buttonState === "blue") {
      if (currReactionTime !== 0) {
        BlueButtonMessage =
          "Your Reaction Time was " +
          currReactionTime +
          "ms. Press the button to try again";
      }
      return (
        <div>
          <button
            onClick={() => {
              setButtonState("red");
              StartWaitTimer();
            }}
            className={`${classes.button} ${classes.buttonBlue}`}
          >
            press to start test
          </button>
          <p>{BlueButtonMessage}</p>
        </div>
      );
    }

    if (buttonState === "red") {
      return (
        <div>
          <button className={`${classes.button} ${classes.buttonRed}`}>
            get ready to click here...
          </button>
          <p>{RedButtonMessage}</p>
        </div>
      );
    }

    if (buttonState === "green") {
      return (
        <div>
          <button
            onClick={() => {
              setButtonState("blue");
              StopReactionTimer();
            }}
            className={`${classes.button} ${classes.buttonGreen}`}
          >
            press here!
          </button>
          <p>{GreenButtonMessage}</p>
        </div>
      );
    }
    console.log("Error: no button state defined");
    return <div>Error</div>;
  };

  return (
    <div>
      <div className={classes.centerContent}>{CustomButton()}</div>
    </div>
  );
};

export default Layout;
