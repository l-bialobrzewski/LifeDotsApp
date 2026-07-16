import crypto from "crypto";

/**
 * Szyfrowanie notatek dziennikowych (dane art. 9 RODO — patrz docs/dpia.md).
 *
 * AES-256-GCM, klucz z NOTE_ENCRYPTION_KEY (base64, 32 bajty).
 * WYLACZNIE do uzytku po stronie serwera (Route Handlers / Server Actions) —
 * nigdy nie importowac w komponentach klienckich, klucz nie moze trafic do bundla.
 */

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

function getKey(): Buffer {
  const keyBase64 = process.env.NOTE_ENCRYPTION_KEY;
  if (!keyBase64) {
    throw new Error(
      "NOTE_ENCRYPTION_KEY nie jest ustawiony. Wygeneruj: " +
        "node -e \"console.log(require('crypto').randomBytes(32).toString('base64'))\""
    );
  }
  const key = Buffer.from(keyBase64, "base64");
  if (key.length !== 32) {
    throw new Error("NOTE_ENCRYPTION_KEY musi dekodowac sie do 32 bajtow.");
  }
  return key;
}

/** Zwraca ciphertext w formacie base64(iv):base64(authTag):base64(ciphertext). */
export function encryptNote(plaintext: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const ciphertext = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [
    iv.toString("base64"),
    authTag.toString("base64"),
    ciphertext.toString("base64"),
  ].join(":");
}

export function decryptNote(payload: string): string {
  const key = getKey();
  const [ivB64, authTagB64, ciphertextB64] = payload.split(":");
  if (!ivB64 || !authTagB64 || !ciphertextB64) {
    throw new Error("Nieprawidlowy format zaszyfrowanej notatki.");
  }

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(ivB64, "base64")
  );
  decipher.setAuthTag(Buffer.from(authTagB64, "base64"));

  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(ciphertextB64, "base64")),
    decipher.final(),
  ]);

  return plaintext.toString("utf8");
}
