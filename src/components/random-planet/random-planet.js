import React, { Component } from 'react';

import './random-planet.css';

import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

    constructor() {
        super();

        this.swapiService = new SwapiService(); //инициируем подключение к апи

        this.state = {
            planet: {},
            loading: true
            // id: null,
            // name: null,
            // population: null,
            // rotationPeriod: null,
            // diameter: null
        };
    }

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 3000);
        //clearInterval(this.interval); //https://prnt.sc/uyv9lz жизненные циклы
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false
        });
    };

    onError = (err) => {
        this.setState({
            loading: false,
            error: true
        });
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random()*25) + 2;

        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError); //если есть асинхронная функция, м. делать кэтч
    };

    render() {
        const { planet, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <PlanetView planet={ planet }/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                { errorMessage }
                { spinner }
                { content }
            </div>

        );
    }
}

const PlanetView = ({ planet }) => {
    const { id, name, population, rotationPeriod, diameter } = planet;

      return (
          <React.Fragment>
              <img className="planet-image"
                   src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
              <div>
                  <h4>{ name }</h4>
                  <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                          <span className="term">Population</span>
                          <span>{ population }</span>
                      </li>
                      <li className="list-group-item">
                          <span className="term">Rotation Period</span>
                          <span>{ rotationPeriod }</span>
                      </li>
                      <li className="list-group-item">
                          <span className="term">Diameter</span>
                          <span>{ diameter }</span>
                      </li>
                  </ul>
              </div>
          </React.Fragment>
      );
};
