export const environment = {
    production: true,
    hmr       : false,
    server    : 'http://192.168.100.117:28080/',
    baseUrl   : 'api_favalogyc_preprod/',    
    api_log   : 'http://192.168.100.117:28080/fava-auth-svc/login',
    url_tomcat: 'https://192.168.100.101:8443/apiOnboard_trb/rest/'
};

/*
Environment PREPROD

comando -> ng build --base-href "/favalogycPreprod/" --configuration=preProd

"192.168.100.117:28080/favalogycPreprod"
server:"http://192.168.100.117:28080", 
baseUrl:"/api_favalogyc_preprod/",
*/ 