
/*
 *  @name preloader
 *  @author d9
 */

;(function($){
    
    $.fn.preloader = function( options )
    {
        var _this = this,
            $this = $(_this),
            defaults = {
                progressingDuration : 100, 
                progressingEasing: 'linear',
                progressingComplete: null,
                showingDuration: 300, 
                showingEasing: 'linear',
                hidingDuration: 300, 
                hidingEasing: 'linear'
            };
        
        options = $.extend( defaults, options );
        
        // support multiple elements
        if ( this.length > 1 ){
            return this.each( function() {
                $this.preloader( options );
            });
            return this;
        };
        
        this.initialize = function(){
            if ( ! $this.children( '.progress' ).length ){
                $this.append( '<div class="progress" style="width:0px"></div>' );
            }
            return this;
        };
        
        this.progress = function ( _percent ){
            $this.find( '.progress' )
                .stop( true, true )
                .animate( 
                    { width: _percent + '%' }, 
                    {
                        duration: options.proggressingDuration,
                        queue: false,
                        easing: options.proggressingEasing,
                        complete: options.progressingComplete
                    }
                );
        };

        this.show = function(){
            $this.css({ 
                    'opacity': 0, 
                    'display': 'block' 
                }).animate( 
                    { opacity: 1 }, 
                    {
                        duration: options.showingDuration,
                        queue: false,
                        easing: options.showingEasing
                    });
        };

        this.hide = function(){
            $this.stop( true, true )
                .animate( 
                    { opacity: 0 }, 
                    {
                        duration: options.hidingDuration,
                        queue: false,
                        easing: options.hidingEasing,
                        complete: function(){
                            _this.progress(0);
                        }
                    }
                );
        };

        this.remove = function(){
            $this.remove();
        };
        
        return this.initialize();
    };
    
})(jQuery);