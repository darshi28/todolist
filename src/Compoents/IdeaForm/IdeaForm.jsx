import React, { useState } from 'react';
import './IdeaForm.css';
import Button from '@mui/material/Button';
import GetIdeaList, { createIdea } from '../../api/ideaApiList';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import NumberInput from '../NumberInput';
import Alertservice from '../../Service/AlertService';

function IdeaForm() {
    let listItem = GetIdeaList();
    let items = localStorage.getItem('ideaList')
    const [hide, sethide] = useState(false);
    if (items && items.length) {
        listItem = JSON.parse(items)
        console.log("listItem", listItem);
    }
    const HandleSubmit = (e) =>{
        e.preventDefault()
        const formData = new FormData(e.target);
        let formObject = Object.fromEntries(formData.entries());

        console.log(formObject);
        createIdea(formObject)
            .then((response) => {
                const data = response;
                console.log("response ", data);
                sethide(true);
            });
    }
    return (
        <div className='container'>

            <Grid container direction="row" justifyContent="space-around" alignItems="center">

                <div className='border'>
                    <form onSubmit={HandleSubmit}>
                        <Grid item xs="auto">
                            <h2> Todo List</h2>
                            {/* <Grid item sxs={4}> */}
                            <Button id="ideaBtn" color="success" type="submit" variant="contained">Add Idea</Button>
                            {/* </Grid> */}
                        </Grid>
                         {hide ? < Alertservice  />: `` } <br />
                          <b> IDEA: <TextField name="content"
                            helperText="Please enter your Idea"
                            id="demo-helper-text-aligned" fullWidth
                        /></b>
                        <br />

                        <b>Average Score: <NumberInput min={0} max={10} name="impact" value="6" /></b>
                        <b>Confidance: <NumberInput min={0} max={10} name="confidence" value="6" /></b>
                        <b>Ease: <NumberInput min={0} max={10} name="ease" /></b>
                    </form>
                </div>
            </Grid>
        </div>
    )
}
export default IdeaForm