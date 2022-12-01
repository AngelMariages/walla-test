import { act, fireEvent, getByTestId, render } from '@testing-library/react';
import SearchBar from '.';

jest.mock('lib/debounce', () => ({
    debounce: (fn: () => void) => fn,
}));

describe('SearchBar', () => {
    it('should render correctly', () => {
        const { container } = render(<SearchBar setSearch={() => false} />);
        expect(container).toMatchSnapshot();
    });

    it('should call onSearch when input changes', async () => {
        const onSearch = jest.fn();
        const { container } = render(<SearchBar setSearch={onSearch} />);
        const input = getByTestId(container, 'search-input');

        await act(() => {
            fireEvent.change(input, { target: { value: 'test' } });
        });
        expect(onSearch).toHaveBeenCalledTimes(1);
        expect(onSearch).toHaveBeenCalledWith('test');
    });

    it('should call router.push when form is submitted', async () => {
        const onSubmit = jest.fn();
        const { container } = render(
            <SearchBar setSearch={() => false} onSubmit={onSubmit} />
        );
        const input = getByTestId(container, 'search-input');
        const form = getByTestId(container, 'search-form');

        await act(() => {
            fireEvent.change(input, { target: { value: 'second-test' } });

            fireEvent.submit(form);
        });

        expect(onSubmit).toHaveBeenCalledTimes(1);
    });
});
