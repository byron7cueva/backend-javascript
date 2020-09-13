const assert = require('assert');

const buildMessage = require('../utils/buildMessage');

describe.only('utils - buildMessage', function () {
  describe('when receives an entity and an action', function() {
    it('should return the espective message', function () {
      const result = buildMessage('movie', 'create');
      const expect = 'movie created';
      assert.strictEqual(result, expect);
    })
  });

  describe('when recives an entity and an action and is a list', function() {
    it('should return the respective message with when the entity in plural', function() {
      const result = buildMessage('movie', 'list');
      const expected = 'movies listed';
      assert.strictEqual(result, expected);
    })
  });
});