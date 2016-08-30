import LandingController from './landing_controller';

describe('The landing controller', () => {
  let controller;

  beforeEach(() => {
    controller = new LandingController();
  });

  it('should be defined', () => {
    controller.should.be.defined;
  });
});
