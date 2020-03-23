import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

function StudentsSidebar(props) {

    props.students.sort((a, b) => b.alert - a.alert);
    return (
        <div className="studentsSidebar">
            <List disablePadding dense>
                {props.students.map((student, index) => {
                    if (index === 0) { return <h2 key={index}>Class {student.studentsClassname}</h2> }
                    else {
                        return <ListItem key={student.id} button style={{ backgroundColor: getColor(student.alert, props.students), borderRadius: 4, marginTop: 2 }}>
                            <ListItemText key={index}>{student.label}</ListItemText>
                        </ListItem>
                    }
                }
                )}
            </List>
        </div >
    )
}

function getMax(arr, prop) {
    var max;
    for (var i = 1; i < arr.length; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

function getMin(arr, prop) {
    var min;
    for (var i = 1; i < arr.length; i++) {
        if (min == null || parseInt(arr[i][prop]) < parseInt(min[prop]))
            min = arr[i];
    }
    return min;
}

function getColor(props, students) {
    var max = getMax(students, "alert")
    console.log(max)
    var min = getMin(students, "alert")
    var grad = ((1 - (props / (max.alert - min.alert))) * 120).toString(10)

    console.log("Value is" + grad);

    return ["hsl(", grad, ",100%,50%)"].join("");
}

export default StudentsSidebar;