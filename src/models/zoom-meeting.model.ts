import {Entity, model, property} from '@loopback/repository';

/*****************************************
      Reccurence
 * ****************************************
 * ****************************************
 */
@model()
export class Reccurrence extends Entity {
  @property({
    type: 'number',
    enum: [
      1,
      2,
      3
    ],
  })


  type: number;
  @property({
    type: 'number',
    enum: [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    default: 1
  })
  repeat_interval: number;

  @property({
    type: 'number',
    default: 1
  })
  monthly_day: number;

  @property({
    type: 'number',
    enum: [
      -1,
      1,
      2,
      3,
      4
    ],
  })
  monthly_week: number;

  @property({
    type: 'number',
    enum: [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
  })
  monthly_week_day: number;

  @property({
    type: 'number',
    default: 1,
  })
  end_times: number;

  @property({
    type: 'string',
  })
  end_date_time: string;



  // street, city, state, zipCode proper definitions ..
}




/*****************************************
      ApprovedOrDeniedCountries
 * ****************************************
 * ****************************************
 */
@model()
export class ApprovedOrDeniedCountries extends Entity {


  @property({
    type: 'boolean',
  })
  enable: boolean;

  @property({
    type: 'string',
    enum: [
      "approve",
      "deny"
    ],
  })
  method: string;

  @property({
    type: 'array',
    itemType: 'string',
    length: 20,
  })
  approved_list?: string[]
  @property({
    type: 'array',
    itemType: 'string',
    length: 20,
  })
  denied_list?: string[]
}


/*****************************************
      LanguageInterpretation
 * ****************************************
 * ****************************************
 */
@model()
export class LanguageInterpretation extends Entity {


  @property({
    type: 'boolean',
  })
  enable: boolean;

  @property({
    type: 'array',
    itemType: 'object',
  })
  interpreters?: [Interpreters];

}


/*****************************************
      BreakoutRoom
 * ****************************************
 * ****************************************
 */
@model()
export class BreakoutRoom extends Entity {


  @property({
    type: 'boolean',
  })
  enable: boolean;

  @property({
    type: 'array',
    itemType: 'object',
  })
  rooms?: [Room];

}

/*****************************************
      authenticationException
 * ****************************************
 * ****************************************
 */
@model()
export class authenticationException extends Entity {


  @property({
    type: 'string',
  })
  name: string;

  @property({
    type: 'array',
    format: 'email',
  })
  email?: string

}

/*****************************************
      Room
 * ****************************************
 * ****************************************
 */
@model()
export class Room extends Entity {


  @property({
    type: 'string',
  })
  name: String;

  @property({
    type: 'array',
    itemType: 'string',
  })
  participants?: string[];

}

/*****************************************
      Interpreters
 * ****************************************
 * ****************************************
 */
@model()
export class Interpreters extends Entity {


  @property({
    type: 'string',
    format: 'email'
  })
  email: String;

  @property({
    type: 'array',
  })
  languages?: string;

}


/*****************************************
      trackingFields
 * ****************************************
 * ****************************************
 */
@model()
export class trackingFields extends Entity {


  @property({
    type: 'string',
  })
  field: String;

  @property({
    type: 'string',
  })
  value?: string;

}

/*****************************************
      setting
 * ****************************************
 * ****************************************
 */
@model()
export class Setting extends Entity {
  @property({
    type: 'boolean',
  })
  host_video?: boolean;

  @property({
    type: 'boolean',
  })
  participant_video?: boolean;

  @property({
    type: 'boolean',
  })
  cn_meeting?: boolean;

  @property({
    type: 'boolean',
  })
  in_meeting?: boolean;

  @property({
    type: 'boolean',
  })
  join_before_host?: boolean;

  @property({
    type: 'boolean',
    "enum": [
      0,
      5,
      10
    ]
  })
  jbh_time?: boolean;

  @property({
    type: 'boolean',
  })
  mute_upon_entry?: boolean;

  @property({
    type: 'boolean',
  })
  watermark?: boolean;

  @property({
    type: 'boolean',
  })
  use_pmi?: boolean;

  @property({
    type: 'boolean',
    default: 2,
    enum: [
      0,
      1,
      2
    ],
  })
  approval_type?: boolean;

  @property({
    type: 'boolean',
    default: 1,
    enum: [
      1,
      2,
      3
    ],
  })
  registration_type?: boolean;

  @property({
    type: 'string',
    default: "both",
    enum: [
      "both",
      "telephony",
      "voip"
    ],
  })
  audio?: string;

  @property({
    type: 'string',
    default: "none",
    enum: [
      "local",
      "cloud",
      "none"
    ],
  })
  auto_recording?: string;

  @property({
    type: 'string',
  })
  alternative_hosts?: string;

  @property({
    type: 'boolean',
    default: false
  })
  close_registration?: boolean;

  @property({
    type: 'boolean',
  })
  waiting_room?: boolean;

  @property({
    type: 'array',
    itemType: 'string',
    length: 20,
  })
  global_dial_in_countries?: string[];


  @property({
    type: 'string',
  })
  contact_name?: string;
  @property({
    type: 'string',
  })
  contact_email?: string;

  @property({
    type: 'boolean',
  })
  registrants_email_notification?: boolean;

  @property({
    type: 'boolean',
  })
  registrants_confirmation_email?: boolean;

  @property({
    type: 'boolean',
  })
  meeting_authentication?: boolean;

  @property({
    type: 'string',
  })
  authentication_option?: string;

  @property({
    type: 'string',
  })
  authentication_domains?: string;


  @property({
    type: 'array',
    itemType: 'object',
  })
  authentication_exception?: [authenticationException];

  @property({
    type: 'array',
    itemType: 'string',
    length: 20,
  })
  additional_data_center_regions?: string[]

  @property({
    type: 'object',
  })
  breakout_room?: BreakoutRoom;

  @property({
    type: 'object',
  })
  language_interpretation?: LanguageInterpretation;

  @property({
    type: 'boolean',
  })
  show_share_button?: boolean;

  @property({
    type: 'boolean',
  })
  allow_multiple_devices?: boolean;

  @property({
    type: 'string',
    enum: [
      "enhanced_encryption",
      "e2ee"
    ]
  })
  encryption_type?: string;

  @property({
    type: 'object',
  })
  approved_or_denied_countries_or_regions?: ApprovedOrDeniedCountries;

  @property({
    type: 'boolean',
    default: true
  })
  alternative_hosts_email_notification?: boolean;

}

/*****************************************
      ZoomMeeting
 * ****************************************
 * ****************************************
 */
@model({settings: {strict: false}})

export class ZoomMeeting extends Entity {
  @property({
    type: 'string',
  })
  topic: string;

  @property({
    type: 'number',
    default: 2,
    enum: [
      1,
      2,
      3,
      8
    ],
  })
  type?: number;

  @property({
    type: 'boolean',
  })
  pre_schedule?: boolean;

  @property({
    type: 'number',
  })
  duration?: number;

  @property({
    type: 'string',
  })
  schedule_for?: string;

  @property({
    type: 'string',
  })
  timezone?: string;

  @property({
    type: 'string',
    maxLength: 10
  })
  password?: string;

  @property({
    type: 'string',
    maxLength: 2000
  })
  agenda?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  tracking_fields?: [trackingFields];

  @property({
    type: 'object',
    required: true,
  })
  recurrence?: Reccurrence;

  @property({
    type: 'object',
    required: true,
  })
  settings?: Setting;

  @property({
    type: 'string',
  })
  template_id: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ZoomMeeting>) {
    super(data);
  }
}

export interface ZoomMeetingRelations {
  // describe navigational properties here
}

export type ZoomMeetingWithRelations = ZoomMeeting & ZoomMeetingRelations;
