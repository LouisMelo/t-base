import React, { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Paper, Table, TableBody, TableHead, TableCell, TableRow, TableContainer } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import MergerItem from './MergerItem'
import round from 'lodash/round'

import { getMergers } from '../../store/actions/mergerActions'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(2),
  },
  empty: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  },
  sum: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'end'
  }
}));

const tableTheme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        textAlign: 'center',
        whiteSpace: 'nowrap'
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

  if (!mergers.length) {
    return (
      <Paper className={classes.empty}>
        <h2>做T尚未成功，同志仍需努力...💪</h2>
      </Paper>
    )
  }

  const sumOfProfit = round(mergers.reduce((sum, curr) => sum + curr.profit, 0), 2)

  return (
    <React.Fragment>
      <ThemeProvider theme={tableTheme}>
        <TableContainer component={Paper} className={classes.margin}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>合并时间</TableCell>
                <TableCell>估算收益</TableCell>
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
      <Paper className={classes.sum}>
        {`历史收益：¥${sumOfProfit}`}
      </Paper>
    </React.Fragment>
  );
}

export default Mergers;
