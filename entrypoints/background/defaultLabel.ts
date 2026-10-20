import invariant from "tiny-invariant";
import { storage } from "#imports";
import type { Label } from "~/lib/constants";

const KEY = "local:defaultLabel" as const;

async function getDefaultLabel(): Promise<Label> {
  const label = await storage.getItem<Label>(KEY);
  invariant(label !== null, "defaultLabel should never be null");
  return label;
}

async function setDefaultLabel(label: Label): Promise<void> {
  await storage.setItem(KEY, label);
}

export { getDefaultLabel, setDefaultLabel };
