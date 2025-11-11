/**
 * menu-item router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::menu-item.menu-item', {
  config: {
    find: {
      auth: false, // Public access for viewing menu items
    },
    findOne: {
      auth: false, // Public access for viewing a specific menu item
    },
    create: {
      policies: ['api::menu-item.is-owner']
    },
    update: {
      policies: ['api::menu-item.is-owner']
    },
    delete: {
      policies: ['api::menu-item.is-owner']
    },
  },
});
