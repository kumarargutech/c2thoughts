import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  textDecoration: {
    textDecoration: 'none'
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(firstName, lastName, dob, hccid, ssn, hic, mbi) {
  return { firstName, lastName, dob, hccid, ssn, hic, mbi };
}

const rows = [
  createData('Surya', 'Raj', '21/05/1990', 'HCCID1', 'SSN1', 'HIC1', 'MBI1'),
  createData('Surya', 'Raj', '22/05/1990', 'HCCID2', 'SSN2', 'HIC2', 'MBI2'),
  createData('Surya', 'Raj', '23/05/1990', 'HCCID3', 'SSN3', 'HIC3', 'MBI3'),
  createData('Surya', 'Raj', '24/05/1990', 'HCCID4', 'SSN4', 'HIC4', 'MBI4'),
  createData('Surya', 'Raj', '25/05/1990', 'HCCID5', 'SSN5', 'HIC5', 'MBI5'),
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 900,
  },
  dataRow: {
    cursor: 'pointer'
  },
  textDecoration: {
    textDecoration: 'none'
  }
}));

export default function TableDataComponent(props) {
  const classes = useStyles();

  let { suggestionData, tableStatus } = props;
  let [redirect, setRedirect] = React.useState(false);

  const handleOnClick = () => {
      setRedirect(true);
  }

  if (redirect) {
    return <Redirect push to="/comingsoon" />;
  } else {
    return (
      <>
          {tableStatus  && <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>First Name</StyledTableCell>
                  <StyledTableCell align="left">Last Name</StyledTableCell>
                  <StyledTableCell align="left">DOB</StyledTableCell>
                  <StyledTableCell align="left">HCCID</StyledTableCell>
                  <StyledTableCell align="left">SSN</StyledTableCell>
                  <StyledTableCell align="left">HIC</StyledTableCell>
                  <StyledTableCell align="left">MBI</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suggestionData.map(row => (
                  <StyledTableRow key={row.id} onClick={handleOnClick} className={classes.dataRow}>
                    <StyledTableCell component="th" scope="row">
                      {row.firstName}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.lastName}</StyledTableCell>
                    <StyledTableCell align="left">{row.dob}</StyledTableCell>
                    <StyledTableCell align="left">{row.hccid}</StyledTableCell>
                    <StyledTableCell align="left">{row.ssn}</StyledTableCell>
                    <StyledTableCell align="left">{row.hic}</StyledTableCell>
                    <StyledTableCell align="left">{row.mbi}</StyledTableCell>
                    <StyledTableCell align="left">
                    <Link to="/createsr" className={classes.textDecoration}><Button color="primary">{"Create SR"}</Button></Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Paper> }
      </>
    );
  }
}
