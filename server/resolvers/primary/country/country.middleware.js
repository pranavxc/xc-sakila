const {
  BaseMiddlewareGql
} = require('xc-core')

class CountryMiddleware extends BaseMiddlewareGql {

  constructor(app) {
    super({
      app
    });
    this.permissions = require('./country.policy').permissions;
  }


  async default (args, context, info, ids = []) {

    console.log('Country middleware;')

    let roles = context.req.user ? context.req.user.roles : {
      guest: true
    };

    const allowed = this.isAllowed({
      method: info.operation.operation.toLowerCase(),
      resolver: info.fieldName,
      roles,
      permissions: this.permissions
    });

    if (allowed) {
      /* custom access control can be made here */
      return;
    } else {
      const msg = roles.guest ? `Access Denied : Please Login or Signup for a new account` : `Access Denied for this account`;
      throw new Error(msg);
    }

  }

}

module.exports = CountryMiddleware;