import add from './index.js'

import mocha, {suite, test} from 'mocha'
import chai, {assert} from 'chai'

suite('Array', function() {
    suite('#add()', function() {
        test('should return 3 when args are 1 and 2', function() {
            var res = add.apply(null, [1, 2]);
            assert.equal(res, 3);
        });
    });
});
