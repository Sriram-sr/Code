const path = require('path');

exports.rootDir = path.dirname(require.main.filename);
exports.staticDir = path.join(this.rootDir, 'public');