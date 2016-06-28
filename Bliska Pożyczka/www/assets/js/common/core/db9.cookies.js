
db9.cookies = {
    
    cookieName : 'COOKIEACCEPT',
    styleCss : null,
    htmlCode : '<div id="cookies-notification">' +
               '<span>Aby ułatwić korzystanie z naszej strony www, używamy plików cookies. Jeżeli nie wyrażasz na to zgody, ' +
               'możesz zmienić ustawienia swojej przeglądarki. Więcej informacji ' +
               'w <a href="/polityka-cookies"><u>Polityce&nbsp;Cookies</u></a> ' +
               '<a href="/#/" id="ui-button-cookies-accept">Ok, rozumiem.</a></span></div>',
    htmlTarget : '#content',
    
    init : function(){
        if ( db9.cookies.styleCss ){
            var stylesheet = $( '<link />', {
                    rel: 'stylesheet',
                    href: db9.cookies.styleCss,
                    media: 'all'
                 });
            $( 'head' ).append(stylesheet);
        }
        
        $( db9.cookies.htmlCode )
            .appendTo( db9.cookies.htmlTarget )
            .find( '#ui-button-cookies-accept' )
            .on({
                click: function(e){
                    e.preventDefault();
                    db9.cookies.setAccept();
                    $( db9.cookies.htmlTarget )
                        .find( '#cookies-notification' )
                        .slideUp(200);
                }
            });
    },
    
    isAccepted : function(){
        return ( document.cookie.indexOf( db9.cookies.cookieName ) >= 0 );
    },
    
    setAccept : function(){
        var d = new Date();
        d.setFullYear( d.getFullYear() + 1 );
        document.cookie = db9.cookies.cookieName + '=true; expires=' + d.toUTCString() + '; path=/';
    }
};