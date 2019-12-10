import React from "react";
import "../lib/styles.css";

function BBBListener(props) {
  return (
    <div className="listener-container">
      Quiz for <strong>{props.userName}</strong> on <strong>{props.meetingID}</strong>
    </div>
  );
}

export default BBBListener;
