const payment = require('../../../graphql/primary/types/payment.type').default;
const {
  BaseServiceGql
} = require('xc-core');

class StaffHmPaymentService extends BaseServiceGql {

  constructor(app = {}) {
    super(app)
    this.app = app;
    this.staff = app.$dbs.primary.staff;
  }

  async _paymentList(ids) {
    let data = await this.staff.hasManyListGQL({
      ids,
      child: 'payment'
    })
    return ids.map(id => data[id] ? data[id].map(c => new payment(c, this.app)) : []);
  }

  async _paymentCount(ids) {
    let data = await this.staff.hasManyListCount({
      ids,
      child: 'payment'
    })
    return data;
  }

}

module.exports = StaffHmPaymentService;