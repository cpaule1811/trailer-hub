import { Tab, Tabs } from "@mui/material"
import { useState } from "react"

export default function ProfilePage () { 
    const [current, setCurrent] = useState(1)
    return ( 
        <Tabs value={current} indicatorColor="secondary" centered sx={{ mt: 5, mb:5 }}>
            <Tab label="List"></Tab>
            <Tab label="Profile"></Tab>
        </Tabs>
    )
}