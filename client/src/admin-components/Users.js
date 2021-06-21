import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import MenuItem from '@material-ui/core/MenuItem';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';

import UserDataService from '../services/user.service'


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'fullname', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'gender', numeric: false, disablePadding: false, label: 'Gender' },
  { id: 'contactno', numeric: false, disablePadding: false, label: 'ConatctNo' },
  { id: 'email_address', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'shipping_address', numeric: false, disablePadding: false, label: 'Shipping Address' },
  { id: 'access_privileges', numeric: false, disablePadding: false, label: 'Type' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};




const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(10),
  },
}));

export default function Users() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('fullname');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [add, setAdd] = React.useState(false);
  const [display, setDisplay] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const [selectedUserID, setSelectedUserID] = React.useState(0);

  const [sFullname, setSFullname] = React.useState('');
  const [sGender, setSGender] = React.useState('');
  const [sContactno, setSContactno] = React.useState('');
  const [sEmailaddress, setSEmailaddress] = React.useState('');
  const [sPass, setSPass] = React.useState('');
  const [sShippingaddress, setSShippingaddress] = React.useState('');
  const [sAccessprivileges, setSAccessprivileges] = React.useState('');

  useEffect(() => {
    getAllUsers()
  }, []);

  const getAllUsers = () => {
    UserDataService.getAll()
    .then((response) => {
        console.log(response.data)
      setRows(response.data)
    }, (error) => {
      console.log(error);
    });
  }

  const getUser = (id) => {
    UserDataService.get(id)
    .then((response) => {
      setSFullname(response.data.fullname)
      setSGender(response.data.gender)
      setSContactno(response.data.contactno)
      setSEmailaddress(response.data.email_address)
      setSPass(response.data.pass)
      setSShippingaddress(response.data.shipping_address)
      setSAccessprivileges(response.data.access_privileges)

      setDisplay(true)
      console.log(response.data)
    }, (error) => {
      console.log(error);
    });
  };


  const handleClickAddOpen = () => {
    setAdd(true);
  };

  const handleAddClose = () => {
    setAdd(false);
  };

  const handleAddSubmitClose = () => {
    const data = {
        fullname: sFullname,
        gender: sGender,
        contactno: sContactno,
        email_address: sEmailaddress,
        pass: sPass,
        shipping_address: sShippingaddress,
        access_privileges: sAccessprivileges
    }

    console.log(data)

    UserDataService.create(data)
    .then((response) => {
      setAdd(false);
      getAllUsers()
    }, (error) => {
      setAdd(false);
      console.log(error);
    });
  };


  const handleDisplayClose = () => {
    setDisplay(false);
  };

  const handleDisplayUpdateClose = () => {
    const data = {
        fullname: sFullname,
        gender: sGender,
        contactno: sContactno,
        email_address: sEmailaddress,
        pass: sPass,
        shipping_address: sShippingaddress,
        access_privileges: sAccessprivileges
    }

    UserDataService.update(selectedUserID, data)
    .then((response) => {
      setDisplay(false)
      getAllUsers();
      console.log(response.data)
    }, (error) => {
      console.log(error);
    });
  };

  const handleDisplayDeleteClose = () => {
    UserDataService.delete(selectedUserID)
    .then((response) => {
      setDisplay(false);
      getAllUsers()
      console.log(response.data);
    }, (error) => {
      console.log(error);
    });
  };


  const onTextFieldChange = (event, value) => {
    console.log(event.target.id)
    console.log(event.target.value)

    if (event.target.id === 'fullname')
      setSFullname(event.target.value) 
    else if (event.target.id === 'gender')
    setSGender(event.target.value)
    else if (event.target.id === 'contactno')
    setSContactno(event.target.value)
    else if (event.target.id === 'email_address')
    setSEmailaddress(event.target.value)
    else if (event.target.id === 'pass')
    setSPass(event.target.value)
    else if (event.target.id === 'shipping_address')
    setSShippingaddress(event.target.value)
    else 
      setSAccessprivileges(event.target.value)
    
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    /*const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);*/
    setSelectedUserID(id)
    getUser(id);
    console.log(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="books table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                    <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.fullname}
                      </TableCell>
                      <TableCell align="left">{row.gender}</TableCell>
                      <TableCell align="left">{row.contactno}</TableCell>
                      <TableCell align="left">{row.email_address}</TableCell>
                      <TableCell align="left">{row.shipping_address}</TableCell>
                      <TableCell align="left">{row.access_privileges}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickAddOpen}>
        <AddIcon />
        </Fab>

        <Dialog open={add} onClose={handleAddClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new User</DialogTitle>
        <DialogContent>
          <TextField id="fullname" label="Full Name" type="text" onChange={onTextFieldChange} fullWidth/>
          <TextField id="gender" label="Gender (M, F)" type="text" onChange={onTextFieldChange} fullWidth/>
          <TextField id="contactno" label="Conatact No" type="text" onChange={onTextFieldChange} fullWidth/>
          <TextField id="email_address" label="Email Address" type="text" onChange={onTextFieldChange} fullWidth/>
          <TextField id="pass" label="Password" type="text" onChange={onTextFieldChange} fullWidth/>
          <TextField id="shipping_address" label="Shipping Address" type="text" onChange={onTextFieldChange} fullWidth multiline rowsMax={4}/>
          <TextField id="access_privileges" label="Access" select value={sAccessprivileges} onChange={onTextFieldChange} fullWidth>
          <MenuItem id="access_privileges" key='User' value='User'>
              User
            </MenuItem>
            <MenuItem id="access_privileges" key='Admin' value='Admin'>
              Admin
            </MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSubmitClose} color="primary">
              Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={display} onClose={handleDisplayClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">User Details</DialogTitle>
        <DialogContent>
          <TextField id="fullname" label="Full Name" type="text" value={sFullname} onChange={onTextFieldChange} fullWidth/>
          <TextField id="gender" label="Gender (M, F)" type="text" value={sGender} onChange={onTextFieldChange} fullWidth/>
          <TextField id="contactno" label="Conatact No" type="text" value={sContactno} onChange={onTextFieldChange} fullWidth/>
          <TextField id="email_address" label="Email Address" type="text" value={sEmailaddress} onChange={onTextFieldChange} fullWidth/>
          <TextField id="pass" label="Password" type="text" value={sPass} onChange={onTextFieldChange} fullWidth/>
          <TextField id="shipping_address" label="Shipping Address" type="text" value={sShippingaddress} onChange={onTextFieldChange} fullWidth multiline rowsMax={4}/>
          <TextField id="access_privileges" label="Access" select value={sAccessprivileges} onChange={onTextFieldChange} fullWidth>
          <MenuItem id="access_privileges" key='User' value='User'>
              User
            </MenuItem>
            <MenuItem id="access_privileges" key='Admin' value='Admin'>
              Admin
            </MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisplayUpdateClose} color="primary">
            Update
          </Button>
          <Button onClick={handleDisplayDeleteClose} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
