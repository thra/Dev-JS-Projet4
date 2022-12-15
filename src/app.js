/* Inject css */
require('./styles/modal.css')

require('./components/modal')

// Bump version
const { spanVersion } = require('./components/domLinker')
// eslint-disable-next-line no-undef
spanVersion.innerText = VERSION
