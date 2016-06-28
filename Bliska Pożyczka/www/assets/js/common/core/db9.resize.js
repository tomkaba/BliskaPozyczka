
db9.resize = {
    
    timer : null,
    callback : [],

    construct : function(){
        $(function(){
            $(window).resize(
                function(){
                    $( function(){
                        clearTimeout( db9.resize.timer );
                        db9.resize.timer = setTimeout( 
                            function(){
                                if ( db9.resize.callback.length ) {
                                    for( i in db9.resize.callback )
                                        db9.resize.callback[i]();
                                }
                            }, 600 );
                    });
                });
            });
    }(),
    
    addCallback : function( _callback ) {
        db9.resize.callback.push( _callback );
    }
};
