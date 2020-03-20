import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

const columns = [
    {
        id: 'name',
        label: 'Intervention type',
        minWidth: 100
    },
    {
        id: 'code',
        label: 'Place',
        minWidth: 100,

    },
    {
        id: 'students',
        label: 'Involved Students',
        minWidth: 100,

    },
    {
        id: 'date',
        label: 'Date',
        minWidth: 100,

    },
    {
        id: 'time',
        label: 'Time',
        minWidth: 100,

    },
    {
        id: 'severity',
        label: 'Severity',
        minWidth: 100,

    },
    {
        id: 'teacher',
        label: 'Teacher(s)',


    }
];


function createData(name, code, students, date, time, severity, teacher) {

    if (!(date === "")) {
        // date formatter
        let inter_date = new Date(date);
        date = inter_date.toDateString();
    }

    return { name, code, students, date, time, severity, teacher };
}
// call createData method 


// incoming data
var rowsInitial = [
    createData('Intervention', 'Hallway', "Seokwon, Van, Jihwan", '2019-04-09', "1:15 PM", "High", "Son"),
    createData('Consultation', 'Office', "Kiroong, Dung, Adam", '2019-04-15', "2:30 PM", "Medium", "Lee"),
    createData('Consultation', 'Classroom', "Jutta, Mai, Adam", '2019-06-09', "9:15 AM", "Medium", "Baek"),

];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function MethodsTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState(rowsInitial);
    const [editIdx, setEditIdx] = useState(-1);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // adding row 
    const addRow = () => {
        const dataItem = createData("", "", "", "", "", "", "");
        setRows([...rows, dataItem])
    }

    // delete last row
    const deleteRow = () => {
        setRows(rows.slice(0, -1));
    }

    // delete specific row
    const deleteCertainRow = (index) => {

        let items = rows.filter((row, i) => i !== index);
        setRows(items);

    }

    const handleEdit = (i) => {
        console.log(i);
        setEditIdx(i);

    }

    const stopEdit = () => {
        setEditIdx(-1);
    }

    // eventlistener
    const handleChange = (e, name, index) => {
        // get value of textfield
        const { value } = e.target;
        let items = rows.map((row, i) => (i === index ? { ...row, [name]: value } : row));
        setRows(items);
    }

    return (
        <div className="reportingTable">
            <div className="addRow">
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<AddBoxIcon />}
                    id="addBtn"
                    onClick={addRow}>
                    Add Row
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    id="deleteBtn"
                    onClick={deleteRow}
                >
                    Delete
      </Button>
            </div>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell />
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {

                                // current on that index editing on specific row
                                const currentEditing = editIdx === index;
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} id={index}>
                                        {columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {currentEditing ? <TextField name={`field` + index} onChange={e => handleChange(e, value, index)} value={value} /> : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell>
                                            {console.log("Here" + currentEditing)}
                                            {currentEditing ? <DoneIcon onClick={() => stopEdit} /> : <EditIcon onClick={function () { return handleEdit(index) }} />}
                                        </TableCell>
                                        <TableCell><DeleteIcon onClick={function () { return deleteCertainRow(index) }} /></TableCell>
                                    </TableRow>
                                );
                            })}
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
        </div>
    );
}