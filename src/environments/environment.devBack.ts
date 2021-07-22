export const environment = {
    production: true,
    hmr       : false,
    server    : 'http://192.168.100.117:28080/',
    baseUrl   : 'api_favalogyc_backend/',    
    api_log   : 'http://192.168.100.117:28080/fava-auth-svc/login',
    url_tomcat: 'https://192.168.100.101:8443/apiOnboard_trb/rest/'
};

/* 
Environment DEV_BACK

comando -> ng build --base-href "/favalogycDB/" --configuration=devBack

"192.168.100.117:28080/favalogycDB"
server:"http://192.168.100.117:28080", 
baseUrl:"/api_favalogyc_backend/",
*/