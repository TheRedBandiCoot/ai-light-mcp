import { TuyaContext, TuyaResponse } from '@tuya/tuya-connector-nodejs';
import 'dotenv/config';
import { env } from './env.js';

const device_id = env.DEVICE_ID;
const baseUrl = env.BASE_URL;
const accessKey = env.ACCESS_KEY;
const secretKey = env.SECRET_KEY;

const tuya = new TuyaContext({ baseUrl, accessKey, secretKey });

export async function controlBulb() {
  try {
    const statusResp = await tuya.deviceStatus.status({ device_id });
    if (!statusResp.success) return console.log('Something Went Wrong, Status wrong');

    const switchLedObj = statusResp.result.find(
      ({ code }: { code?: string }) => code === 'switch_led'
    );

    const device = await tuya.request({
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
    console.log(
      `${
        device.success ? `Light ${switchLedObj?.value ? 'Off' : 'On'}` : 'Something Went Wrong!!!'
      }`
    );
  } catch (error) {
    console.log('👎👎👎👎👎 Error 👎👎👎👎👎', error);
    process.exit(1);
  }
}
