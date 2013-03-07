var assert = require('assert'),
    connect = {session:{Store:{}}},
    MongoStore = require('../lib/mongoStore')(connect);

var options = {
   db  :  'test_session',
   collName : 'sessions',
   expire: 5
};

var id ='secretId';
var id2='id2';

var sessionData = {prop1: 'value1'};
var newSessionData =  {prop1: 'value2'};

var mongoStore = new MongoStore(options);

mongoStore.set(id, sessionData, function(err, status){
    assert.equal(err,null, 'set has error');
    assert.ok(status);

    mongoStore.get(id, function(err2, data){
        assert.equal(err2,null, 'get has error');
        assert.deepEqual({prop1: 'value1'}, data);

        mongoStore.set(id, newSessionData, function(err3, status2){
            assert.ok(!err3, 'set (update) has error');
            assert.ok(status2);

            mongoStore.get(id, function(err4, data2){
                assert.ok(!err4, 'get has error');
                assert.deepEqual({prop1: 'value2'}, data2);

                mongoStore.destroy(id, function(err5, status3){
                    assert.ok(!err5, 'destroy has error');
                    assert.ok(status3);

                    mongoStore.get(id, function(err6, data3){
                        assert.equal(data3,null, 'data is not destroyed');
                        console.log('#1 set, get, and destroy works');
                    });

                });
            });

        });

    });

});

mongoStore.set(id2, sessionData, function(err, status){
    assert.ok(!err, 'set has error');
    assert.ok(status);

    setTimeout(function(){

        mongoStore.get(id2, function(err, data){
            assert.equal(err,null, 'get has error');
            assert.equal(data, null, 'data is not destroyed by ttl');
            console.log('#2 ttl works');
        });

    }, 30000);
});


