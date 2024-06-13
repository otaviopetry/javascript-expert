import Util from "../util";

const serviceNameAnchor = "$$serviceName";
const repositoryNameAnchor = "$$repositoryName";

const serviceFileNameAnchor = "$$serviceNameDependency";
const repositoryFileNameAnchor = "$$repositoryNameDependency";

const componentNameAnchor = "$$componentName";

const template = `
import $$serviceName from "../service/$$serviceNameDependency.js";
import $$repositoryName from "../repository/$$repositoryNameDependency.js";

export default class $$componentNameFactory {
    static getInstance() {
        const repository = new $$repositoryName();
        const service = new $$serviceName({ repository });

        return service;
    }
}`;

export function factoryTemplate(componentName, repositoryName, serviceName) {
    const txtFile = template
        .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
        .replaceAll(serviceFileNameAnchor, Util.lowerCaseFirstLetter(serviceName))
        .replaceAll(repositoryFileNameAnchor, Util.lowerCaseFirstLetter(repositoryName))
        .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
        .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName));

    return {
        fileName: `${componentName}Factory`,
        template: txtFile,
    };
}
