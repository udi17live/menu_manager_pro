/**
 * menu-item-category router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::menu-item-category.menu-item-category', {
  config: {
    find: {
      auth: false, // Public access for viewing categories
    },
    findOne: {
      auth: false, // Public access for viewing a specific category
    },
    create: {
      policies: ['api::menu-item-category.is-owner']
    },
    update: {
      policies: ['api::menu-item-category.is-owner']
    },
    delete: {
      policies: ['api::menu-item-category.is-owner']
    },
  },
});
