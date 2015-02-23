var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.includes.software,
  bindings: {
    'model.source': '[data-hook~=source]',
    'model.nvdId': '[data-hook~=nvdId]',
    'model.status': '[data-hook~=status]',
    'model.modifiedDate': '[data-hook~=modifiedDate]',
    'model.part': '[data-hook~=part]',
    'model.vendor': '[data-hook~=vendor]',
    'model.product': '[data-hook~=product]',
    'model.version': '[data-hook~=version]',
    'model.update': '[data-hook~=update]',
    'model.edition': '[data-hook~=edition]',
    'model.language': '[data-hook~=language]',
    'model.processPath': '[data-hook~=processPath]',
    'model.processPid': '[data-hook~=processPid]',
    'model.processPpid': '[data-hook~=processPpid]',
    'model.processArgs': '[data-hook~=processArgs]'
  }
});
