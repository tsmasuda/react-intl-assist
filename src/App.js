import React, { Component } from "react";
import copy from "copy-to-clipboard";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

function formatMessage(message) {
  return `"${message.key}": "${message.value}",`;
}

class App extends Component {
  state = {
    keys: [],
    packageForKey: "",
    pageForKey: "",
    valueForKey: ""
  };

  copyText = message => {
    copy(formatMessage(message));
  };

  disableAddButton = () => {
    const { packageForKey, pageForKey, valueForKey } = this.state;
    return (
      packageForKey.length === 0 &&
      pageForKey.length === 0 &&
      valueForKey.length === 0
    );
  };

  handleChange = ({ target: { id, value } }) => {
    const obj = {};
    obj[id] = value;
    this.setState({ ...obj });
  };

  handleAddClick = () => {
    const { keys, packageForKey, pageForKey, valueForKey } = this.state;

    // todo: remove all double quote, single quote
    // todo: replace double spaces to be one space
    // todo: shorten the display key if too long
    const key = `${packageForKey}.${pageForKey}.${valueForKey}`;

    // todo: escape all double quote, single quote
    // todo: shorten the display key if too long
    const value = `${valueForKey}`;

    keys.push({ key, value });

    this.setState({ keys, valueForKey: "" });
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
              id="packageForKey"
              name="packageForKey"
              label="Package"
              fullWidth
              value={this.state.packageForKey}
              onChange={this.handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="pageForKey"
              name="pageForKey"
              label="Page"
              fullWidth
              value={this.state.pageForKey}
              onChange={this.handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="valueForKey"
              name="valueForKey"
              label="Translation Value"
              multiline
              fullWidth
              value={this.state.valueForKey}
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
            >
              Add
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {this.state.keys.map((message, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={11}>
                  {formatMessage(message)}
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={this.copyText(message)}
                  >
                    Copy
                  </Button>
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
