import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ZoomGetMeetingDataSource} from '../datasources';
import {TeamsAuthCreds, TeamsAuthCredsRelations} from '../models';

export class ZoomAuthCredsRepository extends DefaultCrudRepository<
  TeamsAuthCreds,
  typeof TeamsAuthCreds.prototype.userId,
  TeamsAuthCredsRelations
> {
  constructor(
    @inject('datasources.ZoomGetMeeting') dataSource: ZoomGetMeetingDataSource,
  ) {
    super(TeamsAuthCreds, dataSource);
  }
}
