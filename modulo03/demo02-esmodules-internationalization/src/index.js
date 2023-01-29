import database from './../database.json';
import TerminalController from './terminalController.js';
import Person from './person.js';

const DEFAULT_LANGUAGE = 'pt-BR';
const STOP_TERMINAL_COMMAND = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE);

// 01 Carro 666000 2007-03-20 2012-05-20

async function mainLoop() {
    try {
        const answer = await terminalController.question('What is your command? ');

        if (answer === STOP_TERMINAL_COMMAND) {
            terminalController.closeTerminal();
            console.log('Process finished!');

            return;
        }

        const person = Person
            .generateInstanceFromString(answer)
            .formatted(DEFAULT_LANGUAGE);
            
        console.log('person', person);

        return mainLoop();
    } catch (error) {
        console.log('Error: ', error);

        return mainLoop();
    }
}

await mainLoop();