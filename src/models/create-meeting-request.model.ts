import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CreateMeetingRequest extends Model {
  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  startDateTime: string;

  @property({
    type: 'string',
    required: true,
  })
  endDateTime: string;

  @property({
    type: 'string',
    required: true,
  })
  subject: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  constructor(data?: Partial<CreateMeetingRequest>) {
    super(data);
  }
}

export interface CreateMeetingRequestRelations {
  // describe navigational properties here
}

export type CreateMeetingRequestWithRelations = CreateMeetingRequest & CreateMeetingRequestRelations;
