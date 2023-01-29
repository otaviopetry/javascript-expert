'use strict';module.export({default:()=>TerminalController});var chalk;module.link('chalk',{default(v){chalk=v}},0);var chalkTable;module.link('chalk-table',{default(v){chalkTable=v}},1);var readline;module.link('readline',{default(v){readline=v}},2);var Person;module.link('./person.js',{default(v){Person=v}},3);var DraftLog;module.link('draftlog',{default(v){DraftLog=v}},4);







class TerminalController {
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

    updateTable(entry) {
        this.data.push(entry);
        this.print(chalkTable(this.getTableOptions(), this.data));
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