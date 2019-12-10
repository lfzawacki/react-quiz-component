import React from "react";
import { render } from "react-dom";
import Quiz from "../../lib/Quiz";
import {quiz} from './quiz';
import BBBListener from "./bbb";

function parseJSON(data) {
  var json;
  try {
    json = JSON.parse(data);
  } catch(e) {
    json = null;
  }

  return json;
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(unescape(results[1].replace(/\+/g, ' ')));
};

function receiveMessage(event)
{
  var data = parseJSON(event.data);
  if (event.origin === 'https://paulo.dev.mconf.com' && data) {
    console.log("GOT EM", data);
  }
}

function onCompleteAction(obj) {
  var data = JSON.stringify({
    id: "resultsFromComponent",
    data: obj,
  });

  if (!parent) {
    console.log("orphan?");
  }

  parent.postMessage(data, "https://paulo.dev.mconf.com");
}

window.addEventListener("message", receiveMessage, false);

function App() {
  return (
    <div>
      <BBBListener userName={getUrlParameter('userName')} meetingID={getUrlParameter('meetingID')} />
      <Quiz quiz={quiz} shuffle={true} showInstantFeedback={true} continueTillCorrect={true} onComplete={onCompleteAction} />
    </div>
  );
}

render(<App />, document.getElementById("app"));
