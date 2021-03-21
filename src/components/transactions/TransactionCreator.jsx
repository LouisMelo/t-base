import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { addTransaction } from '../../store/actions/transactionActions'

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 120,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
}));

const TransactionCreator = () => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [type, setType] = useState('b');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const [total, setTotal] = useState(0)

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeCode = (event) => {
    setCode(event.target.value)
  }

  const handleChangePrice = (event) => {
    const { value } = event.target

    setPrice(value)
  }

  const handleChangeAmount = (event) => {
    const { value } = event.target

    setAmount(value)
  }

  useEffect(() => {
    const a = Number(amount)
    const p = Number(price)

    if (isNaN(a) || isNaN(p)) {
      return
    }

    if (a <= 0 || p <= 0) {
      return
    }

    setTotal(a * p)
  }, [amount, price])

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(addTransaction({
      type,
      code,
      price,
      amount
    }))

    clearData()
  }

  const clearData = () => {
    setType('')
    setCode('')
    setPrice('')
    setAmount('')
    setTotal(0)
  }

  return (
    <Paper className={classes.paper}>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id="transaction-type-select-label">选择买入/卖出</InputLabel>
              <Select
                labelId="transaction-type-select-label"
                id="transaction-type-select"
                value={type}
                onChange={handleChangeType}
              >
                <MenuItem value={'b'}>买入</MenuItem>
                <MenuItem value={'s'}>卖出</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              required
              fullWidth
              id="code"
              label="股票代码"
              name="code"
              value={code}
              onChange={handleChangeCode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="price"
              label="价格"
              id="price"
              value={price}
              onChange={handleChangePrice}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="amount"
              label="数量"
              id="amount"
              value={amount}
              onChange={handleChangeAmount}
            />
          </Grid>
        </Grid>
        <div className={classes.footer}>
          <Typography variant='subtitle2'>
            { `此次**${type === 'b' ? '买入' : '卖出'}**总金额为：¥${total}`}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            确认
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default TransactionCreator;
