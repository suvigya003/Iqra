import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Grid,
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  MenuItem,
  OutlinedInput,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import TextField from '@mui/material/TextField';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user';
// mock
import USERLIST from '../../../_mock/user';
// import { sub } from 'date-fns';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  //   { id: 'SNo', label: 'S No', alignRight: false },
  { id: 'courseName', label: 'Course Name', alignRight: false },
  { id: 'courseImage', label: 'Course Image', alignRight: false },
  { id: 'subjects', label: 'Subjects', alignRight: false },
  { id: 'courseDuration', label: 'Course Duration', alignRight: false },
  { id: 'courseName', label: 'Level', alignRight: false },
  { id: 'courseName', label: 'Medium', alignRight: false },
  { id: 'courseName', label: 'Heading', alignRight: false },
  { id: 'courseName', label: 'Description', alignRight: false },
  { id: 'courseName', label: 'Lessons', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const subjectsArray = [
  'History',
  'Political Science',
  'Geography',
  'Economics',
  'Mathematics',
  'Public Administration',
  'Ethics',
  'Chemistry',
  'Sociology',
];

export default function AddCourse() {
  const [fAQquestions, setFAQquestions] = useState([]);
  const [fAQanswers, setFAQanswers] = useState([]);
  const [courseTableData, setCourseTableData] = useState();
  const [course, setCourse] = useState({
    courseName: '',
    price: '',
    subjectName: '',
    heading:'',
    description:'',
    lessons:'',
    courseDuration:'',
    // FAQ: '',
  });


  const [image, setImage] = useState();

  const handleImageFile = (e) => {
    setImage(e.target.files[0], '$$$$');
    console.log(image);
  };

  const [subjectName, setSubjectName] = React.useState([]);
// for checklist dropdown
  const handleSubjectChange = (event) => {
    console.log("in the subjectChange handler");
    const {
      target: { value },
    } = event;
    setSubjectName(typeof value === 'string' ? value.split(',') : value);
    console.log(subjectName);
    console.log("done with it");
  };
  console.log("not inside subject CHnage it");

  const handleLevelChange = (event) => {
    setCourse({
      ...course,
      level: event.target.value,
    });
    console.log(course);
  };

  const handleMediumChange = (event) => {
    setCourse({
      ...course,
      medium: event.target.value,
    });
    console.log(course);
  };

  const handleChange = ({ currentTarget: input }) => {
    setCourse({
      ...course,
      [input.name]: input.value,
    });
    console.log(course);
  };

  const handleChangeFAQ = (i, e) => {
    const newFAQquestions = [...fAQquestions];
    newFAQquestions[i][e.target.name] = e.target.value;
    setFAQquestions(newFAQquestions);
    const newFAQanswers = [...fAQanswers];
    newFAQanswers[i][e.target.name] = e.target.value;
    setFAQanswers(newFAQanswers);
  };

  const addFAQ = () => {
    setFAQquestions([...fAQquestions, { question: '', }]);
    setFAQanswers([...fAQanswers, { answer:'' }]);
  };

  const removeFAQ = (i) => {
    const newFAQquestions = [...fAQquestions];
    newFAQquestions.splice(i, 1);
    setFAQquestions(newFAQquestions);
    const newFAQanswers = [...fAQanswers];
    newFAQanswers.splice(i, 1);
    setFAQanswers(newFAQanswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(course);
      const formData = new FormData();
      formData.append('image', image);
      formData.append('courseName', course.courseName);
      formData.append('price', course.price);
      formData.append('subjectName', course.subjectName);
      formData.append('heading', course.heading);
      formData.append('description', course.description);
      formData.append('lessons', course.lessons);
      formData.append('level', course.level);
      formData.append('medium', course.medium);
      formData.append('courseDuration', course.courseDuration);
      console.log('formData', formData);
      await axios
        .post("https://iqra.onrender.com/api/ias/addAddCourse", formData)
        // .post("http://localhost:8000/api/ias/addAddCourse", formData) 
        .then((res) => {
          console.log(res); 
        })
        .catch((err) => {
          console.log(err);
        });
      // setSubjectName(subjectName);
      alert("Course added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFAQSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(fAQquestions);
      console.log(fAQanswers);
     const register= await axios
        .post("https://iqra.onrender.com/api/ias/addFaq", fAQquestions) 
        // .post("http://localhost:8000/api/ias/addFaq", fAQquestions) 
        .then((res) => {
          console.log(res); 
        })
        .catch((err) => {
          console.log(err);
        });
      //  ( register?console.log("yes"):console.log("no"));
      console.log(register)
        setFAQquestions({
          question:'',
          answer:''
        })
        // setFAQanswers({
        //   answer:'',
        // })
      alert("FAQ submitted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { 
    console.log(course);
    const courseData= async()=>{ 
      const {data}=await axios.get("https://iqra.onrender.com/api/ias/getAddCourse"); 
      console.log(data); 
      setCourseTableData(data);   
      console.log(courseTableData); 
    }
    courseData(); // then we are calling it here to get executed
  }, [])
  console.log(courseTableData); 


  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const subject = ['History', 'Political Science', 'Economics'];

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  if(!courseTableData){
    return(<>
    loading
    </>)
  }

  return (
    <Page title="User">
      <Container>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack> */}
        <form
        onSubmit={handleSubmit}
        >
          <Box mb={7}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Course Name"
                    variant="outlined"
                    fullWidth
                    // sx={{ mr: { md: 1 } }}
                    type="text"
                    name="courseName"
                    value={course.courseName}
                    onChange={handleChange}
                  />
                </Grid>
                    <Grid item xs={12} md={6}>
                    <Button variant="outlined" fullWidth component="label" sx={{ pt: 1.8, pb: 1.8,  }}
                    value = {image}
                    onChange = {(e) => handleImageFile(e)}
                    >
                Upload Course Image
                <input
                  hidden
                  // accept="image/*"
                  type="file"
                />
              </Button>
                    </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">Subjects</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={subjectName}
                      onChange={handleSubjectChange}
                      input={<OutlinedInput label="Subjects" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {subjectsArray.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={subjectName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Course Duration"
                    variant="outlined"
                    fullWidth
                    // sx={{ mr: { md: 1 } }}
                    type="number"
                    name="courseDuration"
                    value={course.courseDuration}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Level</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={course.level}
                    label="Level"
                    onChange={handleLevelChange}
                  >
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Advance">Advance</MenuItem>
                  </Select>
                </FormControl>
              </Grid><Grid item xs={12} md={6}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Medium</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={course.medium}
                    label="Medium"
                    onChange={handleMediumChange}
                  >
                    <MenuItem value="Hindi">Hindi</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    // sx={{ mr: { md: 1 } }}
                    type="number"
                    name="price"
                    value={course.price}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                <Typography variant="h6">Overview</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Heading"
                    variant="outlined"
                    fullWidth
                    // sx={{ mr: { md: 1 } }}
                    type="text"
                    name="heading"
                    value={course.heading}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    // sx={{ mr: { md: 1 } }}
                    type="text"
                    name="description"
                    value={course.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Lessons"
                    variant="outlined"
                    fullWidth
                    // sx={{ mr: { md: 1 } }}
                    type="text"
                    name="lessons"
                    value={course.lessons}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <TextField
                  label="FAQ"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="text"
                  name="FAQ"
                  value={course.FAQ}
                  onChange={handleChange}
                />
              </Grid> */}
              <Box>
                {/* <form onSubmit={handleFAQSubmit}> */}
                  <Box mt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        {fAQquestions.map((element, index) => (
                          <>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={6}>
                                {index ? (
                                  <TextField
                                    label={`Question ${index + 1}`}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: { md: 3 } }}
                                    type="text"
                                    name="question"
                                    value={element.question || ''}
                                    onChange={(e) => handleChangeFAQ(index, e)}
                                    //   sx={{
                                    //     mr:'2vw'
                                    //   }}
                                  />
                                ) : (
                                  <TextField
                                    label={`Question ${index + 1}`}
                                    variant="outlined"
                                    fullWidth
                                    // sx={{ mb: { md: -3 } }}
                                    type="text"
                                    name="question"
                                    value={element.question || ''}
                                    onChange={(e) => handleChangeFAQ(index, e)}
                                    //   sx={{
                                    //     mr:'2vw'
                                    //   }}
                                  />
                                )}
                              </Grid>

                              {index ? (
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    label={`Answer ${index + 1}`}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: { md: 3 } }}
                                    type="text"
                                    name="answer"
                                    value={element.answer || ''}
                                    onChange={(e) => handleChangeFAQ(index, e)}
                                    // sx={{
                                    //   mr:'2vw'
                                    // }}
                                  />
                                </Grid>
                              ) : (
                                <Grid item xs={12} md={6}>
                                  <TextField
                                    label={`Answer ${index + 1}`}
                                    variant="outlined"
                                    fullWidth
                                    //   sx={{ mt: { md: 3 } }}
                                    //   sx={{ ml: { md: 2 } }}
                                    type="text"
                                    name="answer"
                                    value={element.answer || ''}
                                    onChange={(e) => handleChangeFAQ(index, e)}
                                    // sx={{
                                    //   mr:'2vw'
                                    // }}
                                  />
                                </Grid>
                              )}

                              <Grid item xs={2} md={2}>
                                {index ? (
                                  <Box sx={{ mt: { md: 4 } }}>
                                    <Button
                                      sx={{ p: '6px 16px', maxHeight: '36px' }}
                                      color="error"
                                      variant="contained"
                                      onClick={() => removeFAQ(index)}
                                    >
                                      Delete
                                    </Button>
                                  </Box>
                                ) : null}
                              </Grid>
                            </Grid>
                            {/* <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item xs={12} md={6}>
                        <TextField
                          label={`Question ${index + 1}`}
                          variant="outlined"
                          fullWidth
                        //   sx={{ mr: { md: 3 } }}
                          type="text"
                          name="statement"
                          value={element.statement || ''}
                          onChange={(e) => handleChangeFAQ(index, e)}
                        //   sx={{
                        //     mr:'2vw'
                        //   }}
                        />
                        </Grid>
                        <Grid item xs={12} md={5}>
                        <TextField
                          label={`Answer ${index + 1}`}
                          variant="outlined"
                          fullWidth
                          sx={{ ml: { md: 2 } }}
                          type="text"
                          name="statement"
                          value={element.statement || ''}
                          onChange={(e) => handleChangeFAQ(index, e)}
                          // sx={{
                          //   mr:'2vw'
                          // }}
                        />
                        </Grid>
                        {index ? (
                          
                          <Button
                            sx={{ ml: '2vw', p: '6px 16px', maxHeight: '36px' }}
                            color="error"
                            variant="contained"
                            onClick={() => removeFAQ(index)}
                          >
                            Delete
                          </Button>
                        ) : 
                        null}
                      </Box> */}
                          </>
                        ))}
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Button
                          variant="outlined"
                          fullWidth
                          component="label"
                          style={{ height: '54px' }}
                          onClick={() => addFAQ()}
                        >
                          Add FAQ
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Button
                          variant="outlined"
                          // type="submit"
                          fullWidth
                          onClick={handleFAQSubmit}
                          // component="label"
                          style={{ height: '54px' }}
                        >
                          Submit FAQ
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>

                 
                {/* </form> */}
              </Box>

              <Box mt={3}>
                <Button variant="contained" type="submit" mt={3}>
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
        <Box>
          <Typography variant="h6">All Courses</Typography>
        </Box>

        <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={USERLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {courseTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id, courseName, image,  subjectName,courseDuration,level,medium,heading,description,lessons, price } = row;
                  const isItemSelected = selected.indexOf(courseName) !== -1;

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell align="left">{courseName}</TableCell>
                      <TableCell align="left"><img src={image} alt="courseImage" height={50}/></TableCell>
                      <TableCell align="left">
                        {subject.map((sub) => {
                          return (
                            <>
                              <Label variant="ghost" color={'primary'}>
                                {sub}
                              </Label>{' '}
                              &nbsp;
                            </>
                          );
                        })}
                        
                      </TableCell>
                      <TableCell align="left">{courseDuration}</TableCell>
                      <TableCell align="left">{level}</TableCell>
                      <TableCell align="left">{medium}</TableCell>
                      <TableCell align="left">{heading}</TableCell>
                      <TableCell align="left">{description}</TableCell>
                      <TableCell align="left">{lessons}</TableCell>
                      <TableCell align="left">{price}</TableCell>

                      <TableCell align="right">
                        <UserMoreMenu />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={USERLIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Page>
  );
}
