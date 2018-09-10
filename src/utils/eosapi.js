import network from './network';
import EosApi from 'eosjs-api';

export default EosApi({
  httpEndpoint: `${network.protocol}://${network.host}:${network.port}`,
  chainId: network.chainId
});