'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    // Convert id to number (Strapi IDs are numeric)
    const productId = parseInt(id, 10);

    const product = await strapi.entityService.findOne('api::product.product', productId, {
      populate: '*', // to include relations if any
    });

    if (!product) {
      return ctx.notFound('Product not found');
    }

    return this.transformResponse(product);
  }
}));
