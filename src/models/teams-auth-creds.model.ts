import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class TeamsAuthCreds extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
  })
  state?: string;

  @property({
    type: 'string',
  })
  token?: string;

  @property({
    type: 'string',
  })
  refreshToken?: string;

  @property({
    type: 'string',
  })
  displayName?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'date',
  })
  created_on?: string;

  @property({
    type: 'number',
  })
  expires_in?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TeamsAuthCreds>) {
    super(data);
  }
}

export interface TeamsAuthCredsRelations {
  // describe navigational properties here
}

export type TeamsAuthCredsWithRelations = TeamsAuthCreds & TeamsAuthCredsRelations;
