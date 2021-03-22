import React from 'react';
import dayjs from 'dayjs'
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

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

const TransactionTable = (props) => {
  return (
    <ThemeProvider theme={tableTheme}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>买入/卖出</TableCell>
                <TableCell>股票代码</TableCell>
                <TableCell>价格</TableCell>
                <TableCell>数量</TableCell>
                <TableCell>总金额</TableCell>
                <TableCell>成交时间</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TransitionGroup component={ React.Fragment }>
                {props.transactions.map((t) => (
                  <CSSTransition
                    key={t._id}
                    timeout={500}
                    classNames='item'
                  >
                    <TransactionItem
                      key={t._id}
                      transaction={t}
                    />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
  );
}

const TransactionItem = (props) => {
  const { type, code, price, amount, date } = props.transaction
  return (
    <TableRow>
      <TableCell>
        {type === 'b' ? <CallMadeIcon style={{ color: green[500] }} /> : <CallReceivedIcon style={{ color: red[500] }} />}
      </TableCell>
      <TableCell>{code}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{ price * amount }</TableCell>
      <TableCell>{dayjs(date).format('YYYY-MM-DD')}</TableCell>
    </TableRow>
  )
}

export default TransactionTable;
