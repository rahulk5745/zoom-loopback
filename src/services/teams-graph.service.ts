import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Client} from '@microsoft/microsoft-graph-client';
import "isomorphic-fetch";
import {MeetingDetail, UserDetail} from '../models';
@injectable({scope: BindingScope.TRANSIENT})
export class TeamsGraphService {
  constructor() { }

  getAuthenticatedClient(accessToken: string): any {
    // Initialize Graph client
    const client = Client.init({
      // Use the provided access token to authenticate
      // requests
      authProvider: (done) => {
        done(null, accessToken);
      }
    });

    return client;
  }

  async getUserDetails(accessToken: string): Promise<UserDetail> {
    const client = this.getAuthenticatedClient(accessToken);
    const user = <UserDetail>await client
      .api('/me')
      .select('displayName,userPrincipalName')
      .get();
    return user;

  }

  async createMeeting(accessToken: string,
    startDateTime: string,
    endDateTime: string,
    subject: string): Promise<MeetingDetail> {
    const client = this.getAuthenticatedClient(accessToken);
    const onlineMeeting = {
      startDateTime: startDateTime,//'2019-07-12T14:30:34.2444915-07:00',
      endDateTime: endDateTime,//'2019-07-12T15:00:34.2464912-07:00',
      subject: subject
    };
    const meeting =
      <MeetingDetail>client.api('/me/onlineMeetings')
        .post(onlineMeeting);

    return meeting;

  }

  async getMeeting(accessToken: string): Promise<UserDetail> {
    const client = this.getAuthenticatedClient(accessToken);
    const user = <UserDetail>await client
      .api('/me')
      .select('displayName,userPrincipalName')
      .get();
    return user;

  }



}
