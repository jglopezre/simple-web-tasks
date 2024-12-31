import { UrlAdresses } from '@/types';

type Protocol = 'http' | 'https';
type Port = '3001' | '443';


export class ServerUrlForFetching {
  private readonly protocol: Protocol;

  
  private readonly domain: string;

 
  private readonly port: Port;

  
  private readonly routePrefix: string;

  
  private rootRoute: UrlAdresses;

  constructor(route: UrlAdresses) {
    this.rootRoute = route;
    this.routePrefix = '/api';

    // For deployment on backend server
    this.protocol = 'https';
    this.port = '443';
    this.domain = 'simple-web-tasks.onrender.com';

    // For development in a local machine
    /* this.protocol = 'http';
    this.port = '3001';
    this.domain = 'localhost'; */
  }

  get fetchingUrl() {
    const url = `${this.protocol}://${this.domain}:${this.port}${this.routePrefix}`;
    return url;
  }

  get fetchingUrlWithRoute() {
    const url = `${this.protocol}://${this.domain}:${this.port}${this.routePrefix}${this.rootRoute}`;
    return url;
  }

  get route() {
    return this.rootRoute;
  }
}
