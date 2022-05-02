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
function createData(registrationDate, companyName, certifiedBusiness, registrationNumber, detailedInfo) {
  return { registrationDate, companyName, certifiedBusiness, registrationNumber, detailedInfo };
;}
class Home extends React.Component {
  state = { dataKey: null };
  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.CertificationInfo;
    const dataKey = contract.methods.getAllCertificationInfos.cacheCall();
    this.setState({ dataKey });
  }
  render() {
    const { classes } = this.props;
    const { CertificationInfo } = this.props.drizzleState.contracts;
    const certificationInfos = CertificationInfo.getAllCertificationInfos[this.state.dataKey];
const rows = [];
    if (certificationInfos) {
      certificationInfos.value[0].forEach(function(name, index) {
        rows.push(
          createData(
            certificationInfos.value[0][index],
            certificationInfos.value[1][index],
            certificationInfos.value[2][index],
            certificationInfos.value[3][index],
            certificationInfos.value[4][index]
          )
        );
      });
    }
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead color="default">
            <TableRow>
              <StyleTableCell>登録日付</StyleTableCell>
              <StyleTableCell>企業名</StyleTableCell>
              <StyleTableCell>認定事業者</StyleTableCell>
              <StyleTableCell>登録番号</StyleTableCell>
              <StyleTableCell>詳細情報</StyleTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.registrationDate}>
              <TableCell component="th" scope="row">
                {row.registrationDate}
              </TableCell>
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
export default withStyles(styles)(Home);