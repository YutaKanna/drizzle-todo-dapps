import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
};
const StyleTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);
function createData(blockNumber, transactionIndex, event, registrationDate, companyName, certifiedBusiness, registrationNumber, detailedInfo) {
  return { blockNumber, transactionIndex, event, registrationDate, companyName, certifiedBusiness, registrationNumber, detailedInfo };
}
class History extends React.Component {
  state = { events: null };
componentDidMount() {
    const { drizzle } = this.props;
    const web3 = drizzle.web3;
    const contract = drizzle.contracts.CertificationInfo;
    const contractWeb3 = new web3.eth.Contract(contract.abi, contract.address);
    contractWeb3.getPastEvents("RegisterCertificationInfo", {fromBlock: 1, toBlock: 'latest'})
      .then(events => {this.setState({ events })});
  }
  render() {
    const { classes } = this.props;
    const events = this.state.events;
    const rows = [];
    if (events) {
      events.forEach(event => {
        rows.push(
          createData(
            event.blockNumber,
            event.transactionIndex,
            event.event,
            event.returnValues.registrationDate,
            event.returnValues.companyName,
            event.returnValues.certifiedBusiness,
            event.returnValues.registrationNumber,
            event.returnValues.detailedInfo
          )
        );
      });
    }
return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead color="default">
            <TableRow>
              <StyleTableCell>ブロック番号</StyleTableCell>
              <StyleTableCell>TxIndex</StyleTableCell>
              <StyleTableCell>イベント名</StyleTableCell>
              <StyleTableCell>登録日付</StyleTableCell>
              <StyleTableCell>企業名</StyleTableCell>
              <StyleTableCell>認定事業者</StyleTableCell>
              <StyleTableCell>登録番号</StyleTableCell>
              <StyleTableCell>詳細情報</StyleTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.blockNumber}>
              <TableCell component="th" scope="row">
                {row.blockNumber}
              </TableCell>
              <TableCell>{row.transactionIndex}</TableCell>
              <TableCell>{row.event}</TableCell>
              <TableCell>{row.registrationDate}</TableCell>
              <TableCell>{row.companyName}</TableCell>
              <TableCell>{row.certifiedBusiness}</TableCell>
              <TableCell>{row.registrationNumber}</TableCell>
              <TableCell>{row.detailedInfo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default withStyles(styles)(History);