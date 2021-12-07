import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class UserDetail extends Model {
  @property({
    type: 'string',
  })
  displayName?: string;

    @property({
    type: 'string',
  })
  userPrincipalName?: string;

  @property({
    type: 'string',
  })
  mail?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserDetail>) {
    super(data);
  }
}

export interface UserDetailRelations {
  // describe navigational properties here
}

export type UserDetailWithRelations = UserDetail & UserDetailRelations;
