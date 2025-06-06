# 💡 AI Light MCP

A local MCP (Model Context Protocol) server for controlling Wipro smart bulbs using Node.js and AI tools like Claude or VS Code.

---

## 📚 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Setup](#️-setup)
- [Environment Variables](#-environment-variables)
- [Final Build & MCP Launch](#-final-build--mcp-launch)
- [Contributing](#-contributing)
- [Acknowledgments](#-acknowledgments)
- [Resource](#-resource)
- [License](#-license)

---

## ✨ Features

- 🧠 Integrates with VsCode or Claude desktop via MCP
- 💡 Control Wipro smart bulbs via the `Tuya Cloud API`
- ⚙️ Easily configurable using `.env` and MCP config files
- 🔌 Runs locally — no cloud dependency for execution
- 🛠️ Modular and extendable for other IoT devices

---

## 📋 Prerequisites

- ##### 📦 [NodeJS](https://nodejs.org/en/download) (v18 or later recommended)
- ##### 📱 Smart Life ([IOS](https://apps.apple.com/us/app/smart-life-smart-living/id1115101477)/[Android](https://play.google.com/store/apps/details?id=com.tuya.smartlife&hl=en_IN))
- ##### 💡 Wipro Bulb

---

## 📁 Project Structure

```bash
ai-light-mcp/
├── .git/ # Git version control
├── .vscode/
│ └── mcp.json # MCP configuration for local dev tools
├── dist/ # Compiled JavaScript files (build output)
├── node_modules/ # Node.js dependencies
├── src/ # TypeScript source files
│ ├── env.ts # Environment loader or helpers
│ ├── index.ts # Entry point for the MCP server
│ └── service.ts # Core logic for bulb control
├── types/ # Type definitions (global or shared)
│ └── service.type.ts # Custom type declarations
├── .env # Local environment variables (not committed)
├── .gitignore # Files/folders to ignore in Git
├── package-lock.json # NPM lockfile for reproducible installs
├── package.json # Project metadata, scripts, dependencies
├── README.md # Documentation (you’re reading it!)
└── tsconfig.json # TypeScript configuration

```

---

## 📦 Installation

Clone the repo:

```bash
git clone https://github.com/TheRedBandiCoot/ai-light-mcp.git
cd ai-light-mcp
npm install
```

---

## ⚙️ Setup

#### 1. Create `.env` file in your root directory

- In the project root, create a .env file and populate it with the required variables (see [Environment Variables](#-environment-variables)).

#### 2. Setup `Tuya` Cloud service for control the bulb

1. Visit the [Tuya IoT Developer Platform](https://www.tuya.com/) → Search for **Developer Platform**
2. Log in or sign up, then go to the [Cloud Project Console](https://platform.tuya.com/cloud/).
3. Click `Create Cloud Project` and fill in:
   - **Name**: e.g., `ai-mcp-bulb`
   - **Industry**: `Smart Home`
   - **Development Method**: `Custom`
   - **Data Center**: `India Data Center` (or one closest to you)
   - Select these API services:
     - `IoT Core`
     - `Smart Home Basic Service`
     - `Device Status Notification`
     - `Industry Basic Service`
4. Click **Authorize** (can be done later from `Service API` > `Go Authorize`)
5. Once inside the dashboard, change `Guide Mode` to **Smart Home**
6. `Go to Devices` > `Link App Account` > `Add App Account`
7. Scan the **_QR code_** using the **Smart Life app** (see next step)

#### 3. Smart Life App Setup

1. Download and open the Smart Life app
2. Log in or register
3. Add your Wipro bulb by tapping `+` > `Add Device`
   - Make sure the bulb is in pairing mode (turn it off/on 7–8 times rapidly)
4. After pairing, go to the app profile, open the QR scanner, and scan the code shown in the Tuya dashboard
5. Approve the linking request

#### 4. Control Device from Tuya Dashboard

1. Go to `Devices` > `All Devices`
2. Under `Device Permission`, change from `Read` to `Controllable`
3. Click `Debug Device` → Note the `IP Address` from `Extension Information`
   > You'll need this IP to allow cloud access in the next step.
4. Copy the `Device ID` from `Basic Information`
   > This is your **ENV 1** value.
5. Use the **Device Debugging** tab to test controlling the bulb.
   <details> 
      <summary>📽️ Click to view demo</summary>

   ![Demo](assets/demo-gif.gif)

      </details>

#### 5. Allow Cloud Authorization IP

In your project’s `Overview` section:

- Toggle **Cloud Authorization IP Allowlist**
- Add your device's IP address (found in the Debug section)

#### 6. Authorization Keys

In `Overview` → `Authorization Key`:

- Copy your **Access ID / Client ID** → (**ENV 2**)
- Copy your **Access Secret / Client Secret** → (**ENV 3**)

---

## 🌿 Environment Variables

Create a `.env` file in your root directory with the following:
| Name | Description |
| -| - |
| Device ID | Your Wipro bulb's Device ID (from **Tuya device details**)|
| Access ID/Client ID | Tuya project's Access ID |
| Access Secret/Client Secret | Tuya project's Access Secret |
| BASE_URL | Tuya API base URL — `https://openapi.tuyain.com` |

---

## 🔧 Final Build & MCP Launch

Once all setup is complete:

```bash
$ npm run build
```

Start the server via VS Code MCP:

- Go to `.vscode/mcp.json` and `start` the server.

```bash
# Example output:
[server stderr] Wipro Smart Bulb MCP Server Is Running
[info] Discovered 3 tools
```

Now use Copilot/Claude Desktop and ask:

- `Turn on the light`
- `Set color to blue`
- `Turn off the light`

✅ Make sure to **grant tool permissions** when prompted.

---

## 🤝 Contributing

Pull requests are welcome!
For significant changes, please open an issue to discuss your ideas first.

---

## 🙌 Acknowledgments

- Inspired by [Piyush Garg | MCP Server for Smart Bulb with Claude](https://www.youtube.com/watch?v=bWFWeolDGcM)

---

## 📚 Resource

- [Tuya Developer Docs](https://developer.tuya.com/en/docs/iot)
- [Cloud Development Guide](https://developer.tuya.com/en/docs/iot/introduction-to-tuya-iot-platform?id=Ka6vijvqb3uhn)
- [Node.js SDK GitHub Repo](https://github.com/tuya/tuya-connector-Nodejs)
- [Standard Instruction Set](https://developer.tuya.com/en/docs/iot/standarddescription?id=K9i5ql6waswzq)
- [Lighting → dj Category](https://developer.tuya.com/en/docs/iot/categorydj?id=Kaiuyzy3eheyy)

---

## 📝 License

© Microsoft Corporation. Licensed under the [MIT License](LICENSE.txt) .
