import React, { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Paper, Table, TableBody, TableHead, TableCell, TableRow, TableContainer } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import MergerItem from './MergerItem'

import { getMergers } from '../../store/actions/mergerActions'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(2),
  },
}));

const tableTheme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        textAlign: 'center'
      }
    }
  }
})

const Mergers = () => {
  const classes = useStyles()

  const auth = useSelector((state) => state.auth)
  const mergers = useSelector((state) => state.mergers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMergers())
  }, [dispatch])

  if (!auth._id) {
    return <Redirect to='/login' />
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={tableTheme}>
        <TableContainer component={Paper} className={classes.margin}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>合并时间</TableCell>
                <TableCell>收益</TableCell>
                <TableCell>买卖周期</TableCell>
                <TableCell>涉及成交</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mergers.map((m) => (
                <MergerItem
                  key={m._id}
                  merger={m}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default Mergers;
