import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import groupBy from 'lodash/groupBy'
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
import TransactionTable from './TransactionTable'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse'
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
  },
  'section-toggler': {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  icon: {
    marginRight: theme.spacing(1)
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

const TransactionList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const transactions = useSelector((state) => state.transactions.filter((t) => !t.isComplete))
  const completedTransactions = useSelector((state) => state.transactions.filter((t) => t.isComplete))

  const [selected, setSelected] = useState([])
  const [showCompleted, setShowCompleted] = useState(false)

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

  const handleShowCompletedSection = () => {
    setShowCompleted(!showCompleted)
  }

  const isAllSelected = () => {
    return xor(selected, transactions.map(t => t._id)).length === 0
  }

  const handleMerge = () => {
    // ?????? selected ????????????
    const selectedTransactions = transactions.filter((transaction) => {
      return selected.includes(transaction._id)
    })

    const groupedByCode = groupBy(selectedTransactions, (t) => t.code)

    if (Object.keys(groupedByCode).length > 1) {
      // ???????????????????????????
      toast.error('????????????????????????...', {
        position: toast.POSITION.TOP_RIGHT
      })
      setSelected([])
      return
    }

    const { b: buyGroup , s: sellGroup } = groupBy(selectedTransactions, (t) => t.type)
    const buyAmount = buyGroup.reduce((amount, curr) => {
      return amount + curr.amount
    }, 0)

    const sellAmount = sellGroup.reduce((amount, curr) => {
      return amount + curr.amount
    }, 0)

    if (buyAmount !== sellAmount) {
      // ????????????????????????
      toast.error('???????????????/?????????????????????????????????...', {
        position: toast.POSITION.TOP_RIGHT
      })
      setSelected([])
      return
    }

    dispatch(addMerger(selected))
    setSelected([])
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
        <h2>??????????????????????????????????????????...????</h2>
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
        <TableCell>??????/??????</TableCell>
        <TableCell>????????????</TableCell>
        <TableCell>??????</TableCell>
        <TableCell>??????</TableCell>
        <TableCell>?????????</TableCell>
        <TableCell>????????????</TableCell>
        <TableCell>??????</TableCell>
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
      <Button
        variant='contained'
        size="medium"
        color="primary"
        fullWidth
        className={classes.margin}
        onClick={handleMerge}
        disabled={selected.length <= 1}
      >
        ??????
      </Button>
      <div onClick={handleShowCompletedSection} className={classes['section-toggler']}>
        { showCompleted ? <KeyboardArrowUpIcon className={classes.icon} /> : <KeyboardArrowRightIcon className={classes.icon} /> }
        { showCompleted ? '?????????????????????' : '?????????????????????' }
      </div>
      <Collapse in={showCompleted}>
        <TransactionTable transactions={ completedTransactions } />
      </Collapse>
    </React.Fragment>
  );
}

export default TransactionList;
