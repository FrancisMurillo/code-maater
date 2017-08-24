/* eslint no-process-env: 0 */
const clientPort = process.env.PORT;

export default {"apiHost": `http://127.0.0.1:${clientPort + 1}`};
