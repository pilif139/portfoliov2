import useDebounce from '../hooks/useDebounce';
import { act, renderHook } from '@testing-library/react';

describe('useDebounce', () => {
    it('should debounce the callback after the specified timeout', () => {
        jest.useFakeTimers();

        const callback = jest.fn();
        const timeout = 500;
        const { result } = renderHook(() => useDebounce());

        act(() => {
            result.current[0](callback, timeout);
        })
        expect(callback).toHaveBeenCalledTimes(0);

        jest.advanceTimersByTime(timeout - 100); // Not enough time has passed yet
        expect(callback).toHaveBeenCalledTimes(0);


        jest.advanceTimersByTime(100); // Enough time has passed now
        expect(callback).toHaveBeenCalled();
    });

    it('should cancel the previous debounce and start a new one when called multiple times', () => {
        jest.useFakeTimers();

        const callback = jest.fn();
        const timeout = 500;
        const { result } = renderHook(() => useDebounce());

        act(() => {
            result.current[0](callback, timeout);
        })

        jest.advanceTimersByTime(timeout - 100); // Not enough time has passed yet
        expect(callback).toHaveBeenCalledTimes(0);

        act(() => {
            result.current[0](callback, timeout);
        })

        jest.advanceTimersByTime(timeout - 100); // Not enough time has passed yet
        expect(callback).toHaveBeenCalledTimes(0);

        jest.advanceTimersByTime(100); // Enough time has passed now
        expect(callback).toHaveBeenCalled();

    });

    it('should clear the debounce timer when called with a timeout of 0', () => {
        jest.useFakeTimers();

        const callback = jest.fn();
        const timeout = 500;
        const { result } = renderHook(() => useDebounce());

        act(() => {
            result.current[0](callback, timeout);
        })

        jest.advanceTimersByTime(timeout - 100); // Not enough time has passed yet
        expect(callback).toHaveBeenCalledTimes(0);

        act(() => {
            result.current[0](callback, 0);
        })

        jest.advanceTimersByTime(100); // Enough time has passed now
        expect(callback).toHaveBeenCalled();
    });
});