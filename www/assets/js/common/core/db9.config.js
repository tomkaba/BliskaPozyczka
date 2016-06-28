
db9.config = {};
db9.config.debug = false;
db9.config.useCookies = true;
db9.config.scriptsCache = false;
db9.config.plugins = [];
db9.config.selectors = {
    ajax : {
        parent : '#ajax',
        content : '#ajax > section'
    },
    content : {
        parent : '#content',
        main : 'div[role="main"]'
    }
};
db9.objects = {};