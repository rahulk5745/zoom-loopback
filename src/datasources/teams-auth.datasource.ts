import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './teams-auth.datasource.json';


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class TeamsAuthDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'TeamsAuth';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.TeamsAuth', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
