export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';

    async getResourse(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return await res.json();
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    }

    async getPerson(id) {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    }

    async getAllPlanets() {
        const res = await this.getResourse('/planets/');
        return res.results.map(this._transformPlanet);
    }

    async getPlanet(id) {
        const planet = this.getResourse(`/planets/${id}`);
        return this._transformPlanet(planet);
    }

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);
        return res.results.map(this._transformStarship);
    }

    // async getAllStarships() {
    //     const res = await this.getResourse('/starships/');
    //     return res.results;
    // }

    async getStarship(id) {
        const starship = this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    }

    // getStarship(id) {
    //     return this.getResourse(`/starships/${id}`);
    // }

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        // console.log(item);
        return item.url.match(idRegExp)[1]; //[1] - группа 1 в регулярках(зеленая), 0 - 2 группа
    }

    _transformPlanet(planet) {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _transformStarship(starship) {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }

    _transformPerson(person) {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    }

}

// const swapi = new SwapiService();
//
// swapi.getAllPeople().then((people) => {
//     people.forEach((p) => {
//         console.log(p.name);
//     });
// });
//
// swapi.getPerson(3).then((p) => {
//     console.log(p.name);
// });