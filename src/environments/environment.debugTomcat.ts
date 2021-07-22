export const environment = {
    production: true,
    hmr       : false,
    server    : 'http://127.0.0.1:8080/',
    baseUrl   : 'api_favalogyc_debug/',    
    api_log   : 'http://192.168.100.117:28080/fava-auth-svc/login',
    url_tomcat: 'https://192.168.100.101:8443/apiOnboard_trb/rest/'
};

/* 
Environment DEBUG_TOMCAT

comando -> ng build --base-href "/favalogycDEBTomcat/" --configuration=debugTomcat

127.0.0.1:8081/favalogycDEBTomcat
server:"http://127.0.0.1:8080", 
baseUrl:"/api_favalogyc_debug/",
*/