/**
 * menu router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::menu.menu', {
  config: {
    find: {
      auth: false, // Public access for viewing menus
    },
    findOne: {
      auth: false, // Public access for viewing a specific menu
    },
    create: {
      policies: ['api::menu.is-owner']
    },
    update: {
      policies: ['api::menu.is-owner']
    },
    delete: {
      policies: ['api::menu.is-owner']
    },
  },
});
