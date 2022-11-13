import type { ErrorResponse, TSEData } from "../types";
import { UNKNOWN_ERROR_MESSAGE } from "../utils/constants";

const TSE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/tse`;

class TSEService {
  static queryByID = (id: string): Promise<TSEData> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${TSE_API_URL}/id`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: id,
          }),
        });
        const body = await response.json();
        if (response.status !== 200) {
          return reject(
            (body as ErrorResponse).message || UNKNOWN_ERROR_MESSAGE
          );
        }
        resolve(body as TSEData);
      } catch (error) {
        reject(UNKNOWN_ERROR_MESSAGE);
      }
    });
  };

  static queryByName = (name: string): Promise<Partial<TSEData>[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${TSE_API_URL}/name`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: name,
          }),
        });
        const body = await response.json();
        if (response.status !== 200) {
          return reject(
            (body as ErrorResponse).message || UNKNOWN_ERROR_MESSAGE
          );
        }
        resolve(body as TSEData[]);
      } catch (error) {
        reject(UNKNOWN_ERROR_MESSAGE);
      }
    });
  };
}

export default TSEService;
