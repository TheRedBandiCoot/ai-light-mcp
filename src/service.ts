import { TuyaContext } from '@tuya/tuya-connector-nodejs';
import 'dotenv/config';
import { env } from './env.js';
import type { ChangeColorRequestType, ControlDataCommandValueType } from '../types/service.type.js';

const device_id = env.DEVICE_ID;
const baseUrl = env.BASE_URL;
const accessKey = env.ACCESS_KEY;
const secretKey = env.SECRET_KEY;

const tuya = new TuyaContext({ baseUrl, accessKey, secretKey });
/**
 * @summary
 * Light On, Off totally controlled by itself by check the light status*/
export async function controlBulb() {
  try {
    const statusResp = await tuya.deviceStatus.status({ device_id });
    if (!statusResp.success) return console.log('Something Went Wrong, Status wrong');

    /**TS Error Fix : node_modules\@tuya\tuya-connector-nodejs\lib\service\device\status.d.ts -> type DeviceStatusServiceStatusResult ->  status(param: DeviceStatusServiceStatusParam): Promise<TuyaResponse<DeviceStatusServiceStatusResult[]>>*/
    //@ts-ignore
    const switchLedObj = statusResp.result.find(
      ({ code }: { code?: string }) => code === 'switch_led'
    );

    /*const device =*/ await tuya.request({
      method: 'POST',
      path: `/v1.0/iot-03/devices/${device_id}/commands`,
      body: {
        commands: [
          {
            code: 'switch_led',
            value: !switchLedObj?.value
          }
        ]
      }
    });
    // console.log(`${device.success ? `Light ${switchLedObj?.value ? 'Off' : 'On'}` : 'Something Went Wrong!!!'}`);
  } catch (error) {
    console.log('👎👎👎👎👎 Error 👎👎👎👎👎', error);
    process.exit(1);
  }
}
/**
 * @summary
 * Light On, Off using Boolean value - Default TRUE
 */
export async function LightOnOrOff(on: boolean = true) {
  try {
    /*const device =*/ await tuya.request({
      method: 'POST',
      path: `/v1.0/iot-03/devices/${device_id}/commands`,
      body: {
        commands: [
          {
            code: 'switch_led',
            value: on
          }
        ]
      } as ChangeColorRequestType
    });
    // console.log(`${device.success ? `Light ${on ? 'On' : 'Off'}` : 'Something Went Wrong!!!'}`);
  } catch (error) {
    console.log('👎👎👎👎👎 Error 👎👎👎👎👎', error);
    process.exit(1);
  }
}
/**
 * @example
 * temperature: 500
 * bright: 1000
 * h: 102
 * s: 511
 * v: 899
 */
export async function changeColor({
  h,
  s,
  v,
  temperature,
  bright
}: Omit<ControlDataCommandValueType, 'change_mode'>) {
  try {
    /*const device =*/ await tuya.request<ChangeColorRequestType>({
      method: 'POST',
      path: `/v1.0/iot-03/devices/${device_id}/commands`,
      body: {
        commands: [
          { code: 'switch_led', value: true },
          {
            code: 'control_data',
            value: { change_mode: 'direct', temperature, bright, h, s, v }
          }
        ]
      } as ChangeColorRequestType
    });
    // console.log(`${device.success ? `Light Color Change` : 'Something Went Wrong!!!'}`);
  } catch (error) {
    console.log('👎👎👎👎👎 Error 👎👎👎👎👎', error);
    process.exit(1);
  }
}
