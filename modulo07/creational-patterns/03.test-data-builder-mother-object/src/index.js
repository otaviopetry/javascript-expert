/*
ProductId: should be between 2 and 20 characters
Name: should be only words
Price: should be between zero and 1000
Category: should be eletronic or organic
*/

function productValidator(product) {
    const errors = [];

    if (!(product.id.length >= 2 && product.id.length <= 20)) {
        errors.push(`id: invalid length, current [${ product.id }] expected to be between 2 and 20`)
    }

    if (/(\W|\d)/.test(product.name)) {
        errors.push(`name: invalid value, current [${ product.name }] expected to be only words`);
    }

    if (!(product.price >= 0 && product.price <= 1000)) {
        errors.push(`price: invalid value, current [${ product.price }] expected to be between 0 and 1000`);
    }

    if (!['eletronic', 'organic'].includes(product.category)) {
        errors.push(`category: invalid value, current [${ product.category }] expected to be either eletronic or organic`);
    }

    return {
        result: errors.length === 0,
        errors,
    }
}

module.exports = {
    productValidator,
}