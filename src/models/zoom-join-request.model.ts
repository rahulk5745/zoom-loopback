import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class ZoomJoinRequest extends Model {
  @property({
    type: 'number',
    required: true,
  })
  meetingNumber: number;

  @property({
    type: 'number',
    required: true,
    enum: [
      1,
      0,
    ],
  })
  meetingRole: number;

  // @property({
  //   type: 'number',
  //   format: 'int64',
  //   required: true,
  // })
  // MeetingNumber: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  constructor(data?: Partial<ZoomJoinRequest>) {
    super(data);
  }
}

export interface ZoomJoinRequestRelations {
  // describe navigational properties here
}

export type ZoomJoinRequestWithRelations = ZoomJoinRequest & ZoomJoinRequestRelations;
