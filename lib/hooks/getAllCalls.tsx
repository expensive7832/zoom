"use client";

import {
  Call,
  useCall,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { useSelector } from "../redux/store";
import { Description } from "@radix-ui/react-toast";
import { useToast } from "@/components/ui/use-toast";

function GetAllCalls() {
  const user = useSelector((state: any) => state?.user?.info);

  const client = useStreamVideoClient();

  const [loading, setLoading] = useState(false);

  const [calls, setCalls] = useState<Call[]>();

  try {
    if (!user) throw new Error("authentication failed");

    if (!client) throw new Error("error, please try again later");

    useEffect(() => {
      const loadCalls = async () => {
        setLoading(true);

        const { calls } = await client?.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user?.uid },
              { members: { $in: [user?.uid] } },
            ],
          },
        });

        setLoading(false);
        setCalls(calls);
      };

      loadCalls();
    }, [client, user]);
  } catch (err: any) {
    alert(err?.message);
  }

  let now = new Date();

  let endedMeeting = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  let upcomingMeeting = calls?.filter(
    ({ state: { startsAt, endedAt } }: Call) => {
      return startsAt && new Date(startsAt) > now;
    }
  );

  return {
    loading,
    endedMeeting,
    upcomingMeeting,
    recordings: calls,
  };
}

export default GetAllCalls;
