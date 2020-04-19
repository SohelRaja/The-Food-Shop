import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Menu from './MenuComponent';
import './../App.css';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }
    onDishSelect(dishID) {
        this.setState({ selectedDish: dishID});
    }
    render(){
        const HomePage = () => {
            return(
                <Home 
                />
            );
        }
        return (
        <div>
            <Header />
            {/* <Menu 
                dishes={this.state.dishes} 
                onClick={(dishID) => this.onDishSelect(dishID)}    
            />
            <DishDetail 
                dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} 
            /> */}
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
                <Redirect to="/home" />
            </Switch>
            <Footer />
        </div>
        );
    }
}

export default Main;
