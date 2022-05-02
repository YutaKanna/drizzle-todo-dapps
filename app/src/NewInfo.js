import React from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
const styles = (theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
});
class NewInfo extends React.Component {
  state = {
    stackId: null,
    registrationDate: null,
    companyName: null,
    certifiedBusiness: null,
    registrationNumber: null,
    detailedInfo: null
  };
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.CertificationInfo;
    const stackId = contract.methods.registerCertificationInfo.cacheSend(
      this.state.registrationDate,
      this.state.companyName,
      this.state.certifiedBusiness,
      this.state.registrationNumber,
      this.state.detailedInfo,
      { from: drizzleState.accounts[0] }
    );
    this.setState({ stackId: stackId });
  }
  getTxStatus = () => {
    const { transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[this.state.stackId];
    if (!txHash) return null;
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <div className="create-facility-info">
          <h2>Register a New CertificationInfo</h2>
          <label>登録日付 </label>
          <TextField id="outlined-bare"
                     className={classes.textField}
                     placeholder="yyyy/mm/dd"
                     margin="normal"
                     name="registrationDate"
                     onChange={(e) => this.handleInputChange(e)}
                     variant="outlined"
                     inputProps={{'aria-label': 'bare'}} />
          <br />
          <label>企業名  </label>
          <TextField id="outlined-bare"
                     className={classes.textField}
                     placeholder="企業名"
                     margin="normal"
                     name="companyName"
                     onChange={(e) => this.handleInputChange(e)}
                     variant="outlined"
                     inputProps={{'aria-label': 'bare'}} />
          <br />
          <label>認定事業者</label>
          <TextField id="outlined-bare"
                     className={classes.textField}
                     placeholder="認定事業者"
                     margin="normal"
                     name="certifiedBusiness"
                     onChange={(e) => this.handleInputChange(e)}
                     variant="outlined"
                     inputProps={{'aria-label': 'bare'}} />
          <br />
          <label>登録番号 </label>
          <TextField id="outlined-bare"
                     className={classes.textField}
                     placeholder="例) AAA-BB0000"
                     margin="normal"
                     name="registrationNumber"
                     onChange={(e) => this.handleInputChange(e)}
                     variant="outlined"
                     inputProps={{'aria-label': 'bare'}} />
          <br />
          <label>詳細情報 </label>
          <TextField id="outlined-bare"
                     className={classes.textField}
                     placeholder="例) 詳細情報を記載したページのURLなど"
                     margin="normal"
                     name="detailedInfo"
                     onChange={(e) => this.handleInputChange(e)}
                     variant="outlined"
                     inputProps={{'aria-label': 'bare'}} />
          <br />
          <Button onClick={this.handleSubmit}
                  variant="contained"
                  className={classes.button}>
            Submit
          </Button>
          <div>{this.getTxStatus()}</div>
        </div>
      </Paper>
    );
  }
}
export default withStyles(styles)(NewInfo);