import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  changeType = newType => {
    this.setState({
      filters: {
        type: newType
      }
    });
  };

  findPets = () => {
    let petURL = "/api/pets";
    if (this.state.filters.type !== "all") {
      petURL = `/api/pets?type=${this.state.filters.type}`;
    }
    fetch(petURL)
      .then(response => response.json())
      .then(result => this.setState({ pets: result }));
  };

  adoptAPet = petId => {
   this.setState(previousState => {
     const petIndex = previousState.pets.findIndex(pet => pet.id === petId);
     previousState.pets[petIndex].isAdopted = true;
     return previousState;
   })
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.changeType}
                onFindPetsClick={this.findPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.adoptAPet}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
