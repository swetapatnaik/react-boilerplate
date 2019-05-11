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

class MultiSelectPicker1 extends React.Component {
    state = {
        selectedTagsAdded: [],
        TagTypesOriginal : [
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
        selectedTags: [], 
        tagsToBeRemoved : [],
        selectedTagsAddedOriginal: []
    };

    onAdd = () => {
        if(this.state.selectedTags.length > 0){
            let newToAdd = [...this.state.selectedTags];
            let selectedTagsAdded = this.state.selectedTagsAdded;
            for(var i = 0; i< newToAdd.length; i++){
                if(selectedTagsAdded.indexOf(newToAdd[i]) === -1){
                    selectedTagsAdded.push(newToAdd[i]);
                }
            }            
            this.setState({showSelectedTags: true});
            this.setState({selectedTagsAdded: selectedTagsAdded});
            this.setState({selectedTagsAddedOriginal: selectedTagsAdded});
        }
    };

    onRemove = () => {
        if(this.state.tagsToBeRemoved.length > 0){
            let newToRemove = [...this.state.tagsToBeRemoved];
            let selectedTagsAdded = this.state.selectedTagsAdded;
            let filteredResult = [];
            for (var i = 0; i < newToRemove.length; i++) {
                var index = selectedTagsAdded.indexOf(newToRemove[i]);
                selectedTagsAdded.splice(index,1);
            }
            this.setState({selectedTagsAdded: selectedTagsAdded});
            this.setState({selectedTagsAddedOriginal: selectedTagsAdded});
        }
    };

    searchAddedTags = (e) => {
        const inputValue = e.target.value.toLowerCase();

        if (inputValue) {
            const tags = this.state.selectedTagsAddedOriginal.slice();
            const filteredTags = tags.filter(tag => tag.toLowerCase().includes(inputValue));
            console.log(filteredTags);
            this.setState({ selectedTagsAdded: filteredTags });
        }
        else {
            // restoring the data 
            this.setState({ selectedTagsAdded: this.state.selectedTagsAddedOriginal });
        }
    }

    searchTags = (e) => {
        const inputValue = e.target.value.toLowerCase();
        
        const tagTypes = Object.assign([], this.state.TagTypesOriginal);
        console.log(this.state.TagTypesOriginal);
        if (inputValue) {
            const filteredResult = tagTypes
            .map(item => ({
              ...item,
              tags: item.tags
                .filter(child => child.tag.toLowerCase().includes(inputValue))
            }))
            .filter(item => item.tags.length > 0)
            console.log(this.state.TagTypesOriginal);
            this.setState({ TagTypes: filteredResult });
        }
        else {
            // restoring the data 
            this.setState({ TagTypes: this.state.TagTypesOriginal });
        }
    }

    arrayUnique(array) {
        var arr = array.concat();
        for(var i=0; i<arr.length; ++i) {
            for(var j=i+1; j<arr.length; ++j) {
                if(arr[i] === arr[j])
                    arr.splice(j--, 1);
            }
        }    
        return arr;
    }

    handleChangeMultiple = (event) => {
        const options = event.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected && value.indexOf(options[i].value) === -1) {
            value.push(options[i].value);
          }
        }
        
        console.log(value)
        
        if(event.target.name === "tag-list"){
            //value = this.arrayUnique(value.concat(this.state.selectedTags));
            this.setState({
                selectedTags: value
            });
        }else{
            this.setState({
                tagsToBeRemoved: value
            });
        }
    };

    render() {
        const { TagTypes } = this.state;
        return (
            <Grid container>

                <Grid item xs={5} className="tag-list">
                    <FormControl fullWidth margin='normal' style={{ padding: "0 10px" }} className='search-tool-content'>
                        <Input id="search-tag" type='text' placeholder='Search Tags' onChange={this.searchTags}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton color="inherit">
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            } />
                            
                    </FormControl>
                    <select multiple 
                    name="tag-list"
                    className="custom-picker-list"
                    onChange={this.handleChangeMultiple}>
                        {this.state.TagTypes.map(value => (
                            <optgroup key={value.tagType} label={value.tagType}>
                                {value.tags.map(tag => (
                                    <option key={tag.tag} value={tag.tag}>{tag.tag}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
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
                    {this.state.showSelectedTags &&<FormControl fullWidth margin='normal' style={{ padding: "0 10px" }} className='search-tool-content'>
                        <Input id="search-tag" type='text' placeholder='Search Selected Tags' onChange={this.searchAddedTags}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton color="inherit">
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            } />
                    </FormControl>}
                    {this.state.showSelectedTags &&
                        <select multiple 
                        name="selected-tag-list"
                        className="custom-picker-list"
                        onChange={this.handleChangeMultiple}>
                            {this.state.selectedTagsAdded.map(value => (
                                <option key={value} value={value}>{value}</option>
                            ))}}
                        </select>}
                </Grid>
            </Grid>
        );
    }
}

export default MultiSelectPicker1;