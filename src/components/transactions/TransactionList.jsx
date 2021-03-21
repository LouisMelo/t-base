import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TransactionItem from './TransactionItem';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import xor from 'lodash/xor'
import { getTransactions } from '../../store/actions/transactionActions'
import { addMerger } from '../../store/actions/mergerActions'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'

import { makeStyles } from '@material-ui/core/styles';
import './style.css'

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(2)
  }
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

const TransactionList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const transactions = useSelector((state) => state.transactions, (left, right) => left === right)

  const [selected, setSelected] = useState([])

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(tid => tid !== id))
    } else {
      setSelected(selected.concat([id]))
    }
  }

  const handleSelectAll = () => {
    if (selected.length === transactions.length) {
      setSelected([])
    } else {
      setSelected(transactions.map(t => t._id))
    }
  }

  const isAllSelected = () => {
    return xor(selected, transactions.map(t => t._id)).length === 0
  }

  const handleMerge = () => {
    dispatch(addMerger(selected))
  }

  useEffect(() => {
    dispatch(getTransactions())
  }, [dispatch])

  if (!auth._id) {
    return <Redirect to='/login' />
  }

  if (!transactions.length) {
    return (
      <Paper className={classes.padding}>
        <h2>暂无未合并的成交记录，请添加...🙋</h2>
      </Paper>
    )
  }

  const tableHead = (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            checked={isAllSelected()}
            onChange={handleSelectAll}
            color='primary'
          />
        </TableCell>
        <TableCell>买入/卖出</TableCell>
        <TableCell>股票代码</TableCell>
        <TableCell>价格</TableCell>
        <TableCell>数量</TableCell>
        <TableCell>总金额</TableCell>
        <TableCell>成交时间</TableCell>
        <TableCell>删除</TableCell>
      </TableRow>
    </TableHead>
  )

  return (
    <React.Fragment>
      <ThemeProvider theme={tableTheme}>
        <TableContainer component={Paper}>
          <Table>
            { tableHead }
            <TableBody>
              <TransitionGroup component={ React.Fragment }>
                {transactions.map((t) => (
                  <CSSTransition
                    key={t._id}
                    timeout={500}
                    classNames='item'
                  >
                    <TransactionItem
                      key={t._id}
                      transaction={t}
                      selectedIds={selected}
                      handleSelect={handleSelect}
                    />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
      { selected.length > 0 &&
        <Button
          variant='contained'
          size="medium"
          color="primary"
          fullWidth
          className={classes.margin}
          onClick={handleMerge}
        >
          合并
        </Button>
      }
    </React.Fragment>
  );
}

export default TransactionList;
