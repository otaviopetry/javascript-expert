import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import BaseBusiness from '../src/business/base/baseBusiness';
import { NotImplementedException } from '../src/util/exceptions';

describe('#BaseBusiness', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    test('should throw an error when child class doesnt implement _validateRequiredFields function', () => {
        class ConcreteClass extends BaseBusiness { }
        const concreteClass = new ConcreteClass();
        
        const expectedValidationError = new NotImplementedException(
            concreteClass._validateRequiredFields.name,
        );

        expect(() => concreteClass.create({})).toThrow(expectedValidationError);
    });

    test('should throw an error when child class doesnt implement _create function', () => {
        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(true);
        }
        const concreteClass = new ConcreteClass();
        
        const expectedValidationError = new NotImplementedException(
            concreteClass._create.name,
        );

        expect(() => concreteClass.create({})).toThrow(expectedValidationError);
    });

    test('should throw an error when _validateRequiredFields returns false', () => {
        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(false);
        }
        const concreteClass = new ConcreteClass();
        
        const expectedValidationError = new Error(
            "Invalid data",
        );

        expect(() => concreteClass.create({})).toThrow(expectedValidationError);
    });

    test('should call _create and _validateRequiredFields on create', () => {
        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(true);
            _create = jest.fn().mockReturnValue(true);
        }
        const concreteClass = new ConcreteClass();
        const baseClassCreateSpy = jest.spyOn(
            BaseBusiness.prototype,
            BaseBusiness.prototype.create.name,
        );

        const result = concreteClass.create({});

        expect(result).toBeTruthy();
        expect(baseClassCreateSpy).toHaveBeenCalled();
        expect(concreteClass._validateRequiredFields).toHaveBeenCalled();
        expect(concreteClass._create).toHaveBeenCalled();
    });
});