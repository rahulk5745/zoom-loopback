import { /* inject, */ BindingScope, injectable} from '@loopback/core';
//import {TeamsAuth} from '../services';

@injectable({scope: BindingScope.TRANSIENT})
export class TeamsAuthService {
  /*constructor(
    @inject('services.TeamsAuth')
    protected teamsAuth: TeamsAuth) {
    let clientOptions: ClientOptions = {
      authProvider: teamsAuth,
      debugLogging: true,
    };
    const client = Client.initWithMiddleware(clientOptions);

  }*/


}
