import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class MeetingDetail extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'object',
  })
  audioConferencing?: object;

  @property({
    type: 'object',
  })
  chatInfo?: object;

  @property({
    type: 'string',
  })
  creationDateTime?: string;

  @property({
    type: 'string',
  })
  startDateTime?: string;

  @property({
    type: 'string',
  })
  endDateTime?: string;

  @property({
    type: 'string',
  })
  joinWebUrl?: string;

  @property({
    type: 'object',
  })
  participants?: object;

  @property({
    type: 'string',
  })
  subject?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MeetingDetail>) {
    super(data);
  }
}

export interface MeetingDetailRelations {
  // describe navigational properties here
}

export type MeetingDetailWithRelations = MeetingDetail & MeetingDetailRelations;
