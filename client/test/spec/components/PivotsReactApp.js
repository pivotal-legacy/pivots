'use strict';

describe('PivotsReactApp', () => {
  let React = require('react/addons');
  let PivotsReactApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    PivotsReactApp = require('components/PivotsReactApp.js');
    component = React.createElement(PivotsReactApp);
  });

  it('should create a new instance of PivotsReactApp', () => {
    expect(component).toBeDefined();
  });
});
