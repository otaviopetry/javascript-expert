'use strict';

import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readline from 'readline';
import Person from './person.js';
import DraftLog from 'draftlog';

export default class TerminalController {
    constructor() {
        this.print = {};
        this.data = {};
        this.terminal = {};
    }

    initializeTerminal(database, language) {
        DraftLog(console).addLineListener(process.stdin);
        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.initializeTable(database, language);
    }

    closeTerminal() {
        this.terminal.close();
    }

    initializeTable(database, language) {
        const data = database.map(
            item => new Person(item).formatted(language),
        );
        const table = chalkTable(this.getTableOptions(), data);

        this.print = console.draft(table);
        this.data = data;
    }

    question(message = '') {
        return new Promise(resolve => this.terminal.question(
            message,
            resolve,
        ));
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: 'id', name: chalk.cyan('ID') },
                { field: 'vehicles', name: chalk.magenta('Vehicles') },
                { field: 'kmTraveled', name: chalk.green('KM Traveled') },
                { field: 'from', name: chalk.red('From') },
                { field: 'to', name: chalk.blue('To') },
            ]
        };
    }
}