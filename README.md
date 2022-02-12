extend-interface
================

An ultra-lightweight prototypal inheritance mechanism built into the class definition itself.

Usage
-----

```javascript
    const extendClass = require('extend-interface');

    let MyClass = function(){ }

    MyClass.prototype.output = function(){
        console.log(this.value())
    };
    MyClass.prototype.value = function(){
        throw new Error('No value() implementation')
    };
    MyClass.extend = function(cls, cns){
        var cons = cns || function(){
            MyClass.apply(this, arguments);
            return this;
        };
        return extendClass(cls, cons, MyClass);
    };
```

then, in another class, you can implement:

```javascript
    const extendClass = require('extend-interface');

    let SubClass = MyClass.extend({
        value : function(){
            return 'awesome';
        }
    })
    let subClassInstance = new SubClass();
```
