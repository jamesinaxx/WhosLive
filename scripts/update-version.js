const path = require('path');
const fs = require('fs');
const packageJson = require('../package.json');
const manifest = require('../manifest.json');

const { version } = packageJson;
manifest.version = version;

const manfiestOutputPath = path.join(__dirname, '../manifest.json');
fs.writeFileSync(manfiestOutputPath, JSON.stringify(manifest, null, 2));
