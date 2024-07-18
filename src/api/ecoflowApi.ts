import axios from "axios";
import {EcoflowDeviceInfoModel, EcoflowDeviceModel} from "../models/ecoflow";
import {getCurrentTimeMillis, getNonce, getSignature} from "./utils";

export const ECOFLOW_ACCESS_KEY = '{access_key}';
export const ECOFLOW_SECRET_KEY = '{secret_key}';
export const ECOFLOW_HOST = 'api-e.ecoflow.com';

export async function getEcoflowDeviceList(): Promise<EcoflowDeviceModel[]> {
  const response = await axios.get(
    `https://${ECOFLOW_HOST}/iot-open/sign/device/list`,
    getRequestConfig(getNonce(), getCurrentTimeMillis()));

  return response.data.data;
}

export async function getEcoflowDeviceQuota(sn: string): Promise<EcoflowDeviceInfoModel> {
  const response = await axios.get(
    `https://${ECOFLOW_HOST}/iot-open/sign/device/quota/all?sn=${sn}`,
    getRequestConfig(getNonce(), getCurrentTimeMillis(), `sn=${sn}`));

  return response.data.data;
}

function getRequestConfig(nonce: number, timestamp: number, parameters: string = '') {
  return {
      headers: {
        accessKey: ECOFLOW_ACCESS_KEY,
        nonce: nonce,
        timestamp: timestamp,
        sign: getSignature(getString(nonce, timestamp, parameters), ECOFLOW_SECRET_KEY)
    }
  }
}

function getString(nonce: number, timestamp: number, parameters: string = '') {
  const str = `accessKey=${ECOFLOW_ACCESS_KEY}&nonce=${nonce}&timestamp=${timestamp}`;

  return parameters.length ? `${parameters}&${str}` : `${str}`;
}

