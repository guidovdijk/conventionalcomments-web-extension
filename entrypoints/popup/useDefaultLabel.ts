import { useCallback, useEffect, useState } from "react";
import invariant from "tiny-invariant";
import type { DefaultLabelState } from "~/components/custom/PopupDefaultLabel";
import { sendMessage } from "~/lib/messaging";

export default function useDefaultLabel(): [
  DefaultLabelState,
  (label: string) => Promise<void>,
] {
  const [defaultLabelState, setDefaultLabelState] = useState<DefaultLabelState>(
    { status: "loading" },
  );

  useEffect(() => {
    sendMessage("getDefaultLabel")
      .then((label) =>
        setDefaultLabelState({ status: "loaded", label, error: null }),
      )
      .catch(() =>
        setDefaultLabelState({
          status: "error",
          error:
            "Something went wrong when retrieving the default label. Please, report a bug if the problem persists.",
        }),
      );
  }, []);

  const onDefaultLabelChange = useCallback(
    async (label: string): Promise<void> => {
      invariant(
        defaultLabelState.status !== "loading",
        "The default label cannot change while loading",
      );
      setDefaultLabelState({ status: "loaded", label, error: null });
      try {
        await sendMessage("setDefaultLabel", label);
      } catch {
        setDefaultLabelState({
          ...defaultLabelState,
          error:
            "Something went wrong when saving the default label. Please, report a bug if the problem persists.",
        });
      }
    },
    [defaultLabelState],
  );

  return [defaultLabelState, onDefaultLabelChange];
}
