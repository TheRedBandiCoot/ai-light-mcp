import { changeColor, LightOnOrOff } from './service.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'Wipro Smart Bulb',
  version: '1.0.0',
  capabilities: {
    resources: {},
    tools: {}
  }
});

/**@Tool For Turn On Bulb*/
server.tool('turn-on-bulb', 'Turn the bulb On', async () => {
  await LightOnOrOff();
  return { content: [{ type: 'text', text: 'Your Smart Bulb has been Turn On' }] };
});

/**@Tool For Turn On Bulb*/
server.tool('turn-off-bulb', 'Turn the bulb Off', async () => {
  await LightOnOrOff(false);
  return { content: [{ type: 'text', text: 'Your Smart Bulb has been Turn Off' }] };
});

/**@Tool For Change bulb color*/
server.tool(
  'change-bulb-color',
  'Change the color of the bulb',
  {
    h: z.number().describe('Hue of the light where range 0 - 360'),
    s: z.number().describe('Saturation  of the light where range 0 - 1000'),
    v: z.number().describe('value  of the light where range 0 - 1000'),
    temperature: z
      .number()
      .describe(
        'The color temperature of the light where range 0 - 1000, only for white color light temperature range change for other color always 0'
      ),
    bright: z
      .number()
      .describe(
        'The brightness value of the light where range 0 - 1000, only for white color light bright range change for other color always 0'
      )
  },
  async ({ h, s, v, temperature, bright }) => {
    await changeColor({ h, s, v, temperature, bright });
    return { content: [{ type: 'text', text: 'Your Smart Bulb Color has been changed' }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Wipro Smart Bulb MCP Server Is Running');
}

main();
