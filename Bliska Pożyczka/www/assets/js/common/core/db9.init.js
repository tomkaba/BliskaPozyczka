$(function(){
    ( db9.config.useCookies === true && ! db9.cookies.isAccepted() ? db9.cookies.init() : null );
    db9.core.init();
    db9.address.init();
});