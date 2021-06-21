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

import BookDataService from '../services/book.service'


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
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'publisher', numeric: false, disablePadding: false, label: 'Publisher' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
  { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
  { id: 'stock', numeric: true, disablePadding: false, label: 'Stock' },
  { id: 'discount', numeric: true, disablePadding: false, label: 'Discount' },
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
            Books
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

export default function Books() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('title');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [add, setAdd] = React.useState(false);
  const [display, setDisplay] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const [selectedBookID, setSelectedBookID] = React.useState(0);

  const [sTitle, setSTitle] = React.useState('');
  const [sSynopsis, setSSynopsis] = React.useState('');
  const [sPublisher, setSPublisher] = React.useState('');
  const [sCategory, setSCategory] = React.useState('');
  const [sPrice, setSPrice] = React.useState('');
  const [sStock, setSStock] = React.useState(0);
  const [sDiscount, setSDiscount] = React.useState(0.0);
  const [sSubstatus, setSSubstatus] = React.useState(0);


  useEffect(() => {
    getAllBooks()
  }, []);

  const getAllBooks = () => {
    BookDataService.getAll()
    .then((response) => {
      setRows(response.data)
      console.log("getBooks")
    }, (error) => {
      console.log(error);
    });
  };

  const getBook = (id) => {
    BookDataService.get(id)
    .then((response) => {
      setSTitle(response.data.title)
      setSSynopsis(response.data.synopsis)
      setSPublisher(response.data.publisher)
      setSCategory(response.data.category)
      setSPrice(response.data.price)
      setSStock(response.data.stock)
      setSDiscount(response.data.discount)
      setSSubstatus(response.data.sub_status)

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
        title: sTitle,
        synopsis: sSynopsis,
        publisher: sPublisher,
        category: sCategory,
        price: sPrice,
        stock: sStock,
        discount: sDiscount,
        sub_status: sSubstatus
    }

    console.log(data)

    BookDataService.create(data)
    .then((response) => {
      setAdd(false);
      getAllBooks()
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
      title: sTitle,
      synopsis: sSynopsis,
      publisher: sPublisher,
      category: sCategory,
      price: sPrice,
      stock: sStock,
      discount: sDiscount,
      sub_status: sSubstatus
    }

    BookDataService.update(selectedBookID, data)
    .then((response) => {
      setDisplay(false)
      getAllBooks()
      console.log(response.data)
    }, (error) => {
      console.log(error);
    });
  };

  const handleDisplayDeleteClose = () => {
    BookDataService.delete(selectedBookID)
    .then((response) => {
      setDisplay(false);
      getAllBooks()
      console.log(response.data);
    }, (error) => {
      console.log(error);
    });
  };


  const onTextFieldChange = (event, value) => {
    console.log(event.target.id)
    console.log(event.target.value)

    if (event.target.id === 'title')
      setSTitle(event.target.value) 
    else if (event.target.id === 'synopsis')
    setSSynopsis(event.target.value)
    else if (event.target.id === 'publisher')
    setSPublisher(event.target.value)
    else if (event.target.id === 'category')
    setSCategory(event.target.value)
    else if (event.target.id === 'price')
    setSPrice(event.target.value)
    else if (event.target.id === 'stock')
    setSStock(event.target.value)
    else if (event.target.id === 'discount')
    setSDiscount(event.target.value)
    else 
      setSSubstatus(event.target.value)
    
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
    setSelectedBookID(id);
    getBook(id);
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
                        {row.title}
                      </TableCell>
                      <TableCell align="left">{row.publisher}</TableCell>
                      <TableCell align="left">{row.category}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="right">{row.stock}</TableCell>
                      <TableCell align="right">{row.discount}</TableCell>
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
        <DialogTitle id="form-dialog-title">Add new Book</DialogTitle>
        <DialogContent>
          <TextField id="title" label="Title" type="text" onChange={onTextFieldChange} fullWidth/>
          <TextField id="synopsis" label="Synopsis" type="text" onChange={onTextFieldChange} fullWidth multiline rowsMax={4}/>
          <TextField id="publisher" label="Publisher" type="text" onChange={onTextFieldChange} fullWidth/>
          <TextField id="category" label="Category" type="text" onChange={onTextFieldChange} fullWidth/>
          <TextField id="price" label="Price" type="text"  onChange={onTextFieldChange} fullWidth/>
          <TextField id="stock" label="Stock" type="number" onChange={onTextFieldChange} fullWidth InputProps={{ inputProps: { min: 0, max: 1000 } }}/>
          <TextField id="discount" label="Discount" type="number" onChange={onTextFieldChange} fullWidth InputProps={{ inputProps: { min: 0.0, max: 1.0 } }}/>
          <TextField id="sub_status" label="Subscription" select value={sSubstatus} onChange={onTextFieldChange} fullWidth>
            <MenuItem id="sub_status" key='No' value={0}>
              No
            </MenuItem>
            <MenuItem id="sub_status" key='Yes' value={1}>
              Yes
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
        <DialogTitle id="form-dialog-title">Book Details</DialogTitle>
        <DialogContent>
          <TextField id="title" label="Title" type="text" value={sTitle} onChange={onTextFieldChange} fullWidth/>
          <TextField id="synopsis" label="Synopsis" type="text" value={sSynopsis} onChange={onTextFieldChange} fullWidth multiline rowsMax={4}/>
          <TextField id="publisher" label="Publisher" type="text" value={sPublisher} onChange={onTextFieldChange} fullWidth/>
          <TextField id="category" label="Category" type="text" value={sCategory} onChange={onTextFieldChange} fullWidth/>
          <TextField id="price" label="Price" type="text" value={sPrice} onChange={onTextFieldChange} fullWidth/>
          <TextField id="stock" label="Stock" type="number" value={sStock} onChange={onTextFieldChange} fullWidth InputProps={{ inputProps: { min: 0, max: 1000 } }}/>
          <TextField id="discount" label="Discount" type="number" value={sDiscount} onChange={onTextFieldChange} fullWidth InputProps={{ inputProps: { min: 0.0, max: 1.0 } }}/>
          <TextField id="sub_status" label="Subscription" select value={sSubstatus} onChange={onTextFieldChange} fullWidth>
          <MenuItem id="sub_status" key='No' value={0}>
              No
            </MenuItem>
            <MenuItem id="sub_status" key='Yes' value={1}>
              Yes
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
