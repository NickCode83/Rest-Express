/**
 * Created by nickchu on 16/3/10.
 */
var superagent = require('superagent'),
    expect = require('expect.js');

describe('express rest api serve', function(){
    var id;

    //新建数据的测试用例:创建一个新对象
    it('post object',function(done){
        superagent.post('http://localhost:3000/collections/test')
            .send({
                name:'John',
                email:'john@rpjs.co'
            })
            .end(function(e,res){
                console.log(res.body);
                expect(e).to.eql(null);   //返回的错误对象为空
                expect(res.body.length).to.eql(1);  //响应对象的数组应该含有且只含有一个元素
                expect(res.body[0]._id.length).to.eql(24);  //第一个响应对象中应包含一个24字节长度的_id属性,他是一个标准的MongoDB对象ID类型.
                id = res.body[0]._id;
                done();  //在测试异步代码中,不要漏掉这里的done()函数,否则Mocha的测试程序会在收到服务器响应之前结束.
            });
    });

    //查询数据的测试用例:通过对象ID检索刚才建立的新对象
    it('retrieves an object',function(done){
        superagent.get('http://localhost:3000/collections/test/' +id)
            .end(function(e,res){
                console.log(res.body);
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body._id.length).to.eql(24);
                expect(res.body._id).to.eql(id);
                done();
            });
    });


});