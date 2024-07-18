export interface ConvertArrayToMapParams<T, Key, R = T> {
  array?: Array<T>;
  getId: (item: T) => Key;
  getValues?: (item: T) => R;
}

/**
 * Converts an array to a Map object based on a provided ID getter function.
 * Optionally transforms each item using a provided value getter function.
 *
 * @param params An object containing the array to convert, the ID getter function, and an optional value getter function.
 * @returns A Map object with items from the array indexed by their IDs, and potentially transformed values.
 */
export const convertArrayToMap = <T, Key, R = T>(
  params: ConvertArrayToMapParams<T, Key, R>,
): Map<Key, R> => {
  const { array, getId, getValues } = params;

  const map = new Map<Key, R>();

  array?.forEach((item) => {
    const id = getId(item);
    const value = getValues ? getValues(item) : (item as unknown as R);

    map.set(id, value);
  });

  return map;
};
