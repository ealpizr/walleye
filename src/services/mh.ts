import { clientEnv } from "../env/schema.mjs";
import type { ErrorResponse, MHData } from "../types";
import { UNKNOWN_ERROR_MESSAGE } from "../utils/constants";

class MHService {
  static queryByID = (id: string): Promise<MHData> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${clientEnv.NEXT_PUBLIC_BASE_URL}/api/mh`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: id,
            }),
          }
        );
        const body = await response.json();
        if (response.status !== 200) {
          return reject(
            (body as ErrorResponse).message || UNKNOWN_ERROR_MESSAGE
          );
        }
        resolve(body as MHData);
      } catch (error) {
        reject(UNKNOWN_ERROR_MESSAGE);
      }
    });
  };
}

export default MHService;
