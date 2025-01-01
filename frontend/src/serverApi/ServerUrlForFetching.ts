import { UrlAdresses } from '@/types';
import config from '@/config';

export class ServerUrlForFetching {
  private readonly protocol: string;
  
  private readonly domain: string;
 
  private readonly port: string;
  
  private readonly routePrefix: string;

  private rootRoute: UrlAdresses;

  constructor(route: UrlAdresses) {
    this.rootRoute = route;
    this.routePrefix = '/api';

    this.protocol = config.protocol;
    this.port = config.port;
    this.domain = config.apiUrl;

    console.log(this.protocol);
    console.log(this.port);
    console.log(this.domain);
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
