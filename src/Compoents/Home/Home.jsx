import React from 'react';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';
import GetIdeaList from '../../api/ideaApiList';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

class Home extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            listItem: []
        }
    }

    componentDidMount() {
        GetIdeaList()
            .then(res => res ? res : [])
            .then(listItem => this.setState({ listItem }))
    }

    render() {
        const ideas_list = this.state['listItem'];
        function renderRow(props) {
            const { index, style } = props;

            return (
                <ListItem style={style} key={index} component="div" disablePadding>
                    <ListItemButton>
                        <ListItemText primary={`${ideas_list[index].content}`} />
                    </ListItemButton>
                </ListItem>
            );
        }
        return (
            <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
                <FixedSizeList
                    height={400}
                    width={360}
                    itemSize={46}
                    itemCount={ideas_list.length}
                    overscanCount={5}
                >
                    {renderRow}
                </FixedSizeList>
            </Box>
        )
    }
}
export default Home 