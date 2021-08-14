import DistanceGatewayAPI from './DistanceGateway';

export default class DistanceGatewayAPIMemory implements DistanceGatewayAPI {
  calculate(originZipcode: string, destinationZipcode: string): number {
    return 1000;
  }
}