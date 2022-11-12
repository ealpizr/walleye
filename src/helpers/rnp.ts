import crypto from "crypto";
import { parseJSON, parseParams } from "../utils";
import { RNPDIGITAL_API_URL } from "../utils/constants";

interface PublicKeyApiResponse {
  success: boolean;
  data: {
    publicKey: string;
  };
}

export const getPublicKey = async () => {
  const response = await fetch(RNPDIGITAL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: parseParams({ action: "publicKeyApi" }),
  });
  const body = (await parseJSON(response)) as PublicKeyApiResponse;
  const key = body.data.publicKey.replace("\n", "");

  return `-----BEGIN PUBLIC KEY-----\n${key}\n-----END PUBLIC KEY-----`;
};

export const getEncryptedPassword = (password: string, key: string) => {
  return crypto
    .publicEncrypt(
      {
        key,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(password)
    )
    .toString("base64");
};
