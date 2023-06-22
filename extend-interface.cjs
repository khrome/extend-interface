(function (root, factory){
    if(typeof define === 'function' && define.amd){
        // AMD. Register as an anonymous module.
        define([], factory);
    }else if (typeof module === 'object' && module.exports){
        module.exports = factory();
    }else{
        // Browser globals (root is window)
        root.extendInterface = factory();
    }
}(this, function(){
    
    let extendify = function(ext, supr, cls){
        var copy = supr || function(){};
        //var copy = function(){ return orig.apply(this, arguments) };
        Object.keys(cls.prototype).forEach(function(key){
            copy.prototype[key] = cls.prototype[key];
        });
        Object.keys(ext).forEach(function(key){
            copy.prototype[key] = ext[key];
        });
        copy.extend = function(ext, supr){
            return extendify(ext, supr, copy);
        };
        return copy;
    }
    
    extendify.default = extendify;
    extendify.extend = extendify;
    
    return extendify;
}));
