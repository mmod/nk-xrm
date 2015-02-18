/*!
 * MMOD Plugin - v1.0.0 - 2013-05-15
 *
 *
 * @version   $Id$
 * @author    Richard B. Winters http://www.mmogp.com
 * @copyright Copyright (C) 2011 - 2014 Massively Modified, Inc
 * @license   Apache v2.0
 */

( function ( $ )
{
    // The top navigation
    var topNav =
        {
            btn:
            {
                dashboard:  'main-nav-btn',
                activities:  'main-nav-btn',
                chronicle:  'main-nav-btn',
                inventory:  'main-nav-btn',
                reports:  'main-nav-btn'
            },

            // Sub menu containers
            div:
            {
                dashboard:  'client-nav-grp',
                activities:  'client-nav-grp',
                chronicle:  'client-nav-grp',
                inventory:  'client-nav-grp',
                reports:  'client-nav-grp'
            },

            // Sub menu buttons
            sub:
            {
                dashboard:
                {
                    overview:  'client-nav-btn',
                    reports:  'client-nav-btn',
                    analytics:  'client-nav-btn',
                    export:  'client-nav-btn',
                    schedule:  'client-nav-btn',
                    contacts:  'client-nav-btn',
                    chat:  'client-nav-btn'
                }
            }

        };// End topNav variable definition.

    // Let's build the UI navigation system for the application.
    $.each
    (
        topNav,                             // For each topNav element,
        function ( key, val )
        {
            //alert( key + ": " + val );        // Key will be li, or sub.  Val will be of object type.
            switch( key )
            {
                case 'btn':
                {
                    // Create the functions for all of the tabs.
                    $.each
                    (
                        val,
                        function( k, v )
                        {
                            // Remove HREF attributes.
                            var tbtn = $( '.' + v + '.' + k );
                            tbtn.removeAttr( 'href' );

                            // Declare and define the 'on' 'click' event handler.
                            tbtn.on
                            (
                                'click',
                                this,
                                function ()
                                {
                                    // Remove the 'active' class from all of the li element's.
                                    $.each
                                    (
                                        tbtn.closest( '.nav.navbar-nav' ).find( 'li' ),
                                        function( k, v )
                                        {
                                            $( v ).find( 'a' ).removeClass( 'active' );
                                            $( v ).removeClass( 'active' );
                                        }
                                    );
                                    $.each
                                    (
                                        $( '#client-menu' ).find( '.client-nav-grp' ),
                                        function( k, v )
                                        {
                                            $( v ).removeClass( 'active' );
                                        }
                                    )

                                    tbtn.addClass( 'active' );
                                    tbtn.parent().addClass( 'active' );
                                    $( '#client-menu' ).find( '.client-nav-grp.' + k ).addClass( 'active' );

                                    // Remove the 'active' class from all of the a elements
                                    $.each
                                    (
                                        $( '#client-menu' ).find( '.client-nav-grp' ),
                                        function( y, z )
                                        {
                                            if( v.each )
                                            {
                                                v.each
                                                (
                                                    v.find( '.nav.nav-sidebar' ),
                                                    function( w, x )
                                                    {
                                                        x.each
                                                        (
                                                            this.find( '.client-nav-btn' ),
                                                            function( y, z )
                                                            {
                                                                $( z ).removeClass( 'active ' );
                                                            }
                                                        );
                                                    }
                                                );
                                                v.removeClass( 'active' );
                                            }
                                        }
                                    );

                                    // Add the 'active' class to the respective element.
                                    // Add the 'active' class to the clicked li element.
                                    $( '#client-menu' ).find( '.client-nav-grp' + k ).addClass( 'active' );
                                    $( '#client-menu' ).find( '.client-nav-grp' + k ).find( '.client-nav-btn' ).addClass( 'active' );

                                    // And get our page
                                    //$.mmod.view( { disp: k, type: 'normal' } );
                                }
                            );
                        }
                    );

                }break;

                case 'sub':
                {
                    // Create the functions for all of the submenu buttons
                    $.each
                    (
                        val,
                        function( k, v )
                        {
                         // Remove HREF attributes.
                            var mbtng = k;
                            $.each
                            (
                                v[k],
                                function( ik, iv )
                                {

                                }
                            );

                            var mbtn = $( '.' + v + '.' + k );
                            mbtn.removeAttr( 'href' );

                            // Declare and define the 'on' 'click' event handler.
                            mbtn.on
                            (
                                'click',
                                this,
                                function ()
                                {
                                    // Remove the 'active' class from all of the sub element's.
                                    $.each
                                    (
                                        mbtn.closest( '.client-nav-grp' ).find( '.nav.nav-sidebar' ),
                                        function ( u, v )
                                        {
                                            $.each
                                            (
                                                this.find( 'li' ),
                                                function( w, x )
                                                {
                                                    x.removeClass( 'active' );
                                                }
                                            )
                                        }
                                    );

                                    // Add the 'active' class to the clicked sub element.
                                    mbtn.addClass( 'active' );

                                    // Make a $.daxle plugin call
                                    //$.mmod.view( { disp: k, type: 'normal' } );
                                }
                            );
                        }
                    );
                }break;
            }
        }
    );



    var fBlue = $( document.getElementById( ':F:b:f' ) );
    var aRed = $( document.getElementById( ':F:b:a' ) );
    var sGrey = $( document.getElementById( ':F:b:st' ) );
    var cBox = $( document.getElementById( ':px:gs' ) );
    var sBox = $( document.getElementById( ':F:b:s' ) );
    var lBox = $( document.getElementById( ':F:b:s:o:l' ) );
    var oBox = $( document.getElementById( ':F:b:s:o' ) );
    var top1 = $( document.getElementById( 'header-box' ) );
    var top2 = $( document.getElementById( ':H:F' ) );
    var top3 = $( document.getElementById( ':H:N' ) );
    var logo = $( document.getElementById( ':H:N:Lc' ) );
    var pBtn = $( document.getElementById( ':H:N:Ph' ) );
    var pop = $( document.getElementById( ':H:N:p' ) );

    fBlue.on( "mouseover", function( event )
         {
             $( document.getElementById( ':F:b:f:tt' ) ).show();
         }
        );

    fBlue.on( "mouseout", function( event )
         {
             $( document.getElementById( ':F:b:f:tt' ) ).hide();
         }
        );

    aRed.on( "mouseover", function( event )
         {
             $( document.getElementById( ':F:b:a:tt' ) ).show();
         }
        );

    aRed.on( "mouseout", function( event )
         {
             $( document.getElementById( ':F:b:a:tt' ) ).hide();
         }
        );

    sGrey.on( "mouseover", function( event )
         {
             $( document.getElementById( ':F:b:st:tt' ) ).show();
         }
        );

    sGrey.on( "mouseout", function( event )
         {
             $( document.getElementById( ':F:b:st:tt' ) ).hide();
         }
        );

    cBox.on( "click", function( event )
         {
             $( document.getElementById( ':px:gs:m' ) ).toggle
             (
                 function()
                 {
                     $( document.getElementById( ':px:gs:m' ) ).animate( { height: $( ':px:gs:m:l' ).height() },200);
                  },
                 function()
                 {
                    $( document.getElementById( ':px:gs:m' ) ).animate( { height: "auto" },200);
                 }
             );
         }
        );

    cBox.on( "mouseover", function( event )
         {
             $( document.getElementById( ':px:gs:tt' ) ).show();
         }
        );

    cBox.on( "mouseout", function( event )
         {
             $( document.getElementById( ':px:gs:tt' ) ).hide();
         }
        );

    sBox.on( "click", function( event )
         {
             if( lBox.is( ":hidden" ) )
             {
                oBox.hide(),
                    lBox.show(),
                        sBox.animate( { height: lBox.height() + 10 }, 200);
             }else
             {
                 lBox.hide(),
                     oBox.show(),
                         sBox.animate( { height: 29 }, 200 );
             }
         }
        );

    sBox.on( "mouseover", function( event )
         {
             $( document.getElementById( ':F:b:s:tt' ) ).show();
         }
        );

    sBox.on( "mouseout", function( event )
         {
             $( document.getElementById( ':F:b:s:tt' ) ).hide();
         }
        );

    pBtn.on( "mouseover", function( event )
        {
            pop.css( "margin-left", "0px" );
        }
    );

    pop.on( "mouseover", function( event )
        {
            pop.css( "margin-left", "0px" );
        }
    );
    pop.on( "mouseout", function( event )
        {
            pop.css( "margin-left", "-250px" );
        }
    );

    $( "#selectable" ).selectable
    (
        {
          stop: function( e )
            {
                var result = $( "#select-result" ).empty();
                var selected = $( "#selected" ).html();
                var options = {};
                var selection = "";

                $( ".ui-selected", this ).each
                (
                    function()
                    {
                        var index = $( "#selectable li" ).index( this );
                        result.append( " #" + ( index + 1 ) );

                        options[index] = $(this).text();
                        //alert( $(this).text() );
                        //alert( index )
                    }
                );

                if( $.isEmptyObject( options ) )
                {
                    selection = "Select a value.."
                }else
                {
                    selection = "";
                    $.each
                    (
                        options,
                        function( k, v )
                        {
                            if( selection === "" )
                            {
                                selection += v;
                            }else
                            {
                                selection += ", " + v;
                            }
                        }
                    );
                }

                //alert( JSON.stringify( options ) );
                oBox.html( selection );

                if( !e.ctrlKey )
                {
                    lBox.hide();
                    oBox.show();
                    sBox.animate( { height: 29 }, 200 );
                }else
                {
                    if( selection === "Select a value.." )
                    {
                        lBox.hide();
                        oBox.show();
                        sBox.animate( { height: 29 }, 200 );
                    }
                }
            }
        }
    );

    $( document ).bind
    (
        'mousewheel DOMMouseScroll MozMousePixelScroll',

        function( e )
        {
            if( ( e.originalEvent.wheelDelta / 120 > 0 ) || ( e.originalEvent.detail / 3 < 0 ) )
            {
                top1.show();
                top2.show();
                top3.css( "top", "78px" );
                pop.css( "top", "78px" );
                pBtn.css( "margin-left", "20px" );
                logo.hide();
                //alert( "It moves up for us!" );
            }else
            {
                top1.hide();
                top2.hide();
                top3.css( "top", "0px" );
                pop.css( "top", "0px" );
                pBtn.css( "margin-left", "36px" );
                logo.show();
                //alert( "It moves down for us!" );
            }
        }
    );

} (jQuery) );