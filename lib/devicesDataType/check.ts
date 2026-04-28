import { MatterDevice } from "./types";

export function isMatterDevice(obj: any): obj is MatterDevice {
  if (!obj || typeof obj !== "object") return false;

  const bi = obj.deviceData?.basicInformation;
  const dm = obj.deviceData?.deviceMeta;

  return (
    typeof obj.nodeId === "string" &&
    typeof obj.operationalAddress === "string" &&

    bi &&
    typeof bi.vendorName === "string" &&
    typeof bi.vendorId === "number" &&
    typeof bi.productName === "string" &&
    typeof bi.productId === "number" &&
    typeof bi.serialNumber === "string" &&
    typeof bi.reachable === "boolean" &&

    dm &&
    typeof dm.wifiConnected === "boolean" &&
    typeof dm.ethernetConnected === "boolean" &&
    typeof dm.threadConnected === "boolean" &&
    Array.isArray(dm.rootEndpointServerList)
  );
}