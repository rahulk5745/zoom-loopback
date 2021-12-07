import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ZoomAuthUserDataSource} from '../datasources';
//import {UserDetail} from '../models';


//@injectable({scope: BindingScope.TRANSIENT})

export interface ZoomUserProviderService {

	getUser(
		accessToken: string,
		userId: string
	): Promise<string>;
	getMeetings(
		accessToken: string,
		userId: string
	): Promise<string>;
	createMeeting(
		accessToken: string,
		userId: string,
		meetingConfig: any
	): Promise<string>;
	getMeeting(
		accessToken: string,
		meetingId: BigInteger
	): Promise<string>;

}


export class ZoomUserProviderServiceProvider implements Provider<ZoomUserProviderService> {
	constructor(
		// restds must match the name property in the datasource json file
		@inject('datasources.ZoomAuthUser')
		protected dataSource: ZoomAuthUserDataSource = new ZoomAuthUserDataSource()) { }


	value(): Promise<ZoomUserProviderService> {
		return getService(this.dataSource);
	}
}

