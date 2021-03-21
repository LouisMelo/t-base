import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

const TransactionItem = (props) => {
  const { selectedIds, handleSelect } = props
  const { _id, type, code, amount, price, date } = props.transaction

  const handleChange = () => {
    handleSelect(_id)
  }

  return (
    <TableRow style={{ backgroundColor: type === 'b' ? green[50] : red[50] }}>
      <TableCell>
        <Checkbox
          checked={ selectedIds.includes(_id) }
          onChange={handleChange}
          color='primary'
        />
      </TableCell>
      <TableCell>
        {type === 'b' ? <CallMadeIcon style={{ color: green[500] }} /> : <CallReceivedIcon style={{ color: red[500] }} />}
      </TableCell>
      <TableCell>{code}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{ price * amount }</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <IconButton aria-label='delete'>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TransactionItem;
