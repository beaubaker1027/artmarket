import { CheckoutRoutingModule } from './checkout-routing.module';

describe('CheckoutRoutingModule', () => {
  let checkoutRoutingModule: CheckoutRoutingModule;

  beforeEach(() => {
    checkoutRoutingModule = new CheckoutRoutingModule();
  });

  it('should create an instance', () => {
    expect(checkoutRoutingModule).toBeTruthy();
  });
});
