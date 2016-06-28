var db9 = {
    log : function( notice ){
        if ( db9.config.debug ){
            if ( window.console )
                console.log( notice );
            else alert( notice );
        }
    }
};