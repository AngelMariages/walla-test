// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = <T extends Function>(func: T, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return ((...args: unknown[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    }) as unknown as T;
};
