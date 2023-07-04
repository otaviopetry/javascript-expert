export default class NotImplementedException extends Error {
    constructor(methodName) {
        super(`The "${ methodName }" method was not implemented.`);

        this.methodName = methodName;
    }
}
