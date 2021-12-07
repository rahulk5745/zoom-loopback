// Uncomment these imports to begin using these cool features!
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param, post, requestBody, Response, RestBindings} from '@loopback/rest';
import {TeamsAuthCreds, ZoomJoinRequest, ZoomMeeting} from '../models';
import {TeamsAuthCredsRepository} from '../repositories';
import {ZoomUserProviderService} from '../services';

const crypto = require('crypto')
var filter = {
  "where": {
    "userId": ""
  }
}
var filterString: any = JSON.stringify(filter)
console.log(filterString)

const authConfig = {
  APIKey: "AqCCnF2QRaSNj36_tCOMJw",
  APISecret: "a42ngi9ECXIl2dajSBCJOKJSy1K0jk4mrjc4"
}

// const data: ZoomMeeting = {
//   "topic": "test-postman",
//   "type": 2,
//   "start_time": "2021-05-10T12:10:10Z",
//   "duration": 3,
//   "settings": {
//     "host_video": true,
//     "participant_video": true,
//     "join_before_host": true,
//     "mute_upon_entry": true,
//     "watermark": true,
//     "audio": "voip",
//     "auto_recording": "cloud"
//   }

// }
//const b = data.toString()


//let tokenResp: any = null
let Join = null

export class ZoomApiController {
  constructor(
    @repository(TeamsAuthCredsRepository)
    public teamsAuthCredsRepository: TeamsAuthCredsRepository,
    @inject('services.ZoomUserProviderService')
    protected zoomUserService: ZoomUserProviderService,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
  ) { }


  @get('/zoom/meetings')
  async getToken(
    @param.query.string('userId') userId: string
  ): Promise<Response> {
    var filter = {
      "where": {
        "userId": userId
      }
    }
    var tokenResp = await this.teamsAuthCredsRepository.findOne(filter)
    //console.log(typeof c)
    var authCreds: TeamsAuthCreds = <TeamsAuthCreds>tokenResp;
    console.log(authCreds.token)
    const tokenResponse = authCreds.token;

    if (tokenResponse != undefined) {

      const meetings = await this.zoomUserService.getMeetings(tokenResponse, userId)
      console.log(meetings)
      // const meetings = await this.zoomUserService.createMeeting(tokenResponse, userId, data)
      // console.log(meetings)

      return this.response;
    } else {
      console.log(`Token not found`);
      return (<any>{status: "failed"});
    }
  }

  @post('/zoom/{userId}/meetings')
  async create(
    @param.path.string('userId') userId: string,
    @requestBody() meetingConfig: ZoomMeeting
  ): Promise<Response> {
    var filter = {
      "where": {
        "userId": userId
      }
    }

    let joinurl = null
    var tokenResp = await this.teamsAuthCredsRepository.findOne(filter)
    //console.log(typeof c)
    var authCreds: TeamsAuthCreds = <TeamsAuthCreds>tokenResp;
    console.log(authCreds.token)
    const tokenResponse = authCreds.token;

    if (tokenResponse != undefined) {

      const meetings: any = await this.zoomUserService.createMeeting(tokenResponse, userId, meetingConfig)
      console.log(meetings)
      //const meetingJson = JSON.parse(meetings)
      console.log("Join url------>" + meetings.join_url)
      joinurl = meetings.join_url
      // function s(joinurl: any) {
      //   console.log("tttttt-------------->" + joinurl)
      //   return joinurl
      // }
      // s(joinurl)
      this.response.statusCode = 200
      return this.response


    } else {
      console.log(`Token not found`);
      return (<any>{status: "failed"});
    }
    // console.log("Join url------>" + joinurl)
    // return this.response;

  }



  @post('/zoom/meetings')
  async join(
    @requestBody() meetingDetails: ZoomJoinRequest,
  ): Promise<Response> {

    const timestamp = new Date().getTime() - 30000
    //console.log(process.env.),,8v
    const msg = Buffer.from(authConfig.APIKey + meetingDetails.meetingNumber + timestamp + meetingDetails.meetingRole).toString('base64')
    const hash = crypto.createHmac('sha256', authConfig.APISecret).update(msg).digest('base64')
    const signature = await Buffer.from(`${authConfig.APIKey}.${meetingDetails.meetingNumber}.${timestamp}.${meetingDetails.meetingRole}.${hash}`).toString('base64')
    //console.log(res)
    // a.sig = signature
    console.log(signature)
    this.response.statusCode = 200
    this.response.send({signature: signature})
    return this.response
  }

  @get('/zoom/{meetingId}/meetings/')
  async getMeeting(
    @param.path.string('meetingId') meetingId: BigInteger,
    @param.query.string('userId') userId: string,
  ): Promise<Response> {
    var filter = {
      "where": {
        "userId": userId
      }
    }
    var tokenResp = await this.teamsAuthCredsRepository.findOne(filter)
    //console.log(typeof c)
    var authCreds: TeamsAuthCreds = <TeamsAuthCreds>tokenResp;
    console.log(authCreds.token)
    const tokenResponse = authCreds.token;

    if (tokenResponse != undefined) {

      const meetings = await this.zoomUserService.getMeeting(tokenResponse, meetingId)
      console.log(meetings)
      // const meetings = await this.zoomUserService.createMeeting(tokenResponse, userId, data)
      // console.log(meetings)

      return this.response;
    } else {
      console.log(`Token not found`);
      return (<any>{status: "failed"});
    }
    //return this.response
  }


}
