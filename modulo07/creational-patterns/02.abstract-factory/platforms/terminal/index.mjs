import ViewFactory from "../../shared/base/viewFactory.mjs";
import TableTerminalComponent from "./table.mjs";

export default class TerminalFactory extends ViewFactory {
    createTable() {
        return new TableTerminalComponent();
    }
}
