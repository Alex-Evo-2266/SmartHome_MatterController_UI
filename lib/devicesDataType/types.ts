type CapabilityMinima = {
  caseSessionsPerFabric: number;
  subscriptionsPerFabric: number;
};

type BasicInformation = {
  dataModelRevision: number;
  vendorName: string;
  vendorId: number;
  productName: string;
  productId: number;
  nodeLabel: string;
  location: string;
  hardwareVersion: number;
  hardwareVersionString: string;
  softwareVersion: number;
  softwareVersionString: string;
  manufacturingDate: string;
  partNumber: string;
  productUrl: string;
  productLabel: string;
  serialNumber: string;
  localConfigDisabled: boolean;
  reachable: boolean;
  uniqueId: string;
  capabilityMinima: CapabilityMinima;

  // optional/raw поля (индексированные)
  [key: string]: any;
};

type DeviceMeta = {
  ethernetConnected: boolean;
  wifiConnected: boolean;
  threadConnected: boolean;
  rootEndpointServerList: number[];
  isBatteryPowered: boolean;
  isIntermittentlyConnected: boolean;
  isThreadSleepyEndDevice: boolean;
  dataRevision: number;
};

type DeviceData = {
  basicInformation: BasicInformation;
  deviceMeta: DeviceMeta;
};

export type MatterDevice = {
  nodeId: string;
  operationalAddress: string;
  deviceData: DeviceData;
};