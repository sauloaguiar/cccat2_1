export default interface DistanceGatewayAPI {
  calculate(originZipcode: string, destinationZipcode: string): number;
}