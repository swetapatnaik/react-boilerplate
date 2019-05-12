import React, { Component } from "react";
import { getData } from '../api/ApiCall.js';

class Recipe extends Component {
    constructor(props) {    
        super(props);
        this.state = {
          data: [],
          isMounted: false
        };
      }
      componentDidMount(){
        var self = this;
        
        getData().then((res) => {                
          if (res.error) {
              self.setState({ data: [] });
          } else {      
            self.setState({ data: res }); 
            self.setState({isMounted: true});                   
          } 
        });
      }
  
      componentWillUnmount() {
        this.setState({isMounted: false, data: []});
      }
  
    render() {
        var data = this.state.data, isMounted = this.state.isMounted ;   
        return ( 
          <React.Fragment>
              <h1> Recipes!</h1>
            {data.length > 0 && isMounted ? 
                data.map(recipe => <p key={recipe.recipeName+recipe.recipeId}>{recipe.recipeName}</p>)
                : null}       
               
            </React.Fragment>       
        );
    }
}

export default Recipe;