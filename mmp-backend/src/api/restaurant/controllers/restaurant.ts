/**
 * restaurant controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::restaurant.restaurant", {
  async findByUuid(ctx) {
    const { uuid } = ctx.params;

    const restaurant = await strapi.db
      .query("api::restaurant.restaurant")
      .findOne({
        where: { uuid },
        populate: {
          menus: {
            where: { isActive: true },
            populate: {
              menuItems: {
                where: {
                  inStock: true,
                },
                populate: ["categories", "image"],
              },
            },
          },
          categories: true,
        },
      });

    if (!restaurant) {
      return ctx.notFound("Restaurant not found");
    }

    return restaurant;
  },
  async me(ctx) {
    const user = ctx.state.user;

    console.log(ctx.state.user);

    if (!user) {
      return ctx.unauthorized("You must be authenticated");
    }

    const restaurants = await strapi.db
      .query("api::restaurant.restaurant")
      .findMany({
        where: {
          owner: user.id,
        },
      });

    if (!restaurants) {
      return ctx.notFound("No settings found for the user");
    }

    const sanitizedSettings = await this.sanitizeOutput(restaurants, ctx);

    return sanitizedSettings;
  },

  async update(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be authenticated");
    }

    const restaurantData = await strapi.db
      .query("api::restaurant.restaurant")
      .findOne({
        where: {
          owner: user.id,
          id: ctx.params.id,
        },
      });

    if (ctx.request.body.data?.user) {
      delete ctx.request.body.data.user;
    }

    ctx.params.id = restaurantData.documentId;

    return super.update(ctx);
  },

  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be authenticated");
    }

    if (ctx.request.body.data?.user) {
      delete ctx.request.body.data.user;
    }

    const sanitizedInputData = await this.sanitizeInput(
      ctx.request.body.data,
      ctx
    );

    if (sanitizedInputData && "user" in (sanitizedInputData as object)) {
      delete (sanitizedInputData as any).user;
    }

    try {
      const restaurant = await strapi.entityService.create(
        "api::restaurant.restaurant",
        {
          data: {
            ...((sanitizedInputData as Record<string, any>) || {}),
            owner: user.id,
          } as any,
        }
      );
      console.log("RESTAURANT: ", restaurant);
      const sanitizedRestaurant = await this.sanitizeOutput(restaurant, ctx);
      return this.transformResponse(sanitizedRestaurant);
    } catch (error) {
      console.error("Error creating restaurant: ", error);
      return ctx.badRequest("Error creating restaurant");
    }

    // ctx.request.body.data = {
    //   ...ctx.request.body.data,
    //   owner: user.id,
    // };

    // console.log("CTX REQUEST BODY: ", ctx.request.body);

    // return super.create(ctx);
  },
});
