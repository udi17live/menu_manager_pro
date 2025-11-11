/**
 * setting router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::setting.setting', {
  config: {
    find: {
      policies: ['api::setting.is-owner']
    },
    findOne: {
      policies: ['api::setting.is-owner']
    },
    create: {
      policies: ['api::setting.is-owner']
    },
    update: {
      policies: ['api::setting.is-owner']
    },
    delete: {
      policies: ['api::setting.is-owner']
    },
  },
});
