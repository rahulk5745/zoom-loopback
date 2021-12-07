import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './zoom-get-meeting.datasource.json';

// const config = {
//   name: 'ZoomApi',
//   connector: 'rest',
//   baseURL: 'https://api.zoom.us',
//   crud: false
// };

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ZoomGetMeetingDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'ZoomGetMeeting';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.ZoomGetMeeting', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
