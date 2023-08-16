const path = require('path');

exports.rootDir = path.dirname(require.main.filename); // This will return root directory
exports.staticDir = path.join(this.rootDir, 'public');


