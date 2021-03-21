import React from 'react';
import dayjs from 'dayjs'

import { TableRow, TableCell } from '@material-ui/core'

const MergerItem = (props) => {
  const { date, profit, transactionIds, duration } = props.merger

  return (
    <TableRow>
      <TableCell>{dayjs(date).format('YYYY-MM-DD')}</TableCell>
      <TableCell>{`¥${profit}`}</TableCell>
      <TableCell>{duration || 0}</TableCell>
      <TableCell>{ `${transactionIds.length}笔` }</TableCell>
    </TableRow>
  );
}

export default MergerItem;
