import { createServer, Model, Registry } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { mockProjects } from './mockProjects';

const mockModels = {
  project: Model,
};

const mockFactories = {};

type ServerRegistry = Registry<
  { project: typeof mockModels.project },
  {
    /* factories */
  }
>;

type ServerSchema = Schema<ServerRegistry>;

export function runMockServer({ environment = 'test' } = {}) {
  const server = createServer<typeof mockModels, typeof mockFactories>({
    environment,
    namespace: '/api',

    models: mockModels,

    seeds(server) {
      server.db.loadData({ projects: mockProjects });
    },

    routes() {
      this.namespace = 'api';

      this.get('/projects', (schema: ServerSchema) => {
        return schema.all('project');
      });
    },
  });

  return server;
}
