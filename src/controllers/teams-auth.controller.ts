// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param, post, Response, RestBindings} from '@loopback/rest';
import {TeamsAuthCreds, UserDetail} from '../models';
import {TeamsAuthCredsRepository} from '../repositories';
import {TeamsAuthProviderService, TeamsGraphService} from '../services';


const authConfig = {
  "redirect_uri": "http://localhost:3000/teams/redirect",
  "client_id": "74e2f7e6-6c55-4212-a1e8-b1a4cd175642",
  "client_secret": "UrJ3~~Lg~82C5s90.bN6orVP3umV.giv7f"
}

export class TeamsAuthController {
  constructor(
    @inject('services.TeamsAuthProviderService')
    protected teamsAuthProviderService: TeamsAuthProviderService,
    @inject('services.TeamsGraphService')
    protected teamsGraphService: TeamsGraphService,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    @repository(TeamsAuthCredsRepository)
    public teamsAuthCredsRepository: TeamsAuthCredsRepository,
  ) { }

  @get('/teams/auth')
  async getAccessToken(
    @param.query.string('userId') userId: string,
    @param.query.string('permissions') permissions: string
  ): Promise<Response> {

    let authUri = "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?" +
      "client_id=" + authConfig.client_id +
      "&response_type=code" +
      "&response_mode=query" +
      "&scope=offline_access%20" + permissions +
      "&state=" + userId +
      "&redirect_uri=" + encodeURI(authConfig.redirect_uri);
    console.log("Redirecting: " + authUri);
    this.response.redirect(authUri);
    return this.response;

  }


  @get('/teams/redirect')

  async processAuthCode(
    @param.query.string('code') authCode: string,
    @param.query.string('state') state: string,

  ): Promise<Response> {
    console.log("Code: " + authCode);
    console.log("State: " + state);
    let tokenResp = await this.teamsAuthProviderService.getAccessToken(
      authConfig.client_id,
      authCode,
      "authorization_code",
      "User.Read",
      authConfig.client_secret,
      encodeURI(authConfig.redirect_uri)
    );
    //console.log("1111111---->" + tokenResp)
    console.log("Was HEre -   -- -- -- -- ");
    let tokenRespJson = null;

    try {
      tokenRespJson = JSON.parse(tokenResp);
    } catch (e) {
      console.log(`Exception in parsing token response: ${e}`);
    }
    console.log("1111111---->" + tokenRespJson.access_token)
    if (tokenRespJson.access_token == '' || tokenRespJson.refresh_token == '') {
      console.log(`Either refresh token or access token is null`);
      this.response.statusCode = 500;
      return this.response;
    }

    const userDetail: UserDetail = await
      this.teamsGraphService.getUserDetails(tokenRespJson.access_token);


    let teamsCredModel: TeamsAuthCreds = new TeamsAuthCreds();
    teamsCredModel.token = tokenRespJson.access_token;
    teamsCredModel.refreshToken = tokenRespJson.refresh_token;
    teamsCredModel.userId = state;
    teamsCredModel.state = state;
    teamsCredModel.displayName = userDetail.displayName;
    console.log("------->" + userDetail.displayName)
    teamsCredModel.email = userDetail.mail || userDetail.userPrincipalName;
    this.teamsAuthCredsRepository.create(teamsCredModel);


    this.response.redirect('/');
    return this.response;
  }
  @get('/teamuser/auth')
  async getAccessTokena(
    @param.query.string('userId') userId: string,
    // @param.query.string('permissions') permissions: string
  ): Promise<Response> {

    let authUri = "https://login.microsoftonline.com/common/adminconsent?" +
      "client_id=" + authConfig.client_id +
      "&state=" + userId +
      "&redirect_uri=" + encodeURI("http://localhost:3000/teamsUser/redirect");
    console.log("Redirecting: " + authUri);
    this.response.redirect(authUri);
    return this.response;


  }

  @post('/teamsUser/redirect')

  async authwithoutUser(
    @param.query.string('code') authCode: string,
    @param.query.string('state') state: string,

  ): Promise<Response> {
    console.log("Code: " + authCode);
    console.log("State: " + state);
    let tokenResp = await this.teamsAuthProviderService.getAccessTokenwithoutUser(

      "common",
      authConfig.client_id,
      "client_credentials",
      "User.Read",
      authConfig.client_secret,
    );
    //console.log("1111111---->" + tokenResp)
    console.log("Was HEre -   -- -- -- -- ");
    let tokenRespJson = null;

    try {
      tokenRespJson = JSON.parse(tokenResp);
    } catch (e) {
      console.log(`Exception in parsing token response: ${e}`);
    }
    console.log("1111111---->" + tokenRespJson.access_token)
    if (tokenRespJson.access_token == '' || tokenRespJson.refresh_token == '') {
      console.log(`Either refresh token or access token is null`);
      this.response.statusCode = 500;
      return this.response;
    }

    const userDetail: UserDetail = await
      this.teamsGraphService.getUserDetails(tokenRespJson.access_token);


    let teamsCredModel: TeamsAuthCreds = new TeamsAuthCreds();
    teamsCredModel.token = tokenRespJson.access_token;
    teamsCredModel.refreshToken = tokenRespJson.refresh_token;
    teamsCredModel.userId = state;
    teamsCredModel.state = state;
    teamsCredModel.displayName = userDetail.displayName;
    console.log("------->" + userDetail.displayName)
    teamsCredModel.email = userDetail.mail || userDetail.userPrincipalName;
    this.teamsAuthCredsRepository.create(teamsCredModel);


    this.response.redirect('/');
    return this.response;
  }
}
