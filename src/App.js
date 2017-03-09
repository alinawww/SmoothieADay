import React, { Component } from 'react';
// import ReactDOM from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTransitionGroup from 'react-addons-transition-group';
import ReactTransitions from 'react-transitions';
import 'react-transitions/dist/animations.css'; //https://szchenghuang.github.io/react-transitions/
import './App.css';

class Button extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
      this.props.randomNumber(e.target.value)
  }
  render() {
    return (
      <div>
        <button className="smoothie__button" value={this.props.randomNumber} onClick={this.handleClick}>Give me random smoothie</button>
      </div>
    );
  }
}

class IngredientLine extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span className="smoothie__ingredient">
                {this.props.ingredientText}
            </span>
        )
    }
}

class Smoothie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomNumber: 0
        };
        this.handleRandomNumber = this.handleRandomNumber.bind(this);
    }

    handleRandomNumber(){
        this.setState({
            randomNumber: Math.floor((Math.random() * 30) + 1)
        })
    }
    render() {
        const selectedSmoothie = this.props.smoothies[this.state.randomNumber] ? this.props.smoothies[this.state.randomNumber] : null;
        if (typeof(selectedSmoothie) !== 'undefined' || typeof(selectedSmoothie) !== null) {
            const smoothieRecipe = selectedSmoothie.recipe
            const name = smoothieRecipe.label;
            const image = smoothieRecipe.image;
            const ingredients = smoothieRecipe.ingredients;
            const calories = smoothieRecipe.calories;
            const cautions = smoothieRecipe.cautions;
            console.log(smoothieRecipe);
            const nutrients = smoothieRecipe.totalNutrients;
            const smoothieWeight = smoothieRecipe.totalWeight * 1000;

            let shouldBeShown;
            if ( typeof name !== undefined && typeof image !== undefined) {
                shouldBeShown = true;
            }
            if (shouldBeShown) {
                // let ingredientLines = [];
                //
                // {ingredients.forEach(function(ingredient, index) {
                //     ingredientLines.push(<IngredientLine ingredientText={ingredient.text} key={index}/>)
                // })}

                return (
                  <ReactTransitions
                      transition={ "sides" }
                      width={ 500 }
                      height={ 900 }
                      key={this.state.randomNumber}
                  >
                    <div key={this.state.randomNumber}>
                      <img className="smoothie__image" width="100" src={image} key={this.state.randomNumber}/>
                        <h2 className="smoothie__title">
                          {name}
                        </h2>
                        <Button value={this.state.randomNumber} randomNumber={this.handleRandomNumber}/>
                        <div className="smoothie__ingredients">
                          {ingredients.map((ingredient, i) => (
                                  <div key={i}>
                                    {ingredient.text}
                                  </div>
                          ))}

                        </div>
                    </div>
                    </ReactTransitions>
                );
            }
        }
    }
}


var App = React.createClass({

  getInitialState: function() {
    return {
      smoothies: [],
      id: 1,
      loading: true
    }
  },

  componentDidMount: function() {
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
    var th = this;
    let id = 0;
    this.serverRequest =
      axios.get(this.props.source)
        .then(function(result) {
          th.setState({
            smoothies: result.data.hits,
            id: id + 1,
            loading: false,
          });
        })
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render() {
    if (this.state.loading) {
      return (<p>loading</p>)
    }
    else {
      return (
        <div className="smoothie" key={this.state.id}>

          <Smoothie smoothies={this.state.smoothies} key={this.state.id} />

        </div>
      )
    }
  }
});

export default App;
