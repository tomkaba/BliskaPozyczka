
db9.address = {
    
    metatags : {
        title : 'html title',
        description : 'html meta[name="description"]',
        keywords : 'html meta[name="keywords"]'
    },
    
    callback : [],
    hashval : null,
    
    init : function(){
        var h = window.location.hash.slice(2);
        $(function(){
            if (h) db9.address.go( window.location.hash );
            db9.address.observe();
        });
    },
    
    observe : function(){
        //( history.length > 0 ? history.go(-1) : null );
        $(window).on( 'hashchange', function(){ 
            var h = window.location.hash.indexOf('!') > -1 ? window.location.hash.slice(2) : window.location.hash.slice(1);
            if ( h !== db9.address.hashval ){
                db9.address.hashval = h;
                if ( db9.config.debug ) console.log( 'db9.address.hashChange' );
                if ( db9.address.callback.length ) {
                    if ( db9.config.debug ) console.log( 'db9.address.hashChange.callback[' + db9.address.hashval +']' );
                    for( i in db9.address.callback )
                        db9.address.callback[i]();
                }
            }
        }).trigger( 'hashchange' );
    },
    
    addCallback : function( _callback ) {
        db9.address.callback.push( _callback );
    },
    
    getHash : function(){
        return db9.address.hashval;
    },
    
    go : function( _uri ){
        if ( db9.config.debug ) console.log( 'db9.address.go' );
        db9.address.hashval = null;
        $( 'a[href$="'+ ( _uri ? _uri : window.location.hash ) +'"]' ).trigger( 'click' );
        $(window).trigger( 'hashchange' );
    },
    
    meta : function( _meta ){
        // HTML5 history.pushSate()
        if ( _meta.title )
            $( this.metatags.title ).text( _meta.title );
        if ( _meta.description )
            $( this.metatags.description ).attr( 'content', _meta.description );
        if ( _meta.keywords )
            $( this.metatags.keywords ).attr( 'content', _meta.keywords );
    }
};