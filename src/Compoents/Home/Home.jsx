import React from 'react';
import { FixedSizeList } from 'react-window';
import './Home.css';
import NumberInput from '../NumberInput';
import ideaList from '../../api/ideaApiList';
import DirectionSnackbar from '../../Service/ToastService';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listItem: [],
            showToast: true,
            msg: "",
            showAlert: false,
            currentItem: {},
            openModal: false,
            properties: { header: '' },
            openCollapse: false
        }
    }


    async componentDidMount() {
        this.updateIdeasList(false, '');
    }
    async updateIdeasList(showToast, msg) {
        const res = await ideaList.getIdeaList();
        const listItem = res ? res : [];
        this.setState({ listItem: listItem, showToast: showToast, msg: msg });
    }
    async deleteItem(id) {
        console.log("deleteItem", id);
        await ideaList.deleteIdea(id)
            .then(res => console.log("res", res));
        this.updateIdeasList(true, "Item Deleted");
    }

    async editItem(id) {
        this.setState({ editItem: id })
        console.log("editItem", this.state.currentItem);
        this.setState({ openModal: true });
        await ideaList.updateIdea(id)
            .then(res => console.log("update res", res));
        this.updateIdeasList(true, "Item Updated");
    }

    renderRow(props) {
        const { data, index, style } = props;
        const ideas_list = this.state['listItem'];

        return (
            <ListItem className='borderList' key={index} style={style} >
                <ListItemButton sx={{ width: '50%' }} style={{ color: 'wheat' }}>
                    <ListItemText primary={`${ideas_list[index].content}`} />
                </ListItemButton>
                <Button variant="outlined" size="small" startIcon={<EditIcon />} color="secondary" onClick={() => 
                    this.modalOpen(data[index], { header: "Edit Idea", submitHandler: this.handleEditSubmit.bind(this), msg: "Record Updated Successfully!" })} >Edit</Button>&nbsp;&nbsp;
                <Button variant="outlined" size="small" startIcon={<DeleteIcon />} color="error" onClick={() => this.deleteItem(`${data[index].id}`)}>Delete</Button>
            </ListItem>
        );
    }

    handleClose() {
        this.setState({ showToast: false });
    }

    handleModalClose() {
        this.setState({ openModal: false });
    }

    modalOpen = async (data, properties) => {
        console.log(properties);
        await this.setState({ openModal: true, currentItem: data, properties: properties, msg: properties.msg });

        console.log("editItem", data, ".state.editItem", this.state.currentItem.id)
    }

    updateValue(name, newValue) {
        console.log("name, newValue", name, newValue)
        this.setState({ currentItem: { ...this.state.currentItem, [name]: newValue } })
        console.log("upated", { [name]: newValue })
    }

    collapseModal() {
        setTimeout(() => {
            this.setState({ openModal: false })
        }, 999);
        setTimeout(() => {
            this.setState({ openCollapse: true });
        }, 1500);
        setTimeout(() => {
            this.setState({ openCollapse: false });
        }, 3000);
    }
    handleEditSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        let formObject = Object.fromEntries(formData.entries());
        console.log("edit called")
        ideaList.updateIdea({ ...formObject, id: this.state.currentItem.id })
            .then((response) => {
                const data = response;
                console.log("update response ", data);
                this.collapseModal();
            });
    }

    HandleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        let formObject = Object.fromEntries(formData.entries());
        console.log("submit called")

        console.log("formObject", formObject.content);
        ideaList.createIdea(formObject)
            .then((response) => {
                const data = response;
                console.log("response ", data);
                this.collapseModal();
            });
    }
    render() {
        const ideas_list = this.state['listItem'];
        const alertAttributes = {};
        console.log("alert", this.state.showAlert)
        if (this.state.showAlert === false) {

            alertAttributes.style = {
                display: null
            };
        }

        return (
            <div style={{ backgroundColor: "#000" }}>

                <Box sx={{ paddingLeft: '14%', paddingRight: '8%', paddingTop: '3%' }} >
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={8}>
                            <h2 style={{ color: '#af3673' }}>IdeaPool List</h2>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Button variant="outlined" onClick={() => this.modalOpen({}, { header: "Create Idea", submitHandler: this.HandleSubmit.bind(this), msg: "Record Created Successfully!" })}>Create</Button>
                        </Grid>
                        <DirectionSnackbar open={this.state.showToast} message={this.state.msg} autoHideDuration={2000}
                            handleClose={this.handleClose.bind(this)} />
                            
                        {/* collapse msg box start */}
                        <Box sx={{ width: '100%' }}>
                            <Collapse in={this.state.openCollapse}>
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                this.setState({ openCollapse: false })
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    {this.state.msg}
                                </Alert>
                            </Collapse>
                        </Box>
                        {/* collapse msg box end */}

                        {/* Modal start */}
                        <Modal
                            open={this.state.openModal}
                            onClose={this.handleModalClose.bind(this)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '4%', marginLeft: '16%', width: ' 70%', borderRadius: '15px' }} style={{ background: 'white', border: '2px solid #009688' }}>
                                <div className='border'>
                                    <form onSubmit={this.state.properties.submitHandler}>
                                        {/* <Box sx={{ flexGrow: 1 }}> */}
                                        <Grid item xs="auto">
                                            <h2> {this.state.properties.header}

                                                {/* <Button id="ideaBtn" color="success" type="submit" variant="contained">Add Idea</Button> */}
                                            </h2>
                                            {/* < Alertservice {...alertAttributes} />  <br /> */}

                                            {/* this.setState({ currentItem: { ...this.state.currentItem, [name]: newValue } }) */}

                                            <Grid direction="row" container>
                                                <Grid item ><h3> IDEA: </h3></Grid>
                                                <Grid item >
                                                    <TextField name="content" value={this.state.currentItem.content}
                                                        helperText="Please enter your Idea" onChange={(event, newValue) => this.updateValue('content', newValue)}
                                                        id="demo-helper-text-aligned" sx={{ width: '100%', paddingLeft: '6rem' }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <h3>Rate Score</h3>
                                        </Grid>
                                        <Grid container spacing={3} direction="row" justifyContent="space-around" alignItems="center">
                                            <Grid item xs={3}>
                                                <b className='bAlign'>Impact</b>
                                                <NumberInput min={0} max={10} name="impact" value={this.state.currentItem.impact} updateValue={this.updateValue.bind(this)} />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <b className='bAlign'>Confidance:</b>
                                                <NumberInput min={0} max={10} name="confidence" value={this.state.currentItem.confidence} updateValue={this.updateValue.bind(this)} />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <b className='bAlign'>Ease:</b>
                                                <NumberInput min={0} max={10} name="ease" value={this.state.currentItem.ease} updateValue={this.updateValue.bind(this)} />
                                            </Grid>
                                        </Grid>
                                        <Button variant="contained" color="secondary" type="submit" size="large" sx={{ display: 'flex-end', justifyContent: 'center', float: 'right', marginTop: '1rem', marginRight: '2rem' }}>Submit</Button>
                                        {/* </Box> */}
                                    </form>
                                </div>
                            </Box>
                        </Modal>
                        {/* Modal end */}
                    </Grid>
                    <FixedSizeList
                        height={500}
                        width={800}
                        itemSize={46}
                        itemData={ideas_list}
                        itemCount={ideas_list.length}
                        overscanCount={5}>
                        {this.renderRow.bind(this)}
                    </FixedSizeList>
                </Box>
           
            </div>
        )
    }
}
export default Home 