import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

const supabase = createClient<Database>(
  process.env.SANITY_STUDIO_SUPABASE_URL!,
  process.env.SANITY_STUDIO_SUPABASE_KEY!
);

export async function fetchEventParticipants({ documentId }: { documentId: string }) {
  try {
    const { data, error } = await supabase
      .from("event_participant")
      .select()
      .eq("document_id", documentId); // TODO: Only show attending

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
