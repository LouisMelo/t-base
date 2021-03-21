import React, { useState } from 'react';
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

import { makeStyles } from '@material-ui/core/styles';

function createData(_id, type, code, price, amount, date) {
  return { _id, type, code, price, amount, date }
}

const transactions = [
  createData('1', 'b', '601166', 25.3, 3000, '今天'),
  createData('2', 's', '601166', 25.3, 3000, '昨天'),
  createData('3', 'b', '601166', 25.3, 3000, '昨天'),
  createData('4', 'b', '601166', 25.3, 3000, '昨天'),
  createData('5', 's', '601166', 25.3, 3000, '前天'),
  createData('6', 's', '601166', 25.3, 3000, '前天'),
]

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

const TransactionList = () => {
  const classes = useStyles()

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
        <TableCell>时间</TableCell>
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
              {transactions.map((t) => (
                <TransactionItem
                  key={t._id}
                  transaction={t}
                  selectedIds={selected}
                  handleSelect={handleSelect}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
      { selected.length > 0 &&
        <Button variant='contained' size="medium" color="primary" fullWidth className={classes.margin}>
          合并
        </Button>
      }
    </React.Fragment>
  );
}

export default TransactionList;
