import { clientEnv } from "../env/schema.mjs";
import type { CCSSData, ErrorResponse } from "../types";
import { UNKNOWN_ERROR_MESSAGE } from "../utils/constants";

class CCSSService {
  static queryByID = (id: string): Promise<CCSSData> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${clientEnv.NEXT_PUBLIC_BASE_URL}/api/ccss`,
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
        resolve(body as CCSSData);
      } catch (error) {
        reject(UNKNOWN_ERROR_MESSAGE);
      }
    });
  };
}

export default CCSSService;
