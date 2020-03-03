import React from 'react'
import StudentData from './data/schoolClass.json'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

function StudentsSidebar(props) {

    return (
        <div className="studentsSidebar">
            <List disablePadding dense>
                {StudentData.map((student, index) => {
                    if (index == 0) { return <h1>Class {student.studentsClassname}</h1> }
                    else {
                        return <ListItem key={student.id} button style={{ backgroundColor: getColor(student.alert), borderRadius: 4, marginTop: 2}}>
                            <ListItemText>{student.label}</ListItemText>
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
    for (var i=1 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

function getMin(arr, prop) {
    var min;
    for (var i=1 ; i<arr.length ; i++) {
        if (min == null || parseInt(arr[i][prop]) < parseInt(min[prop]))
            min = arr[i];
    }
    return min;
}

function getColor(props) {
    var max = getMax(StudentData, "alert")
    console.log(max)
    var min = getMin(StudentData, "alert")
    console.log(min)
    var grad = ((props/(max.alert-min.alert))*120).toString(10)  

    return ["hsl(",grad,",100%,50%)"].join("");
}

export default StudentsSidebar;