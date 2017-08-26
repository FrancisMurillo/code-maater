/* eslint no-process-env: 0 */
/* eslint no-magic-numbers: 0 */
const clientPort = process.env.PORT ?
    parseInt(process.env.PORT, 10) : 23000;

export default {
    "apiHost": `http://localhost:${clientPort + 1}`,
    "persistence": {"whitelist": []}
};
