import React,{useState,useEffect} from 'react'
import {Box, Card} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';

import AddCourse from '../sections/@dashboard/courses/AddCourse';
import UploadContent from '../sections/@dashboard/courses/UploadContent';
import LiveClasses from '../sections/@dashboard/courses/LiveClasses';

const Courses = () => {
    const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
    <Card>
        <Box m={3}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Add Course" value="1" />
                <Tab label="Upload Content" value="2" />
                <Tab label="Live Classes" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1"><AddCourse/></TabPanel>
            <TabPanel value="2"><UploadContent/></TabPanel>
            <TabPanel value="3"><LiveClasses/></TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  )
}

export default Courses