export const extend = function(ext, supr, cls){
    var copy = supr || function(){};
    //var copy = function(){ return orig.apply(this, arguments) };
    Object.keys(cls.prototype).forEach(function(key){
        copy.prototype[key] = cls.prototype[key];
    });
    Object.keys(ext).forEach(function(key){
        copy.prototype[key] = ext[key];
    });
    copy.extend = function(ext, supr){
        return extend(ext, supr, copy);
    };
    return copy;
};
export default extend;
