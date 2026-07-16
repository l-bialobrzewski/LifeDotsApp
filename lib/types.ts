export type MoodValue = 1 | 2 | 3 | 4 | 5;

export interface Profile {
  id: string;
  display_name: string | null;
  birth_date: string | null; // ISO date
  life_expectancy_years: number;
  created_at: string;
  updated_at: string;
}

export interface DotEntry {
  id: string;
  user_id: string;
  entry_date: string; // ISO date, yyyy-mm-dd
  mood_value: MoodValue | null;
  note_encrypted: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

/** Wersja odszyfrowana do uzytku w UI — nigdy nie zapisywana bezposrednio do DB. */
export interface DecryptedDotEntry extends Omit<DotEntry, "note_encrypted"> {
  note: string | null;
}

export type ConsentType = "health_mood_data" | "marketing_email";

export interface Consent {
  id: string;
  user_id: string;
  consent_type: ConsentType;
  policy_version: string;
  granted_at: string | null;
  withdrawn_at: string | null;
  created_at: string;
}

export type DataRequestType = "export" | "delete";
export type DataRequestStatus = "pending" | "completed" | "failed";

export interface DataRequest {
  id: string;
  user_id: string;
  request_type: DataRequestType;
  status: DataRequestStatus;
  requested_at: string;
  completed_at: string | null;
}
