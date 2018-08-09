const mcache = require('memory-cache');

module.exports = serviceName => async (key, dataFetchFunc, duration = 10) => {
    const cahceKey = `${serviceName}-${key}`;
    const cachedBody = mcache.get(cahceKey);

    if(cachedBody) return cachedBody;
    else {
        const data = await dataFetchFunc();
        mcache.put(cahceKey, data, duration * 1000);
        return data;
    }
}