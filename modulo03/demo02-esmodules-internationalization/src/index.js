import database from './../database.json';
import TerminalController from './terminalController.js';
import Person from './person.js';
import { save } from './repository.js';

const DEFAULT_LANGUAGE = 'pt-BR';
const STOP_TERMINAL_COMMAND = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE);

const QUESTIONS = {
    'id': 'Enter id:',
    'vehicles': 'Enter vehicles (comma separated):',
    'kmTraveled': 'Enter traveled km:',
    'from': 'Enter initial date (YYYY-MM-DD):',
    'to': 'Enter end date (YYYY-MM-DD):',
}
const QUESTION_FIELD_NAMES = Object.keys(QUESTIONS);

const answeredQuestions = { }

async function mainLoop(currentQuestionIndex = 0) {
    if (currentQuestionIndex === QUESTION_FIELD_NAMES.length) {
        await handleCompleteEntry();
    }

    try {
        await handleIteration(currentQuestionIndex);
    } catch (error) {
        await handleError(error);
    }
}

async function handleCompleteEntry() {
    const person = Person.generateInstanceFromObject(answeredQuestions);
    await save(person);
    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE));
    terminalController.print('Entry has been saved. Press add another one or type :q to quit')

    return mainLoop();
}

async function handleIteration(currentQuestionIndex) {
    const currentQuestionFieldName = QUESTION_FIELD_NAMES[currentQuestionIndex];
    const answer = await terminalController.question(QUESTIONS[currentQuestionFieldName]);

    if (answer === STOP_TERMINAL_COMMAND) {
        terminalController.closeTerminal();
        console.log('Process finished! Press Ctrl + C to exit the application.');

        return;
    }

    answeredQuestions[currentQuestionFieldName] = answer;

    return mainLoop(currentQuestionIndex + 1);
}

async function handleError(error) {
    console.log('Error: ', error);

    return mainLoop();
}

await mainLoop();
