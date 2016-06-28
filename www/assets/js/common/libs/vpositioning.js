
/*
 *  @name vpositioning (Vertical Positioning)
 *  @author d9
 */

;(function($){
    
    $.fn.vpositioning = function( options )
    {
        var _this = this,
            defaults = {
                margin: 0,
                responsive: false
            };
        
        options = $.extend( defaults, options );
        
        return this.each( function() {
            
            pos();
            
            if ( options.responsive == true )
                $(window).on( 'resize', pos );
        });
        
        function pos() {
            var h = $(_this).height(),
                pH = $(_this).parent().height(),
                t = ( pH - h ) / 2;

            $(_this)
                .parent().css({ 'position': 'relative' })
                .end().css({ 'position': 'absolute', 'top': '0px', 'margin-top': ( t < options.margin ? options.margin : t ) });
        }
    };
    
})(jQuery);