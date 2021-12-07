import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'tokenDB',
  connector: 'memory',
  localStorage: 'teams-auth-id',
  file: './store'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class TokenDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'tokenDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.tokenDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
