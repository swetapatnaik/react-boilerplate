import React from 'react';
import {
    MenuItem, FormControl, ListItem, ListItemText, List, Grid, Checkbox, Button, Tooltip,
    IconButton,
    Input,
    InputAdornment, Select
} from '@material-ui/core';
import '../styles/MultiSelectPicker.scss';
import ChevronRight from '@material-ui/icons/ArrowRight';
import ChevronLeftOutlined from '@material-ui/icons/ArrowLeft';
import Search from '@material-ui/icons/Search';

const data = [
    {
        "tagType": "CMT",
        "tagTypeId": 1,
        "tags": [
            {
                "tag": "Digital Marketing",
                "tagId": 1,
                "tagTypeId": 1
            },
            {
                "tag": "Digital Analytics",
                "tagId": 2,
                "tagTypeId": 1
            }
        ]
    },
    {
        "tagType": "Offerings & Priorities",
        "tagTypeId": 2,
        "tags": [
            {
                "tag": "Alliance",
                "tagId": 3,
                "tagTypeId": 2
            },
            {
                "tag": "Priorities",
                "tagId": 4,
                "tagTypeId": 2
            }
        ]
    },
    {
        "tagType": "Products",
        "tagTypeId": 3,
        "tags": [
            {
                "tag": "Automotive",
                "tagId": 5,
                "tagTypeId": 3
            },
            {
                "tag": "Infrastructure",
                "tagId": 6,
                "tagTypeId": 3
            }
        ]
    },
    {
        "tagType": "Resources",
        "tagTypeId": 4,
        "tags": [
            {
                "tag": "Life Sciences",
                "tagId": 7,
                "tagTypeId": 4
            },
            {
                "tag": "Retail",
                "tagId": 8,
                "tagTypeId": 4
            }
        ]
    },
    {
        "tagType": "Technology & Trends",
        "tagTypeId": 5,
        "tags": [
            {
                "tag": "Dynamics AX",
                "tagId": 9,
                "tagTypeId": 5
            },
            {
                "tag": "Dynamics CRM",
                "tagId": 10,
                "tagTypeId": 5
            }
        ]
    },
    {
        "tagType": "Media",
        "tagTypeId": 6,
        "tags": [
            {
                "tag": "Workplace Modernization",
                "tagId": 11,
                "tagTypeId": 6
            },
            {
                "tag": "Digital Employee Experience",
                "tagId": 12,
                "tagTypeId": 6
            }
        ]
    },
];
Object.freeze(data);

class MultiSelectPicker extends React.Component {
    state = {
        checked: [],
        selectedTagsChecked: [],
        TagTypes: [
            {
                "tagType": "CMT",
                "tagTypeId": 1,
                "tags": [
                    {
                        "tag": "Digital Marketing",
                        "tagId": 1,
                        "tagTypeId": 1
                    },
                    {
                        "tag": "Digital Analytics",
                        "tagId": 2,
                        "tagTypeId": 1
                    }
                ]
            },
            {
                "tagType": "Offerings & Priorities",
                "tagTypeId": 2,
                "tags": [
                    {
                        "tag": "Alliance",
                        "tagId": 3,
                        "tagTypeId": 2
                    },
                    {
                        "tag": "Priorities",
                        "tagId": 4,
                        "tagTypeId": 2
                    }
                ]
            },
            {
                "tagType": "Products",
                "tagTypeId": 3,
                "tags": [
                    {
                        "tag": "Automotive",
                        "tagId": 5,
                        "tagTypeId": 3
                    },
                    {
                        "tag": "Infrastructure",
                        "tagId": 6,
                        "tagTypeId": 3
                    }
                ]
            },
            {
                "tagType": "Resources",
                "tagTypeId": 4,
                "tags": [
                    {
                        "tag": "Life Sciences",
                        "tagId": 7,
                        "tagTypeId": 4
                    },
                    {
                        "tag": "Retail",
                        "tagId": 8,
                        "tagTypeId": 4
                    }
                ]
            },
            {
                "tagType": "Technology & Trends",
                "tagTypeId": 5,
                "tags": [
                    {
                        "tag": "Dynamics AX",
                        "tagId": 9,
                        "tagTypeId": 5
                    },
                    {
                        "tag": "Dynamics CRM",
                        "tagId": 10,
                        "tagTypeId": 5
                    }
                ]
            },
            {
                "tagType": "Media",
                "tagTypeId": 6,
                "tags": [
                    {
                        "tag": "Workplace Modernization",
                        "tagId": 11,
                        "tagTypeId": 6
                    },
                    {
                        "tag": "Digital Employee Experience",
                        "tagId": 12,
                        "tagTypeId": 6
                    }
                ]
            },
        ],
        showSelectedTags: false,
        selectedTags: []
    };

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({
            checked: newChecked,
        });
        console.log(newChecked);
    };

    onAdd = () => {
        const newToAdd = [...this.state.checked];
        this.setState({selectedTags: newToAdd});
        this.setState({showSelectedTags: true});
        this.setState({selectedTagsChecked: []});
    };

    onRemove = () => {
    };

    searchUser = (e) => {
        const inputValue = e.target.value.toLowerCase();

        //if (inputValue) {
            const tagTypes = [...data];
            let filteredResult = [];
            for (var i = 0; i < tagTypes.length; i++) {
                var tagType = data[i];
                var filteredTags = [], flag = false;
                for (var j = 0; j < tagType.tags.length; j++) {
                    var tag = tagType.tags[j];
                    if (tag.tag.toLowerCase().includes(inputValue)) {
                        filteredTags.push(tag);
                        flag = true;
                    }
                }
                if (flag) {
                    filteredResult.push(tagType);
                    tagType.tags = filteredTags;
                }
            }
            console.log(filteredResult);
            this.setState({ TagTypes: filteredResult });
        //}
        // else {
        //     // restoring the data 
        //     this.setState({ TagTypes: data });
        // }
    }

    handleSelectedToggle = value => () => {
        const { selectedTagsChecked } = this.state;
        const currentIndex = selectedTagsChecked.indexOf(value);
        const newChecked = [...selectedTagsChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({
            selectedTagsChecked: newChecked,
        });
        console.log(newChecked);
    }

    render() {
        const { TagTypes } = this.state;
        return (
            <Grid container>

                <Grid item xs={5} className="tag-list">
                    <FormControl margin='normal' style={{ padding: "0 10px" }} className='search-tool-content'>
                        <Input id="search-tag" type='text' placeholder='Search' onChange={this.searchUser}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton color="inherit">
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            } />
                            
                    </FormControl>
                    <List className="custom-picker-list">
                        {this.state.TagTypes.map(value => (
                            <List key={value.tagType}>
                                <ListItem className="custom-picker-list-item" role={undefined} dense><ListItemText primary={`${value.tagType}`} /></ListItem>

                                {value.tags.map(tag => (
                                    <ListItem className="custom-picker-list-item" key={tag.tag} role={undefined} dense button onClick={this.handleToggle(tag)}>
                                        <Checkbox
                                            checked={this.state.checked.indexOf(tag) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            color="primary"
                                            className="custom-picker-list-checkbox"
                                        />
                                        <ListItemText className="custom-picker-list-item-text" primary={`${tag.tag}`} className="" />
                                    </ListItem>
                                ))}
                            </List>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={2} className="picker-actions-grid">
                    <div className="picker-actions">
                        <Tooltip title="Add Selected Tags">
                            <Button variant="contained" onClick={this.onAdd} color="primary"><ChevronRight /></Button>
                        </Tooltip>
                        <Tooltip title="Remove selected Tags">
                            <Button variant="contained" onClick={this.onRemove} color="primary"><ChevronLeftOutlined /></Button>
                        </Tooltip>
                    </div>
                </Grid>
                <Grid item xs={5} className="selected-tag-list">
                    {this.state.showSelectedTags &&<FormControl margin='normal' style={{ padding: "0 10px" }} className='search-tool-content'>
                        <Input id="search-tag" type='text' placeholder='Search' onChange={this.searchUser}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton color="inherit">
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            } />
                    </FormControl>}
                    {this.state.showSelectedTags &&
                    <List className="custom-picker-list">
                        {this.state.selectedTags.map(value => (
                            <ListItem className="custom-picker-list-item" key={value.tag} role={undefined} dense button onClick={this.handleSelectedToggle(value)}>
                                <Checkbox
                                    checked={this.state.selectedTagsChecked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    color="primary"
                                    className="custom-picker-list-checkbox"
                                />
                                <ListItemText className="custom-picker-list-item-text" primary={`${value.tag}`} className="" />
                            </ListItem>
                        ))}
                    </List>}
                </Grid>
            </Grid>
        );
    }
}

export default MultiSelectPicker;