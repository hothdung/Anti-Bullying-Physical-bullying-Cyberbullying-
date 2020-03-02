import React from 'react'
import StudentData from './data/schoolClass.json'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

function StudentsSidebar(props) {

    return (
        <div className="studentsSidebar">
            <List disablePadding dense>
                {StudentData.map((student) => (
                    <ListItem key={student.id} button style={{ backgroundColor: student.color, borderRadius:4,marginTop:2}}>
                        <ListItemText>{student.label}</ListItemText>
                    </ListItem>
                )
                )}
            </List>
        </div>
    )
}

export default StudentsSidebar;