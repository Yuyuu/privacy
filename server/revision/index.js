'use strict';

class Revision {
  constructor(mapFile, staticAssets) {
    this.mapFile = mapFile;
    this.staticAssets = staticAssets;
  }

  register(app) {
    app.locals.revision = this._createRevision(app.get('env') !== 'development');
  }

  _createRevision(prod) {
    let loader = this._createLoader(prod);
    return (bundle, type) => loader(bundle, type);
  }

  _createLoader(prod) {
    let self = this;
    if (!prod) {
      return (bundle, type) => `${self.staticAssets}/${bundle}.${type}`;
    }
    return (bundle, type) => require(self.mapFile)[bundle][type];
  }
}

module.exports = Revision;
