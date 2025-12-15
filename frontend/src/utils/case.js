export const snakeToCamel = (str) =>
    str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

export const camelToSnake = (str) =>
    str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);

const isPlainObject = (value) =>
    Object.prototype.toString.call(value) === "[object Object]";

export const keysToCamel = (data) => {
    if (Array.isArray(data)) {
        return data.map(keysToCamel);
    }

    if (isPlainObject(data)) {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                snakeToCamel(key),
                keysToCamel(value),
            ])
        );
    }

    return data;
};

export const keysToSnake = (data) => {
    if (Array.isArray(data)) {
        return data.map(keysToSnake);
    }

    if (isPlainObject(data)) {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                camelToSnake(key),
                keysToSnake(value),
            ])
        );
    }

    return data;
};

