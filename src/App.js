import React, { Component } from "react";
import copy from "copy-to-clipboard";
import {
  Grid,
  TextField,
  Button,
  ButtonGroup,
  Typography
} from "@material-ui/core";
import { camelCase, paramCase } from "change-case";
import empty from "is-empty";

function createMessageObject(packageName, componentName, defaultMessage) {
  const trimedMessage = defaultMessage.replace(/\s+/g, " ").replace(/\s$/g, "");
  return {
    key: camelCase(trimedMessage),
    id: `${packageName}.${paramCase(componentName)}.${trimedMessage}`,
    defaultMessage: trimedMessage
  };
}

function copyToClipboard(messageObjects, format) {
  let copyObject = "";

  switch (format) {
    case "JS":
      copyObject = messageObjects.map(getJs);
      break;
    case "JSON":
      copyObject = messageObjects.map(getJson);
      break;
    case "JSX":
      copyObject = messageObjects.map(getJsx);
      break;
    default:
      break;
  }

  copy(copyObject);
}

function getJs(messageObject) {
  return `
    ${messageObject.key}: {
      "id": "${messageObject.id}",
      "defaultMessage": "${messageObject.defaultMessage}"
    },`;
}

function getJson(messageObject) {
  return `
    "id": "${messageObject.id}",
    "defaultMessage": "${messageObject.defaultMessage}"`;
}

function getJsx(messageObject) {
  return `
    <FormattedMessage
      id="${messageObject.key}"
      defaultMessage={messages.${messageObject.key}}
      value={}
    />`;
}

class App extends Component {
  state = {
    messageObjects: [],
    packageName: "",
    componentName: "",
    defaultMessage: ""
  };

  handleChange = ({ target: { id, value } }) => {
    const obj = {};
    obj[id] = value;
    this.setState({ ...obj });
  };

  handleAddClick = () => {
    const {
      messageObjects,
      packageName,
      componentName,
      defaultMessage
    } = this.state;

    const messageObject = createMessageObject(
      packageName,
      componentName,
      defaultMessage
    );

    messageObjects.push(messageObject);
    this.setState({ messageObjects, defaultMessage: "" });
  };

  isDisabled = () => {
    const { packageName, componentName, defaultMessage } = this.state;
    return empty(packageName) || empty(componentName) || empty(defaultMessage);
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Display Keys Assistance
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="packageName"
              name="packageName"
              label="Package Name"
              fullWidth
              value={this.state.packageName}
              onChange={this.handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="componentName"
              name="componentName"
              label="Component Name"
              fullWidth
              value={this.state.componentName}
              onChange={this.handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="defaultMessage"
              name="defaultMessage"
              label="Default Message"
              multiline
              fullWidth
              value={this.state.defaultMessage}
              onChange={this.handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              id="addButton"
              name="addButton"
              fullWidth
              color="primary"
              onClick={this.handleAddClick}
              variant="contained"
              disabled={this.isDisabled()}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xx={12} sm={8}></Grid>
          <Grid item xx={12} sm={4}>
            <ButtonGroup variant="contained" color="primary">
              <Button
                onClick={() => copyToClipboard(this.state.messageObjects, "JS")}
              >
                JS (ALL)
              </Button>
              <Button
                onClick={() =>
                  copyToClipboard(this.state.messageObjects, "JSON")
                }
              >
                JSON (ALL)
              </Button>
              <Button
                onClick={() =>
                  copyToClipboard(this.state.messageObjects, "JSX")
                }
              >
                JSX (ALL)
              </Button>
            </ButtonGroup>
          </Grid>
          {this.state.messageObjects.map((messageObject, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={8}>
                  {messageObject.defaultMessage}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ButtonGroup variant="contained" color="secondary">
                    <Button
                      onClick={() => copyToClipboard([messageObject], "JS")}
                    >
                      JS
                    </Button>
                    <Button
                      onClick={() => copyToClipboard([messageObject], "JSON")}
                    >
                      JSON
                    </Button>
                    <Button
                      onClick={() => copyToClipboard([messageObject], "JSX")}
                    >
                      JSX
                    </Button>
                  </ButtonGroup>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;
