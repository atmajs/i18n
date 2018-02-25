export function obj_getProperty(obj, property) {
    var chain = property.split('.'),
        imax = chain.length,
        i = -1;
    while (++i < imax) {
        if (obj == null)
            return null;

        obj = obj[chain[i]];
    }
    return obj;
};


export function obj_setProperty(obj, property, value) {
    var chain = property.split('.'),
        imax = chain.length,
        i = -1,
        key;

    while (++i < imax - 1) {
        key = chain[i];

        if (obj[key] == null)
            obj[key] = {};

        obj = obj[key];
    }

    obj[chain[i]] = value;
};


export function obj_extend(target, source) {
    if (target == null)
        target = {};
    if (source == null)
        return target;

    var val,
        key;
    for (key in source) {
        val = source[key];
        if (val != null)
            target[key] = val;
    }
    return target;
};