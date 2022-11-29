import { renderHook } from '@testing-library/react';
import useInfiniteScroll from '.';

describe('useInfiniteScroll', () => {
    it('should start observing itemRef node callback', () => {
        let observeCalls = 0;
        const observe = jest.fn(() => observeCalls++);
        const disconnect = jest.fn();

        // @ts-expect-error missing properties
        global.IntersectionObserver = jest.fn(() => ({
            observe,
            disconnect,
            current: observeCalls > 0,
        }));

        const cb = jest.fn();
        const { result } = renderHook(({ cb }) => useInfiniteScroll(cb), {
            initialProps: {
                cb,
            },
        });

        const itemRef = result.current.itemRef;

        expect(itemRef).not.toBeNull();
        expect(cb).not.toHaveBeenCalled();

        const node = document.createElement('div');

        itemRef(node);

        expect(observe).toHaveBeenCalledWith(node);

        itemRef(node);

        expect(observeCalls).toBe(2);
        expect(disconnect).toHaveBeenCalled();
    });

    it('should call callback when itemRef node is intersecting', () => {
		class IntersectionObserver {
			constructor(cb: (params: unknown[]) => void) {
				cb && cb([{ isIntersecting: true }]);
			}
			observe() {
				return;
			}
		}

		// @ts-expect-error missing properties
        global.IntersectionObserver = IntersectionObserver;

        const cb = jest.fn();
        const { result } = renderHook(({ cb }) => useInfiniteScroll(cb), {
            initialProps: {
                cb,
            },
        });

        const itemRef = result.current.itemRef;

        const node = document.createElement('div');

        itemRef(node);

        expect(cb).toHaveBeenCalled();
    });
});
