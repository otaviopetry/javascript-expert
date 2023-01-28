'use strict';

const { watch, promises: { readFile } } = require('fs')

class File {
    watch(event, filename) {
        console.log(event)
        console.log(filename)
        console.log(arguments)
        this.showContent(filename)
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString())
    }
}

const file = new File()

// dessa forma, o watch da class vai ignorar o contexto da classe e herdar o this do watch, resultando em um erro
// watch(__filename, file.watch)

// podemos ignorar o contexto atual ao utilizar funções anônimas
// watch(__filename, (event, filename) => file.watch(event, filename))

// ou podemos utilizar o bind para definir o contexto da função
watch(__filename, file.watch.bind(file))

// também podemos podemos utilizar os métodos apply e call para substituir funcionamento de funções
// file.watch.call({ showContent: () => console.log('call --->')}, null, __filename);
// file.watch.apply({ showContent: () => console.log('apply --->')}, [null, __filename]);