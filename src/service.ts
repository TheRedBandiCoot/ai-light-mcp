import { TuyaContext } from '@tuya/tuya-connector-nodejs';
import 'dotenv/config';

const device_id = process.env.DEVICE_ID as string;
const baseUrl = process.env.BASE_URL as string;
const accessKey = process.env.ACCESS_KEY as string;
const secretKey = process.env.SECRET_KEY as string;

const tuya = new TuyaContext({ baseUrl, accessKey, secretKey });

export async function deviceDetail() {
  try {
    const statusResp = await tuya.deviceStatus.status({ device_id });
    if (!statusResp.success) return console.log('Something Went Wrong, Status wrong');

    const resultArr = Array.isArray(statusResp.result) ? statusResp.result : [];

    const switchLedObj = resultArr.find(({ code }: { code?: string }) => code === 'switch_led');
    if (!switchLedObj || typeof switchLedObj.value !== 'boolean') {
      console.log('switch_led status not found or value is not boolean');
      return;
    }
    const switchLedValue: boolean = switchLedObj.value;

    const device = await tuya.request({
      method: 'POST',
      path: `/v2.0/cloud/thing/${device_id}/shadow/properties/issue`,
      body: {
        properties: {
          switch_led: !switchLedValue
        }
      }
    });
    console.log(
      `${device.success ? `Light ${switchLedValue ? 'Off' : 'On'}` : 'Something Went Wrong!!!'}`
    );
  } catch (error) {
    console.log('👎👎👎👎👎 Error 👎👎👎👎👎', error);
    process.exit(1);
  }
}
