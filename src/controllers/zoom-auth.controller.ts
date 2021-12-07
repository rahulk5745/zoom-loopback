// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param, Response, RestBindings} from '@loopback/rest';
import {TeamsAuthCreds, UserDetail} from '../models';
import {TeamsAuthCredsRepository} from '../repositories';
import {ZoomAuthProviderService, ZoomUserProviderService} from '../services';

const request = require('request')
var base64 = require('base-64');
const authConfig = {
  "client_id": "3QUBvAqQ7C8Im0FgjXYRA",
  "client_secret": "TB078NeNTBSArrot80zYFygsbew48aYu"
}

export class ZoomAuthController {
  constructor(
    @inject('services.ZoomAuthProviderService')
    protected zoomAuthProviderService: ZoomAuthProviderService,
    @inject('services.ZoomUserProviderService')
    protected zoomUserService: ZoomUserProviderService,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    @repository(TeamsAuthCredsRepository)
    public zoomAuthCredsRepository: TeamsAuthCredsRepository,
  ) { }

  @get('/zoom/auth')
  async getAccessToken(
    @param.query.string('userId') userId: string,
    @param.query.string('permissions') permissions: string
  ): Promise<Response> {

    let authUri = "https://zoom.us/oauth/authorize?" +
      "client_id=" + authConfig.client_id +
      "&response_type=code" +
      "&state=" + userId +
      "&redirect_uri=" + encodeURI("http://localhost:3000/zoom/redirect");
    console.log("Redirecting: " + authUri);
    this.response.redirect(authUri);
    return this.response;

  }

  @get('/zoom/redirect')

  async processAuthCode(
    @param.query.string('userId') userId: string,
    @param.query.string('code') authCode: string,
    @param.query.string('state') state: string,


  ): Promise<Response> {
    console.log("Code: " + authCode);
    //console.log("State: " + state);

    console.log('was jwe')

    var Header = base64.encode(authConfig.client_id + ':' + authConfig.client_secret);
    console.log(Header)
    let tokenResp = await this.zoomAuthProviderService.getAccessToken(
      Header,
      authCode,

      "authorization_code",
      encodeURI("http://localhost:3000/zoom/redirect")
    );

    //console.log(tokenResp)
    console.log("Was HEre -   -- -- -- -- ");
    let tokenRespJson = null;

    try {
      tokenRespJson = JSON.parse(tokenResp);
      // console.log("25555555555" + tokenResp)
      console.log(tokenRespJson)
      console.log('aaaaaaa')
    } catch (e) {
      console.log(`Exception in parsing token response: ${e}`);
    }

    if (tokenRespJson.access_token == '' || tokenRespJson.refresh_token == '') {
      console.log(`Either refresh token or access token is null`);
      this.response.statusCode = 400;
      return this.response;
    }


    console.log("***********" + tokenRespJson.access_token)


    let userDetailJSON: any = await
      this.zoomUserService.getUser(tokenRespJson.access_token, userId);

    let resp = userDetailJSON
    console.log("JSON -----> " + resp.users[0].email);
    console.log(resp.users[0].id)
    console.log(resp)


    const userName = resp.users[0].first_name + resp.users[0].last_name
    console.log("username------>" + userName)

    const userDetail: UserDetail = new UserDetail();
    userDetail.email = userDetailJSON.email;
    userDetail.displayName = userName
    //console.log("userdetail----------> " + userDetail.displayName)
    //.lastName = userDetailJSON.last_name
    userDetail.userPrincipalName = userDetailJSON.email


    //console.log(userDetail.email)

    let teamsCredModel: TeamsAuthCreds = new TeamsAuthCreds();
    teamsCredModel.token = tokenRespJson.access_token;

    teamsCredModel.refreshToken = tokenRespJson.refresh_token;
    teamsCredModel.userId = state;
    teamsCredModel.state = state;
    // //console.log(teamsCredModel.state)
    // console.log("token" + teamsCredModel.token
    // )
    teamsCredModel.displayName = userDetail.displayName;
    console.log("22222" + teamsCredModel.displayName)
    teamsCredModel.email = userDetail.email;
    console.log("userid ------->" + teamsCredModel.userId)
    this.zoomAuthCredsRepository.create(teamsCredModel);

    this.response.redirect('/');

    return this.response;
  }


}
