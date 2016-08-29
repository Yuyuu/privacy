let sinon = require('sinon');

import OrchestratorController from './orchestrator_controller';

describe('The orchestrator controller', () => {
  let controller, socket;

  beforeEach(() => {
    socket = {
      on: sinon.spy()
    };
    controller = new OrchestratorController(socket, {info: sinon.spy()});
  });

  it('should be defined', () => {
    controller.should.be.defined;
  });
});
