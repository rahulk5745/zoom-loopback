import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {TeamsAuthDataSource} from '../datasources';




export interface TeamsAuthProviderService {
	// this is where you define the Node.js methods that will be
	// mapped to the SOAP operations as stated in the datasource
	// json file.
	getAccessToken(client_id: string,
		code: string,
		grant_type: string,
		scope: string,
		client_secret: string,
		redirect_uri: string): Promise<string>;
	refreshAcessToken(
		client_id: string,
		refresh_token: string,
		scope: string,
		client_secret: string,
		redirect_uri: string
	): Promise<string>;
	getAccessTokenwithoutUser(
		tenant: string,
		client_id: string,
		grant_type: string,
		scope: string,
		client_secret: string
	): Promise<string>;
}

export class TeamsAuthProviderServiceProvider implements Provider<TeamsAuthProviderService> {
	constructor(
		// restds must match the name property in the datasource json file
		@inject('datasources.TeamsAuth')
		protected dataSource: TeamsAuthDataSource = new TeamsAuthDataSource()) { }


	value(): Promise<TeamsAuthProviderService> {
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
// 	}


//}


