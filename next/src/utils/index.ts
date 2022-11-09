// Used to type the NextAPIRequest object
export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export const isNumber = (s: any) => !isNaN(parseFloat(s)) && !isNaN(s - 0);

// Coverts a JSON Object to x-www-form-urlencoded
export const parseParams = (params: {}) =>
  Object.keys(params)
    .map((key) => {
      return (
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(params[key as keyof typeof params])
      );
    })
    .join("&");
