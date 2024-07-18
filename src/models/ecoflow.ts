export interface EcoflowDeviceModel {
  sn: string;
  productName: string;
  deviceName: string;
  online: number;
}

export class EcoflowDeviceInfoModel {
  'bmsMaster.soc': number;
  'bmsMaster.temp': number;
  'bmsMaster.cycles': number;
  'pd.remainTime': number;
  'pd.wattsInSum': number;
  'pd.wattsOutSum': number;
}
