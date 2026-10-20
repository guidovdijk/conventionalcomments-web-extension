import { defineExtensionMessaging } from "@webext-core/messaging";
import type { Label } from "~/lib/constants";

interface ProtocolMap {
  getRegisteredUrls(): string[];
  registerUrl(url: string): void;
  unregisterUrl(url: string): void;
  getAnnouncements(): string[];
  markAnnoucementAsRead(announcement: string): void;
  notifyUnregister(tabId: number): void;
  getDefaultLabel(): Label;
  setDefaultLabel(label: Label): void;
  notifyDefaultLabelChange(label: Label): void;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
