import { TuyaContext } from '@tuya/tuya-connector-nodejs';
import 'dotenv/config';

const device_id = process.env.DEVICE_ID;
const baseUrl = process.env.BASE_URL;
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;

const tuya = new TuyaContext({ baseUrl, accessKey, secretKey });

async function deviceDetail() {
  try {
    let status = await tuya.deviceStatus.status({ device_id });
    if (!status.success) return console.log('Something Went Wrong, Status wrong');

    status = status.result.filter(({ code }) => code === 'switch_led')[0].value;

    const device = await tuya.request({
      method: 'POST',
      path: `/v2.0/cloud/thing/${device_id}/shadow/properties/issue`,
      body: {
        properties: {
          switch_led: !status
        }
      }
    });
    console.log(`${device.success ? `Light ${status ? 'Off' : 'On'}` : 'Something Went Wrong!!!'}`);
  } catch (error) {
    console.log('👎👎👎👎👎 Error 👎👎👎👎👎', error);
    process.exit(1);
  }
}

deviceDetail();
