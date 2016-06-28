db9.core = {
    init: function() {
        $( 'a' ).on( 'click', db9.core.handlers.click.init );
        db9.core.handlers.context.init();

        return this;
    },

    is: function( _object ) {
        if ( $( _object ).length > 0 )
            return true;
        return false;
    },
            
    detect: {
        ie7: function() {
            if ( navigator.appName.indexOf( "Internet Explorer" ) != -1 )
                return ( navigator.appVersion.indexOf( "MSIE 7" ) != -1 );
            return false;
        },
        touch: function(){
            return !!( 'ontouchstart' in window );
        }
    },
            
    handlers: {
        click: {
            href: '/#/',
            init: function() {
                return !( $(this).attr( 'href' ) == db9.core.handlers.click.href || $(this).hasClass( 'disabled' ) );
            }  
        },
        context: { 
            init: function() {
                $( 'img' )
                    .on( 'contextmenu', 
                            function() {
                                return false;
                            }
                    );
            }
        }    
    },
    
    execute: {
        json: function( _options ) {
            var defaults = { };
            if ( typeof _options != 'undefined' ) {
                $.extend( defaults, _options );
            }

            if ( db9.config.debug )
                console.log( 'JSON options: ' + defaults );

            $.ajax({
              type: 'GET',
              url: defaults.uri,
              cache: false,
              async: true,
              dataType: 'json',
              success: defaults.handler,
              error: function() { 
                  if ( db9.config.debug )
                    console.log( 'JSON Error loading uri: ' + defaults.uri );
              }
            });
        },
            
        ajax: function( _options ) {
            var defaults = { };
            if ( typeof _options != 'undefined' ) {
                $.extend( defaults, _options );
            }

            if ( db9.config.debug )
                console.log( 'AJAX options: ' + defaults );

            $.ajax({
              type: 'GET',
              url: defaults.uri,
              cache: false,
              async: true,
              dataType: 'html',
              success: defaults.handler,
              error: function() { 
                  if ( db9.config.debug )
                    console.log( 'AJAX Error loading uri: ' + defaults.uri );
              }
            });
        }    
    },
        
    load: function( _scripts, _callback ) {
        for ( i in _scripts ) {
            $.ajax({
                url: _scripts[i],
                dataType: 'script',
                async: false,
                cache: db9.config.scriptsCache,
                error: function() {
                    if ( db9.config.debug )
                        console.log( 'Error loading scripts: ' + _scripts[i] );
                }
            });
        }

        if ( _callback ) {  
            $(window).on( 'load', function() {
                _callback();
                if ( db9.config.debug )
                    console.log( 'Scripts loaded!' );
            });
        }

    }
};
