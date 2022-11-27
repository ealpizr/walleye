import type { HTMLElement } from "node-html-parser";

// Used to type the NextAPIRequest object
export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export const isNumber = (s: any) => !isNaN(parseFloat(s)) && !isNaN(s - 0);

export const isValidID = (id: string) => isNumber(id) && id.length === 9;

// Coverts a JSON Object to x-www-form-urlencoded
export const parseParams = (params: Record<string, unknown>) =>
  Object.keys(params)
    .map((key) => {
      return (
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(String(params[key as keyof typeof params]))
      );
    })
    .join("&");

export const parseJSON = async (response: Response) =>
  JSON.parse((await response.text()).trim());

export const parseCookies = (cookies: string): string => {
  return cookies
    .split(",")
    .map((c) => c.split(";")[0] || "")
    .join("; ");
};

export const getTSEPageValidations = (pageBody: HTMLElement) => {
  const viewState = pageBody
    .getElementById("__VIEWSTATE")
    .getAttribute("value");
  const eventValidation = pageBody
    .getElementById("__EVENTVALIDATION")
    .getAttribute("value");

  return [viewState, eventValidation];
};
