let appConfig = {};

appConfig.port = 5000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: ''
};
appConfig.apiVersion = '/api/v1';

module.exports = {
    
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion

};  // end of module.exports
