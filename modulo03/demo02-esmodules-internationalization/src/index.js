import Draftlog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readline from 'readline';

import database from './../database.json';
import Person from './person.js';

Draftlog(console).addLineListener(process.stdin)

const options = {
    leftPad: 2,
    columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.green('KM Traveled') },
        { field: 'from', name: chalk.red('From') },
        { field: 'to', name: chalk.blue('To') },
    ]
}

const table = chalkTable(options, database.map(
    item => new Person(item).formatted('pt-BR')
));
const print = console.draft(table);

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

terminal.question('Qual é seu nome?', (answer) => {
    console.log('Answer: ', answer);
});