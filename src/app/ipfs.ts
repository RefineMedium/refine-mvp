declare var require: any;
const IPFS = require("ipfs-api");
const node = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});
export default node;
