import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TokenDbDataSource} from '../datasources';
import {TeamsAuthCreds, TeamsAuthCredsRelations} from '../models';

export class TeamsAuthCredsRepository extends DefaultCrudRepository<
  TeamsAuthCreds,
  typeof TeamsAuthCreds.prototype.userId,
  TeamsAuthCredsRelations
> {
  constructor(
    @inject('datasources.tokenDB') dataSource: TokenDbDataSource,
  ) {
    super(TeamsAuthCreds, dataSource);
  }
}
