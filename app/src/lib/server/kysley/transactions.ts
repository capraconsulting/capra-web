import { type Transaction } from "kysely";
import { kysely } from "$lib/server/kysley/client";
import type { KyselyDatabase } from "$models/kysely.model";
import type { Tables } from "$models/database.model";

export async function executeTransaction<T>(
  callback: (transaction: Transaction<KyselyDatabase>) => Promise<T>
) {
  return await kysely.transaction().execute(async (transaction) => await callback(transaction));
}

export const deleteEventParticipant = async (
  transaction: Transaction<KyselyDatabase>,
  { event_id, email }: Pick<Tables<"event_participant">, "email" | "event_id">
) => {
  return await transaction
    .deleteFrom("event_participant")
    .where("event_id", "=", event_id)
    .where("email", "=", email)
    .execute();
};

export const insertAndGetEventParticipant = async (
  transaction: Transaction<KyselyDatabase>,
  participant: Partial<
    Pick<Tables<"event_participant">, "attending_digital" | "firm" | "telephone">
  > &
    Pick<Tables<"event_participant">, "email" | "event_id" | "full_name">
) => {
  return await transaction
    .insertInto("event_participant")
    .values(participant)
    .returning("event_participant_id")
    .executeTakeFirstOrThrow();
};

export const insertEventParticipantOptions = async (
  transaction: Transaction<KyselyDatabase>,
  options: Tables<"event_participant_option">[]
) => {
  return await transaction.insertInto("event_participant_option").values(options).execute();
};

export const insertEventFoodPreference = async (
  transaction: Transaction<KyselyDatabase>,
  values: Pick<Tables<"event_food_preference">, "event_id" | "value">
) => {
  return await transaction.insertInto("event_food_preference").values(values).execute();
};
