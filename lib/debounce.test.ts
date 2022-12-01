import { debounce } from './debounce';

describe('debounce', () => {
    it('should debounce a function correctly', () => {
        jest.useFakeTimers();

        const func = jest.fn();
        const debounced = debounce(func, 100);

        debounced();
        debounced();
        debounced();
        expect(func).not.toBeCalled();

        jest.runAllTimers();

        expect(func).toBeCalledTimes(1);
    });
});
