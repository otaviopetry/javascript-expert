"use strict";module.export({default:()=>Person});var TerminalController;module.link("./terminalController.js",{default(v){TerminalController=v}},0); 

class Person {
    constructor({ id, vehicles, kmTraveled, from, to }) {
        this.id = id;
        this.vehicles = vehicles;
        this.kmTraveled = kmTraveled;
        this.from = from;
        this.to = to;
    }

    formatted(language) {
        const mapDate = (date) => {
            const [year, month, day] = date.split('-').map(Number);

            return new Date(year, (month - 1), day);
        }

        return {
            id: Number(this.id),
            vehicles: new Intl.ListFormat(
                language,
                { style: "long", type: "conjunction" }
            ).format(this.vehicles),
            kmTraveled: new Intl.NumberFormat(
                language,
                { style: "unit", unit: "kilometer" },
            ).format(this.kmTraveled),
            from: new Intl.DateTimeFormat(
                language,
                { month: 'long', day: '2-digit', year: 'numeric' }
            ).format(mapDate(this.from)),
            to: new Intl.DateTimeFormat(
                language,
                { month: 'long', day: '2-digit', year: 'numeric' }
            ).format(mapDate(this.to)),
        }
    }

    static generateInstanceFromString(dataEntry) {
        const [id, vehicles, kmTraveled, from, to] = dataEntry.split(' ');
        
        return new Person({
            id,
            vehicles: vehicles.split(','),
            kmTraveled,
            from,
            to,
        });
    }

    static generateInstanceFromObject(person) {
        return new Person({
            id: person.id,
            vehicles: person.vehicles.split(','),
            kmTraveled: person.kmTraveled,
            from: person.from,
            to: person.to,
        });
    }
}