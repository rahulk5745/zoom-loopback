// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {post, requestBody, Response, RestBindings} from '@loopback/rest';
import {CreateMeetingRequest, MeetingDetail} from '../models';
import {TeamsAuthCredsRepository} from '../repositories';
import {TeamsGraphService} from '../services';


const authConfig = {
  "client_id": "74e2f7e6-6c55-4212-a1e8-b1a4cd175642",
  "client_secret": "UrJ3~~Lg~82C5s90.bN6orVP3umV.giv7f"
}

export class TeamsMeetingsController {
  constructor(

    @inject('services.TeamsGraphService')
    protected teamsGraphService: TeamsGraphService,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    @repository(TeamsAuthCredsRepository)
    public teamsAuthCredsRepository: TeamsAuthCredsRepository,
  ) { }



  @post('/teams/meet')

  async createNewMeeting(
    @requestBody() meetingRequest: CreateMeetingRequest


  ): Promise<Response> {
    console.log("UserID: " + meetingRequest.userId);
    console.log("Subject: " + meetingRequest.subject);

    let userDetail =
      await this.teamsAuthCredsRepository.findById(meetingRequest.userId);
    if (userDetail == undefined) {
      this.response.statusCode = 500;
      this.response.set("{status:\"failed\"}");
      return this.response;
    }
    let accessToken = userDetail.token;
    if (accessToken == undefined) {
      this.response.statusCode = 500;
      this.response.set("{status:\"failed\"}");
      return this.response;
    }
    let meetingDetail: MeetingDetail = await this.teamsGraphService.createMeeting(accessToken,
      meetingRequest.startDateTime,
      meetingRequest.endDateTime,
      meetingRequest.subject
    )
    console.log(meetingDetail);
    this.response.statusCode = 200
    //console.log("---------->" + this.response)
    return this.response;
  }


}
