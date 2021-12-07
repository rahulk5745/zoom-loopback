import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ZoomApiDataSource} from '../datasources';
import {TeamsAuthCreds, TeamsAuthCredsRelations} from '../models';

export class ZoomAuthRepository extends DefaultCrudRepository<
  TeamsAuthCreds,
  typeof TeamsAuthCreds.prototype.userId,
  TeamsAuthCredsRelations
> {
  constructor(
    @inject('datasources.ZoomApi') dataSource: ZoomApiDataSource,
    //@inject('datasources.tokenDB') dataSource1: ZoomAuthUser ,

  ) {
    super(TeamsAuthCreds, dataSource);
  }
}
