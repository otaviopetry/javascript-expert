const Product = require('../../src/entities/product');

class ProductDataBuilder {
    constructor() {
        this.productData = {
            id: '000001',
            name: 'Computer',
            price: 1000,
            category: 'eletronic',
        }
    }

    static aProduct() {
        return new ProductDataBuilder();
    }

    withInvalidId() {
        this.productData.id = '1';

        return this;
    }

    withInvalidName() {
        this.productData.name = 'abc123';

        return this;
    }

    withInvalidPrice() {
        this.productData.price = 2000;

        return this;
    }
  
    withInvalidCategory() {
        this.productData.category = 'synthethic';

        return this;
    }

    build() {
        const product = new Product(this.productData);

        return product;
    }
}

module.exports = ProductDataBuilder;