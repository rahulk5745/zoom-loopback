import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {TeamsAuthCreds} from '../models';
import {TeamsAuthCredsRepository} from '../repositories';

export class CredsController {
  constructor(
    @repository(TeamsAuthCredsRepository)
    public teamsAuthCredsRepository: TeamsAuthCredsRepository,
  ) { }

  @post('/teams-creds')
  @response(200, {
    description: 'TeamsAuthCreds model instance',
    content: {'application/json': {schema: getModelSchemaRef(TeamsAuthCreds)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TeamsAuthCreds, {
            title: 'NewTeamsAuthCreds',

          }),
        },
      },
    })
    teamsAuthCreds: TeamsAuthCreds,
  ): Promise<TeamsAuthCreds> {
    return this.teamsAuthCredsRepository.create(teamsAuthCreds);
  }

  @get('/teams-creds/count')
  @response(200, {
    description: 'TeamsAuthCreds model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TeamsAuthCreds) where?: Where<TeamsAuthCreds>,
  ): Promise<Count> {
    return this.teamsAuthCredsRepository.count(where);
  }

  @get('/teams-creds')
  @response(200, {
    description: 'Array of TeamsAuthCreds model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TeamsAuthCreds, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TeamsAuthCreds) filter?: Filter<TeamsAuthCreds>,
  ): Promise<TeamsAuthCreds[]> {
    return this.teamsAuthCredsRepository.find(filter);
  }

  @patch('/teams-creds')
  @response(200, {
    description: 'TeamsAuthCreds PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TeamsAuthCreds, {partial: true}),
        },
      },
    })
    teamsAuthCreds: TeamsAuthCreds,
    @param.where(TeamsAuthCreds) where?: Where<TeamsAuthCreds>,
  ): Promise<Count> {
    return this.teamsAuthCredsRepository.updateAll(teamsAuthCreds, where);
  }

  @get('/teams-creds/{id}')
  @response(200, {
    description: 'TeamsAuthCreds model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TeamsAuthCreds, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TeamsAuthCreds, {exclude: 'where'}) filter?: FilterExcludingWhere<TeamsAuthCreds>
  ): Promise<TeamsAuthCreds> {
    return this.teamsAuthCredsRepository.findById(id, filter);
  }

  @patch('/teams-creds/{id}')
  @response(204, {
    description: 'TeamsAuthCreds PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TeamsAuthCreds, {partial: true}),
        },
      },
    })
    teamsAuthCreds: TeamsAuthCreds,
  ): Promise<void> {
    await this.teamsAuthCredsRepository.updateById(id, teamsAuthCreds);
  }

  @put('/teams-creds/{id}')
  @response(204, {
    description: 'TeamsAuthCreds PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() teamsAuthCreds: TeamsAuthCreds,
  ): Promise<void> {
    await this.teamsAuthCredsRepository.replaceById(id, teamsAuthCreds);
  }

  @del('/teams-creds/{id}')
  @response(204, {
    description: 'TeamsAuthCreds DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.teamsAuthCredsRepository.deleteById(id);
  }
}
