import React, { Component } from 'react';

import './item-list.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class ItemList extends Component {

    constructor() {
        super();

        this.swapiService = new SwapiService();
    }

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then((peopleList) => {
                this.setState({
                    peopleList
                });
            });
    }

    renderItems(arr) {
        return arr.map(({ id, name }) => {
           return (
               <li className="list-group-item"
                    key={id}
                    onClick={ () => this.propsOnItemSelected(id) }>
                   { name }
               </li>
           ) ;
        });
    }

    render() {
        const { peopleList } = this.setState;

        // if(!peopleList) {
        //     return <Spinner />;
        // }

        const items = this.renderItems(peopleList);

        return (
            <ul className="item-list list-group">
                { items }
            </ul>
        );
    }
}