import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

function StudentsSidebar(props) {

    return (
        <div className="studentsSidebar">
            <List disablePadding dense>
                {props.students.map((student) => (
                    <ListItem key={student.id} button style={{ backgroundColor: student.color }}>
                        <ListItemText>{student.label}</ListItemText>
                    </ListItem>
                )
                )}
            </List>
        </div>
    )
}
export default StudentsSidebar;