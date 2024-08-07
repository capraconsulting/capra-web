import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Flex, Grid, Heading, Spinner, Stack, Text } from "@sanity/ui";
import { getEventFoodPreferenceList } from "../../supabase/queries";

export default function EventFoodPreference({ documentId }: { documentId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["event-food-preference-list", documentId],
    queryFn: () => getEventFoodPreferenceList({ documentId }),
  });

  const cardProps = { border: true, padding: 3, radius: 2 };

  if (isLoading) {
    return (
      <Grid gap={4}>
        <Spinner muted />
      </Grid>
    );
  }

  if (isError)
    return (
      <Grid gap={4}>
        <Text muted size={1}>
          Arrangement
        </Text>
        <Heading as={"h2"} size={4} style={{ paddingTop: "3.5px" }}>
          En feil har oppstått
        </Heading>
      </Grid>
    );

  if (!data?.length) {
    return (
      <Grid gap={4}>
        <Text muted size={1}>
          Arrangement
        </Text>
        <Heading as={"h2"} size={4} style={{ paddingTop: "3.5px" }}>
          Ingen matpreferanser/allergier
        </Heading>
      </Grid>
    );
  }

  return (
    <>
      <Grid gap={4}>
        <Text muted size={1}>
          Arrangement
        </Text>
        <Heading as={"h2"} size={4} style={{ paddingTop: "3.5px" }}>
          Matpreferanser/allergier ({data.length})
        </Heading>
      </Grid>

      <Grid gap={4} style={{ maxHeight: "400px", overflowY: "scroll", marginTop: "3rem" }}>
        {data.map(({ value }, index) => (
          <Card {...cardProps} key={index}>
            <Stack space={4}>
              <Flex align="center">
                <Text>{value}</Text>
              </Flex>
            </Stack>
          </Card>
        ))}
      </Grid>
    </>
  );
}
