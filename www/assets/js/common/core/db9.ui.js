
db9.ui = {
    
    construct : function(){
        $(function(){
            db9.ui.init();
        });
    }(),
    
    init : function(){
        db9.ui.selects.init();
            
        $( 'a[data-history="back"]' )
            .on( 'click', function(){
                if ( $(this).attr( 'href' ) == '/#/' )
                    window.history.go(-1);
            });
        
        $( 'a[data-action*="input:file"]' )
            .on( 'click', function(){
                var sInputFileName = $(this).data( 'action' ).split(':')[2];
                if ( ! $(this).hasClass( 'disabled' ) )
                    $( 'input[name="'+ sInputFileName +'"]' ).trigger( 'click' );
            });
        
        $( 'input[type="file"][data-autosubmit="true"]' )
            .on( 'change', function(){
                $(this).parents( 'form' ).submit();
            });
        
        $( 'a[data-action="delete"]' ).add
         ( 'input[data-action="delete"]' )
            .on( 'click', function(){
                if ( ! $(this).hasClass( 'disabled' ) )
                    return confirm( 'Czy na pewno chcesz usunąć wybrany element? Zmiany będą nieodwracalne.' );
            });

        $( 'table' )
            .find( 'tr[data-href]' )
            .on( 'click', function(){
                var d = $(this).data();
                ( d.href && d.href != '/#/' ? window.location.href = d.href : null );
            });

        if ( $.fn.mask ) {
            $( 'input[name*="postal_code"]' ).mask( '99-999' );
            $( 'input[name*="tid"]' ).mask( '999-999-99-99' );
        }
        
        if ( $.fn.iCheck ) {
            $( 'input[data-plugin="icheck"]' )
                .iCheck({
                    checkboxClass: 'icheckbox',
                    // radioClass: 'iradio'
                });
        }
        
        if ( $.fn.rangeslider ) {
            $( 'input[type="range"]' )
                .rangeslider({
                    polyfill: false
                });
        }
        
        if ( db9.core.is( db9.ui.passwords.selectors[1] ) )
            db9.ui.passwords.validate();
        
        if ( db9.core.is( db9.ui.window.handle ) )
            db9.ui.window.init();
    },
    
    notice : {
        
        selector : '#notice',
        callback : null,
        doit : null,
        
        set : function( _text, _doit ){
            if ( _doit ) db9.ui.notice.doit = _doit;
            $( db9.ui.notice.selector )
                .css({ 'display': 'block', 'opacity': 0 })
                .find( '.main' ).css({ 'margin-top': '+=50px' }).end()
                .find( '.responseText' ).html( _text );
            db9.ui.notice.show();
            $(document).keyup( function(e){
                ( e.keyCode == 27 ? db9.ui.notice.close() : null );
            });
        },
        
        show : function(){
            $( db9.ui.notice.selector )
                .find( '.button, [data-action="close"]' )
                .on( 'click', db9.ui.notice.close ).end()
                .animate({ 'opacity': 1 }, {
                    duration: 500,
                    queue: false,
                    easing: 'easeInOutExpo'
                })
                .find( '.main' )
                .animate({ 'margin-top': '-=100px' }, {
                    duration: 500,
                    queue: false,
                    easing: 'easeInOutExpo',
                    complete: function(){
                        if ( db9.ui.notice.doit )
                            db9.ui.notice.doit();
                    }
                });
        },
        
        close : function(){
            $( db9.ui.notice.selector )
                .animate({ 'opacity': 0 }, {
                    duration: 800,
                    queue: false,
                    easing: 'easeInOutExpo',
                    complete: function(){
                        $(this).hide();
                        ( db9.ui.notice.callback ? db9.ui.notice.callback(): null );
                    }
                })
                .find( '.main' )
                .animate({ 'margin-top': '+=100px' }, {
                    duration: 500,
                    queue: false,
                    easing: 'easeInOutExpo'
                });
        }
    },
    
    selects : {
        
        selectors : [ '.select', '.list' ],
        changed : false,
        callback : null,

        init : function() {
            $( db9.ui.selects.selectors[0] ).add
             ( db9.ui.selects.selectors[1] )
                .on({
                    mouseover: function(){
                        $(this).find( '.options' ).stop( true, true ).show();
                    },
                    mouseleave: function(){
                        $(this).find( '.options' ).hide();
                    }
                })
                .find( 'ul a' )
                .on( 'click', function(){
                    var opts = $(this).data( 'opts' ),
                        parent = $(this).parents( '.options' ).parent();
                    if ( opts ){
                        db9.ui.selects.changed = ( $(parent).find( 'input' ).val() != opts.value );
                        
                        $(parent)
                         .find( 'input' ).val( opts.value ).end()
                         .find( '.value' ).text( opts.text );
                    }
                    
                    $(this).parents( '.options' ).hide();
                    ( db9.ui.selects.callback ? db9.ui.selects.callback( opts ) : null );
                    
                    return ( $(this).attr( 'href' ) == '/#/' ? false : true );
                });
        }
    },
    
    passwords : {
        
        selectors : [ '#passwd_new', '#passwd_repeat' ],

        validate : function() {
            var length = db9.ui.passwords.selectors.length;
            for( i = 0; i < length; i++ )
                document.getElementById( db9.ui.passwords.selectors[i].substr(1) ).onchange = db9.ui.passwords.onchange;
        },
        
        onchange : function() {
            var input_password_repeat = document.getElementById( db9.ui.passwords.selectors[1].substr(1) ),
                input_password_new = document.getElementById( db9.ui.passwords.selectors[0].substr(1) );
            if( input_password_new.value !== input_password_repeat.value ) 
                input_password_repeat.setCustomValidity( 'Hasła nie są zgodne' );
            else input_password_repeat.setCustomValidity( '' ); 
        }
        
    },
    
    cursor : {
        
        selector : 'body',
        
        wait : function(){
            $( db9.ui.cursor.selector ).css({ 'cursor': 'progress' });
        },
        
        normal : function(){
            $( db9.ui.cursor.selector ).css({ 'cursor': 'auto' });
        }
    },
    
    window : {
        
        handle : '.window',
        callback : null,
        
        init : function(){
            $(document).keyup( function(e){
                ( e.keyCode == 27 ? db9.ui.window.close() : null );
            });
            
            $( db9.ui.window.handle )
                .find( 'nav > a' )
                .on( 'click', function(e){
                    e.preventDefault();
                    db9.ui.window.close();
                });
        },
        
        open : function( _options ){
            db9.ui.cursor.wait();
            var build = function( dataHTML ) {
                    $( db9.config.selectors.ajax.content ).html( dataHTML );
                    $( db9.config.selectors.ajax.parent ).show();

                    db9.ui.init();
                    db9.ui.cursor.normal();
                    if ( db9.ui.window.callback )
                        db9.ui.window.callback();
                };
            db9.core.execute.ajax({ uri: _options.uri, handler: build });
        },

        close : function(){
            $( db9.config.selectors.ajax.content ).empty();
            $( db9.config.selectors.ajax.parent ).hide();
        }
        
    }
};