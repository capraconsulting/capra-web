import { eventQuery as query, type Event } from "$lib/sanity/queries";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { registrationSchema } from "$lib/schemas/registrationSchema";
import { supabase } from "$lib/supabase/client";
import type { AllergyEnum } from "$models/allergy.model";

export const load: PageServerLoad = async (event) => {
  const { loadQuery } = event.locals;
  const { id } = event.params;

  const params = { id };
  const initial = await loadQuery<Event>(query, params);

  const form = await superValidate(zod(registrationSchema));

  return {
    query,
    params,
    options: { initial },
    form,
  };
};

export const actions: Actions = {
  submitRegistration: async ({ request, params }) => {
    const form = await superValidate(request, zod(registrationSchema));

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    const documentId = params.id;

    const participantResult = await supabase.from("event_participant").insert({
      document_id: documentId,
      full_name: form.data.name,
      telephone: form.data.telephone,
      email: form.data.email,
      firm: form.data.firm,
    });

    let allergies: AllergyEnum[] = form.data.allergies;

    if (allergies.length) {
      const allergyResult = await supabase.from("event_allergies").insert({
        document_id: documentId,
        allergy: createAllergiesString(allergies),
      });

      if (allergyResult.error) {
        return fail(500);
      }
    }
    if (participantResult.error) {
      return fail(500);
    }
    return;
  },
};

function createAllergiesString(allergies: AllergyEnum[]): string {
  const sortedAllergies = allergies.sort((a, b) => a.localeCompare(b));
  const lowerCasedAllergies = sortedAllergies.map((allergy, index) =>
    index === 0 ? allergy : allergy.toLowerCase()
  );
  lowerCasedAllergies[0] =
    lowerCasedAllergies[0][0].toUpperCase() + lowerCasedAllergies[0].slice(1).toLowerCase();
  return lowerCasedAllergies.join(", ");
}
