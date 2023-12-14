import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import Order from '../src/entities/order';
import OrderBusiness from '../src/business/orderBusiness';

describe('Test Suite for Template Method design pattern', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe('#OrderBusiness', () => {	
        test('execution Order Business without Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100000,
                products: [{
                    description: 'Onix LTZ',
                }],
            });
            const orderBusiness = new OrderBusiness();

            const isValid = orderBusiness._validateRequiredFields(order);

            expect(isValid).toBe(true);

            const result = orderBusiness._create(order);

            expect(result).toBeTruthy();
        });

        test('execution Order Business with Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100000,
                products: [{
                    description: 'Onix LTZ',
                }],
            });
            const orderBusiness = new OrderBusiness();
            const calledValidationFunction = jest.spyOn(
                orderBusiness,
                orderBusiness._validateRequiredFields.name,
            )
            const calledCreateFunction = jest.spyOn(
                orderBusiness,
                orderBusiness._create.name,
            )

            const result = orderBusiness.create(order);
            
            expect(result).toBeTruthy();
            expect(calledValidationFunction).toHaveBeenCalled();
            expect(calledCreateFunction).toHaveBeenCalled();
        });
    });
});