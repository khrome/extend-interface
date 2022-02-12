const should = require('chai').should();
const extend = require('../extend-interface')

describe('extend-interface', ()=>{
    describe('extends abstract function', ()=>{
        it('return augmenting an abstract function', ()=>{
            let MyClass = function(){ }

            MyClass.prototype.output = function(){
                return 'test: '+this.value();
            };
            MyClass.prototype.value = function(){
                throw new Error('No value() implementation')
            };
            MyClass.extend = function(cls, cns){
                var cons = cns || function(){ MyClass.apply(this, arguments); return this };
                return extend(cls, cons, MyClass);
            };

            let SubClass = MyClass.extend({
                value : function(){
                    return 'awesome';
                }
            });

            let subClassInstance = new SubClass();
            let myClassInstance = new MyClass();

            try{
                let subClassOutput = subClassInstance.output();
                should.exist(subClassOutput);
                subClassOutput.should.equal('test: awesome');
            }catch(ex){
                should.not.exist(ex);
            }
            try{
                let myClassOutput = myClassInstance.output();
                should.not.exist(myClassOutput);
            }catch(ex){
                should.exist(ex);
                ex.message.should.equal('No value() implementation');
            }
        });
    });
});
