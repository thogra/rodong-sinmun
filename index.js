import React from "react";
import ReactDOM from "react-dom";
import App from './src/app';

var mountNode = document.getElementById("app");
ReactDOM.render(<App name="there" />, mountNode);