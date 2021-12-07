import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ZoomApiDataSource} from '../datasources';




export interface ZoomAuthProviderService {
  // this is where you define the Node.js methods that will be
  // mapped to the SOAP operations as stated in the datasource
  // json file.
  getAccessToken(
    authHeader: string,
    code: string,
    grant_type: string,
    redirect_uri: string): Promise<string>;
  refreshAcessToken(
    refresh_token: string,
    redirect_uri: string
  ): Promise<string>;
  getAccessTokenwithoutUser(
    client_id: string,
    scope: string,
    client_secret: string,
  ): Promise<string>;

}

export class ZoomAuthProviderServiceProvider implements Provider<ZoomAuthProviderService> {
  constructor(
    // restds must match the name property in the datasource json file
    @inject('datasources.ZoomApi')
    protected dataSource: ZoomApiDataSource = new ZoomApiDataSource()) { }


  value(): Promise<ZoomAuthProviderService> {
    return getService(this.dataSource);
  }
}

// export class TeamsAuth {
// 	constructor(
// 		@inject('services.TeamsAuthProviderService')
// 		protected teamsAuthProviderService: TeamsAuthProviderService
// 	) { }
// 	getAccessToken(): Promise<string> {
// 		return this.teamsAuthProviderService.getAccessToken(
// 			"e6adadd4-9b71-4d3c-be9b-1d1c42cb4ec3",
// 			"code",
// 			"query",
// 			"User.Read",
// 			"asdfa12345"
// 		);
//  	}


//}


