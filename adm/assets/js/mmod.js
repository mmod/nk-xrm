/*!
 * mmod $ Plugin - v1.0.0 - 2013-05-15
 *
 * @author    Richard B Winters http://www.mmogp.com
 * @copyright Copyright (C) 2011 - 2014 Massively Modified, Inc.
 */


// jQuery
( function( $ )
    {
        // prevent duplicate loading
        // this is only a problem because we proxy existing functions
        // and we don't want to double proxy them
        $.mmod = $.mmod || {};

        $.extend
        (
            $.mmod,
            {
                version: "1.0.0",

                keyCode:
                {
                    BACKSPACE: 8,
                    COMMA: 188,
                    DELETE: 46,
                    DOWN: 40,
                    END: 35,
                    ENTER: 13,
                    ESCAPE: 27,
                    HOME: 36,
                    LEFT: 37,
                    NUMPAD_ADD: 107,
                    NUMPAD_DECIMAL: 110,
                    NUMPAD_DIVIDE: 111,
                    NUMPAD_ENTER: 108,
                    NUMPAD_MULTIPLY: 106,
                    NUMPAD_SUBTRACT: 109,
                    PAGE_DOWN: 34,
                    PAGE_UP: 33,
                    PERIOD: 190,
                    RIGHT: 39,
                    SPACE: 32,
                    TAB: 9,
                    UP: 38
                }
            }
        );
    }( jQuery )
);


// jQuery.toolbar
( function( $ )
    {
        $.mmod.toolbar = function( fn, args )
        {
            switch( fn )
            {
                /**
                 * Method to load a toolbar for a view.
                 *
                 * @var object options      Defines an associative list of parameters.
                 *      @param string disp      Defines the display to load the toolbar for.
                 *      @param string ui        Defines the layout of the display to load the toolbar for (if any).
                 *      @param string platform  Defines the platform the toolbar is for (i.e. "joomla", "wordpress", "drupal").
                 *
                 * @return void
                 *
                 * @since 1.0
                 */
                case "load":
                {
                    var options = $.extend
                    (
                        {
                            // Default values
                            view: "",
                            ui: "",
                            platform: "nk"
                        },
                        args
                    );

                    // Define authorized toolbar buttons
                    var dtoolbar_options = [ 'start', 'tbnew', 'tbedit', 'tbcopy', 'tbup', 'tbdown', 'tbsave', 'tbapply', 'tbpub', 'tbunpub', 'tbdelete', 'tbopt', 'tbsync', 'tbcancel', 'end' ];

                    // Define toolbar content per page
                    var dtoolbar        =
                        {
                              start: ""
                            , tbsync: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.display( { disp: \"configuration\",  ui: \"cwsync\", type: \"lbox\" } );'>Sync</div><div id='' class='dtt'>Sync</div></div>"
                            , tbup: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick=''>Import</div><div id='' class='dtt'>Import</div></div>"
                            , tbdown: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick=''>Export</div><div id='' class='dtt'>Export</div></div>"
                            , tbopt: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:$.lytebox( \"load\" );'>Options</div><div id='' class='dtt'>Options</div></div>"
                            , end: ""
                        };

                    // Prepare variable to store toolbar-to-make
                    var tbcontent       = "";

                    // Check if requested toolbar is an authorized option
                    if( !$.isEmptyObject( dtoolbar[options.view] ) )
                    {
                        // Check if requested ui toolbar is available
                        if( !$.isEmptyObject( dtoolbar[optionsview][options.ui] ) )
                        {
                            $.each
                            (
                                dtoolbar[options.view][options.ui],
                                function( key, value )
                                {
                                    // Check if requested button is an authorized option
                                    if( $.inArray( key, dtoolbar_options ) > -1 )
                                    {
                                        // Add content to toolbar string
                                        tbcontent += value;
                                    }
                                }
                            );
                        }else
                        {   // There is no ui toolbar requested or it does not exist. Fall back to default toolbar options for display (if any)
                            $.each
                            (
                                dtoolbar[options.view],
                                function( key, value )
                                {
                                    // Check if requested button is an authorized option
                                    if( $.inArray( key, dtoolbar_options ) > -1 )
                                    {
                                        // Add content to toolbar string
                                        tbcontent += value;
                                    }
                                }
                            );
                        }
                    }

                    // Render the toolbar content
                   // $.display
                    //(
                     //   {
                      //      // Prepare options array
                       //     content:    tbcontent,
                        //    type:       'toolbar'
                        //},
                        //"load"
                    //);
                }break;// End "load" case.

                case "destroy":
                {
                    //$.display
                    //(
                    //    {
                    //        // Prepare options array
                    //        content: "",
                    //        type: 'toolbar'
                    //    },
                    //    "load"
                    //);
                }break;// End "destroy" case.
            }
        };
    }( jQuery )
);

// jQuery.view
( function( $ )
    {
        $.mmod.view = function( args, fn )
        {
            var options = {};
            if( !fn )
            {
                /**
                 * Method to fetch and display a requested view
                 *
                 * @var options object      Defines an associative array of parameters
                 *      @param string ui        Defines the layout requested (This is the layout name, default is disp value)
                 *      @param string act       Reserved for specifying controller method
                 *      @param string mod       Used for leaving the scope of this framework
                 *      @param string type      Defines the type of content (i.e. Admin, Site, Toolbar, etc)
                 *      @param object data      An array/obj used to pass extra variables/data to get/post methods
                 *      @param string method    Leave blank for GET, otherwise specify POST
                 *
                 * @return void
                 *
                 * @since 1.0
                 */

                options = $.extend
                (
                    {
                        // Default values
                        ui: "home",
                        act: false,
                        mod: false,
                        type: "normal",
                        data: false,
                        method: "GET"
                    },
                    args
                );
                if( options.ui === "" )
                {
                    options.ui = "home";
                }

                // Prepare variables
                var response = null;
                var url = null;
                var params = "";
                var resultSet = false;

                /*
                 In JS, you have to separate multiple conditions within parenthesis, like below: ( ( (disp == '' ) || ( disp == '0' ) || ( disp == 0 ) )

                 I tested it every way possible, this is the only way the checking works properly.
                */
                if( !options.ui || options.ui === '0' )
                {
                    options.ui = 'index';
                }

                switch( options.method )
                {
                    case 'GET':
                    {
                        url = '/' + options.ui;
                        if( options.act && options.act !== '0' )
                        {
                            url += '/' + options.act;
                        }
                        if( options.mod && options.mod !== '0' )
                        {
                            url += '/' + options.mod;
                        }
                        if( options.data && options.data !== '0' )
                        {
                            if( !$.isEmptyObject( options.data ) )
                            {
                                url += '?';
                                var dc = 0;
                                $.each
                                (
                                    options.data,
                                    function( key, value )
                                    {
                                        if( i === 0 )
                                        {
                                            url += key + '=' + value;
                                        }
                                        else
                                        {
                                            url += '&' + key + '=' + value;
                                        }
                                        dc++;
                                    }
                                );

                                if( options.data.resultSet === '1' )
                                {
                                    resultSet = true;
                                }
                            }
                        }

                        //url += '&ret=raw';
                    }break;

                    case 'POST':
                    {
                        url = '/' + options.ui;
                        if( options.act && options.act !== '0' )
                        {
                            url += '/' + options.act;
                        }
                        if( options.mod && options.mod !== '0' )
                        {
                            url += '/' + options.mod;
                        }
                        if( options.data && options.data !== '0' )
                        {
                            if( options.data.type === 'submitForm' )
                            {
                                var forms = options.data.formName.split( "," );
                                params = {};
                                if( forms.length > 1 )
                                {
                                    for( var i = 0; i < forms.length; i++ )
                                    {
                                        var temp = $.form( forms[i] );
                                        $.extend( params, temp );
                                    }
                                }else
                                {
                                    params = $.form( { formName: options.data.formName } );
                                }
                                //alert( JSON.stringify( params ) );
                            }else
                            {
                                 params = options.data;
                                // Do here what you will.
                            }

                            if( options.data.resultSet === '1' )
                            {
                                resultSet = true;
                            }
                        }
                    }break;
                }

                /*
                 Here we get an html page via Ajax

                 All scripts included in DOM are executed automatically
                 only if you set the content within a div using:
                 jQuery( 'element_id' ).html( content );
                */
                $.ajax
                (
                    {
                        url: url,
                        async: true,
                        type: options.method,
                        dataType: 'html',
                        data: "mdata="+JSON.stringify( params ),
                        beforeSend: function()
                        {
                            if( options.type !== 'ibox' && options.type !== 'lbox' && options.type !== 'overlay' && options.type !== 'progress' )
                            {
                                $.mmod.view
                                (
                                    {
                                        content:    "<div class='dlg' align='right'><img src='../media/mmod/mboard/images/loaders/loading1.gif'></div>",
                                        type:       'isys'
                                    },
                                    "load"
                                );
                            }

                            if( options.mod === "pbar" )
                            {
                                $.mmod.lytebox( 'load', { ui: 'pbar' } );
                                $.mmod.script( { file: 'pbar.js' } );
                            }
                        },

                        success: function( data, textStatus, xhr )
                        {
                            $.mmod.view
                            (
                                {
                                    content:        data,
                                    type:           options.type,
                                    ui:             options.ui,
                                    sysmsg:         resultSet
                                },
                                "load"
                            );

                            if( options.type === "progress" )
                            {
                                $.mmod.pbar( 'update' );
                            }
                        },

                        error: function( xhr, textStatus, errorThrown )
                        {
                            $.mmod.view
                            (
                                {
                                    content:        textStatus + ": " + errorThrown,
                                    type:           options.type,
                                    ui:           options.ui
                                },
                                "load"
                            );
                        }
                    }
                );

            }

            if( fn === "load" )
            {
                /**
                 * Method to render content to the display
                 *
                 * @var object  options     Defines an associative array of parameters.
                 *      @param HTML     content     Defines the content string.
                 *      @param string   type        Defines the type of content to render.
                 *      @param string   view        Defines the view index for the mmodLoadTB() function.
                 *      @param array    ui          Defines the layout of the display to load the toolbar for (if any).
                 *      @param boolean  sysmsg      Defines whether to display a system message or not.  Defaults to false.
                 *
                 * @return void
                 *
                 * @since 1.0.0
                 */
                options = $.extend
                (
                    {
                        // Default values
                        content: "",
                        type: "",
                        ui: "",
                        sysmsg: false
                    },
                    args
                );

                // Parse the type of content to render
                switch( options.type )
                {
                    case 'isys':
                    {
                        document.getElementById( 'isys' ).innerHTML = options.content;
                        return true;
                    }break;

                    case 'normal':
                    {
                        document.getElementById( 'client-display' ).innerHTML = options.content;

                        if( options.sysmsg === true )
                        {
                            var message = jQuery( document.getElementById( 'client' ) ).find( 'sys-msg-container' ).html();
                            $.mmod.view
                            (
                                {
                                    msg: message
                                },
                                'sysmsg'
                            );
                        }
                    }break;

                    case 'overlay':
                    {
                        document.getElementById( 'mmod-lyte' ).innerHTML = options.content;
                        $.mmod.lytebox
                        (
                            "load",
                            {
                                overlay: 1
                            }
                        );
                        return true;
                    }break;

                    case 'lbox':
                    {
                        document.getElementById( 'mmod-lytebox' ).innerHTML = options.content;

                        if( options.ui === 'pbar' )
                        {
                            $.mmod.lytebox( "load", { ui: 'pbar' } );
                        }else
                        {
                            $.mmod.lytebox( "load" );
                        }
                        return true;
                    }break;

                    case 'ibox':
                    {
                        document.getElementById( 'mmod-lytebox' ).innerHTML = '<iframe id="jcd_lytebox_iframe" width="800px" height="600px" scrolling="auto" src="index.php?option=com_config&view=component&component=com_users&path=&tmpl=component"></iframe>';
                        $.mmod.lytebox
                        (
                            "load",
                            {
                                vscroll: 1,
                                ui: 'pbar'
                            }
                        );
                        return true;
                    }break;

                    case 'progress':
                    {

                        document.getElementById( 'isys' ).innerHTML = options.content;
                        return true;
                    }break;
                }

                // Load the toolbar
                $.mmod.toolbar
                (
                    "load",
                    {
                        ui:         options.ui
                    }
                );
            }

            if( fn === "destroy" )
            {
                document.getElementById( 'isys' ).innerHTML = "";
                document.getElementById( 'client' ).innerHTML = "";
            }

            if( fn === "sysmsg" )
            {
                /**
                 * Method to process a system message.
                 *
                 * @var object options      Defines an associative list of parameters.
                 *      @param string type      Defines the id of the form to save ( adminForm if not set ).
                 *      @param string msg       Defines the message to display to the user.
                 *
                 * @return void
                 *
                 * @since 1.0
                 */
                options = $.extend
                (
                    {
                        // Default values
                        type: "",
                        msg: ""
                    },
                    args
                );

                if( options.msg !== '' )
                {
                    document.getElementById( 'isys' ).innerHTML = options.msg;

                    if( ( options.type === '' ) || ( options.type === 0 ) || ( options.type === '0' ) )
                    {
                        $( document.getElementById( 'isys' ) ).fadeIn( 800 );
                        $( document.getElementById( 'isys' ) ).delay( 10000 ).fadeOut( 800 );
                    }else
                    {
                        $( options.type ).fadeIn( 800);
                        $( options.type ).delay( 10000 ).fadeOut( 800 );
                    }
                }
            }
        };
    }( jQuery )
);


// jQuery.script
( function( $ )
    {
        $.mmod.script = function( args )
        {
            /**
             * Method to load an external script.
             *
             * @var object options      Defines an associative list of parameters.
             *      @param string file      Defines the file name of the external script to load ( extension included ).
             *      @param string type      Un-used.
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    file: "",
                    type: ""
                },
                args
            );

            var c_url = window.location.href;
            var n_url = c_url.replace( "/administrator/index.php", "/libraries/mmod/core/js/includes/"+options['file'] );
            $.getScript( n_url ).fail
            (
                function( jqxhr, settings, exception )
                {
                    alert( 'Failed to load script: '+n_url );
                }
            );
        }
    }( jQuery )
);

// $.ctrls
( function( $ )
    {
        $.mmod.ctrls = function( args )
        {
            var options = $.extend
            (
                {
                    // Defaults
                },
                args
            );

            // Multi-Select button click behavior
            $( 'div.mpob' ).on
            (
                "click",
                function ( event )
                {
                    if( $( this ).find( 'div.mpol' ).is( ":hidden" ) )
                    {
                        $( this ).find( 'div.mpos' ).hide(),
                        $( this ).find( 'div.mpol' ).fadeIn( 500 );
                    } else
                    {
                        $( this ).find( 'div.mpol' ).fadeOut
                        (
                            500,
                            function ()
                            {
                                $( this ).closest( 'div.mpob' ).find( 'div.mpos' ).show();
                            }
                        );
                    }
                }
            );

            // Multi-Select options ctrl+ mouse click / mouse click behavior
            $( 'ol.mpole' ).selectable
            (
                {
                    stop: function ( e )
                    {
                        var result = $( "#select-result" ).empty();
                        var selected = $( "#selected" ).html();
                        var options = {};
                        var selection = "";

                        $( ".ui-selected", this ).each
                        (
                            function ()
                            {
                                var index = $( "ol.mpole li" ).index( this );
                                result.append( " #" + ( index + 1 ) );

                                options[index] = $( this ).text();
                                //alert( jQuery(this).text() );
                                //alert( index )
                            }
                        );

                        if( $.isEmptyObject( options ) )
                        {
                            selection = "Select a value.."
                        } else
                        {
                            selection = "";
                            $.each
                            (
                                options,
                                function ( k, v )
                                {
                                    if( selection === "" )
                                    {
                                        selection += v;
                                    } else
                                    {
                                        selection += ", " + v;
                                    }
                                }
                            );
                        }

                        //alert( JSON.stringify( options ) );
                        $( this ).closest( 'div.mpob' ).find( 'div.mpos' ).html( selection );
                        $( this ).closest( 'div.mpob' ).find( 'input:hidden' ).val( selection );
                        if( !e.ctrlKey )
                        {
                            $( this ).closest( 'div.mpob' ).find( 'div.mpol' ).fadeOut
                            (
                                500,
                                function ()
                                {
                                    $( this ).closest( 'div.mpob' ).find( 'div.mpos' ).show();
                                }
                            );
                        }
                    }
                }
            );
        }
    }( jQuery )
);

// jQuery.form
( function( $ )
    {
        $.mmod.form = function( args, fn )
        {
            if( fn == "" || fn == 0 || fn == '0' || fn == null || fn == false )
            {
                /**
                 * Method to save a form via AJAX.
                 *
                 * @var object options      Defines an associative list of parameters.
                 *      @param string file      Defines the id of the form to save ( adminForm if not set ).
                 *
                 * @return void
                 *
                 * @since 1.0
                 */
                var options = $.extend
                (
                    {   // Defaults
                        formName:       "adminForm"
                    },
                    args
                );

                var data = $( '#' + options['formName'] ).serializeArray(), obj = {}, j = 0;
                for( var i = 0; i < data.length; i++ )
                {
                    if( data[i].name in obj )                                                //Used for select multiple
                    {
                        var key = data[i].name + '_' + j;
                        obj[key] = data[i].value;
                        j++;
                    }else
                    {
                        obj[data[i].name] = data[i].value;
                    }
                };

                $( '#' + options['formName'] + ' input[type=checkbox]:not(:checked)' ).map
                (
                    function ()
                    {
                        return obj[this.name] = '0';
                    }
                ).get();

                //alert(JSON.stringify(obj));
                return obj;
            }

            if( fn === "reset" )
            {
                /**
                 * Method to reset a form
                 *
                 * @var object  options     An associative array of parameters
                 *      @param string   form    Defines the id of the form to reset.
                 *
                 * @return void
                 *
                 * @since 1.0
                 */
                var options = $.extend
                (
                    {
                        // Default values
                        formName:       ""
                    },
                    args
                );

                var value = "";
                $( '#' + options['form'] ).find( 'select' ).val( value ).attr( 'selected',true );
                $( '#' + options['form'] ).find( 'input[type=text]' ).val( value );
                $( '#' + options['form'] ).find( 'input[type=checkbox]' ).removeAttr( 'checked' );
            }

            if( fn === "msMoveRows" )
            {
                /**
                 * Method to move select options from one multiple select box to another.
                 * The function also sorts the options alphabetically after moving
                 *
                 * @var object  options     An associative array of parameters
                 *      @param string   from    Defines the source multiple select box.
                 *      @param string   to      Defines the destination multiple select box.
                 *
                 * @return void
                 *
                 * @since 1.0
                 */
                var options = $.extend
                (
                    {
                        // Default values
                        from:           "",
                        to:             ""
                    },
                    args
                );

                var selectedItems = $( '#' + options['from'] + " :selected" ).toArray();
                $( '#' + options['to'] ).append( selectedItems );
                selectedItems.remove;

                var options = $( '#' + options['to'] + ' option' );
                options.sort
                (
                    function( a,b )
                    {
                        if( a.text.toLowerCase() > b.text.toLowerCase() )
                        {
                            return 1;               //Need to use toLowerCase in case some users don't capitalize their name
                        }else if( a.text.toLowerCase() < b.text.toLowerCase() )
                        {
                            return -1;
                        }else
                        {
                            return 0;
                        }
                    }
                );
                $( '#' + options['to'] ).empty().append( options );
            }

            if( fn === "msToggleSelectAll" )
            {
                /**
                 * Method to select or deselect all values in a multiple select box.
                 *
                 * @var object  options     An associative array of parameters
                 *      @param string   select      Defines the id of the multiple select box where you want all values selected.
                 *      @param string   deseelct    Defines the id of the multiple select box where you want all values deselected.
                 *
                 * @return void
                 *
                 * @since 1.0
                 */
                var options = $.extend
                (
                    {
                        // Default values
                        select:         "",
                        deselect:       ""
                    },
                    args
                );

                $( '#' + options['select'] ).each
                (
                    function ()
                    {
                        $( '#' + options['select'] + ' option' ).attr( "selected", "selected" );
                    }
                );

                $( '#' + options['deselect'] ).each
                (
                    function ()
                    {
                        $( '#' + options['deselect'] + ' option' ).removeAttr( "selected" );
                    }
                );
            }
        }
    }( jQuery )
);


// jQuery.cloak
( function( $ )
    {
        $.mmod.cloak = function( args, fn )
        {
            if( fn == "" || fn == 0 || fn == '0' || fn == null || fn == false )
            {
                /**
                 * Method to toggle the display of specified elements.
                 *
                 * @var object options      Defines an associative list of parameters.
                 *      @param string element       Defines the id of the element to toggle the display of.
                 *
                 * @return void
                 *
                 * @since 1.0
                 */
                var options = $.extend
                (
                    {
                        // Default values
                        element: "",
                        field_id: ""
                    },
                    args
                );

                var e_length = options['element'].length;
                for( var i = 0; i < e_length; i++ )
                {
                    $( '#'+options['element'][i] ).toggle();
                };
            }
        }
}( jQuery )
);


// jQuery.tabs
( function( $ )
    {
        /**
         * Method to process tab display.
         *
         * @return void
         *
         * @since 1.0
         */
        $.mmod.tabs = function()
        {
            // Define our functions for mouseover,mouseoff,click
            $( '.mhtci' ).mouseover
            (
                function( e, ui )
                {
                    var pblock = $( this ).closest( 'div.mcbc, div.mcbc-25, div.mcbc-75, div.mcbc-25r, div.mcbc-75r' );
                    var poffset = pblock.offset();
                    var offset = $( this ).offset();
                    var width = $( this ).width();
                    var marker = pblock.find( '.mhtcm' );
                    var left = 0;

                    if( ( pblock.hasClass( 'mcbc-75' ) === true ) || ( pblock.hasClass( 'mcbc-75r' ) === true ) || ( pblock.hasClass( 'mcbc-r' ) === true ) )
                    {
                        left = ( ( poffset.left + pblock.width() ) - offset.left ) * -1;
                    }else
                    {
                        left = ( ( ( poffset.left + pblock.width() ) - offset.left ) - ( ( pblock.width() * 0.015 ) + 1 ) ) * -1;
                    }

                    marker.css( { "width" : width } );
                    marker.stop().animate( { "marginLeft": left }, 500 );
                }
            ).mouseout
            (
                function( e, ui )
                {
                    var pblock = $( this ).closest( 'div.mcbc, div.mcbc-25, div.mcbc-75, div.mcbc-25r, div.mcbc-75r' );
                    var poffset = pblock.offset();
                    var atab = pblock.find( '.mhtci.active' );
                    var offset = atab.offset();
                    var width = atab.width();
                    var marker = pblock.find( '.mhtcm' );
                    var left = 0;

                    if( ( pblock.hasClass( 'mcbc-75' ) === true ) || ( pblock.hasClass( 'mcbc-75r' ) === true ) || ( pblock.hasClass( 'mcbc-r' ) === true ) )
                    {
                        left = ( ( poffset.left + pblock.width() ) - offset.left ) * -1;
                    }else
                    {
                        left = ( ( ( poffset.left + pblock.width() )  - offset.left ) - ( ( pblock.width() * 0.015 ) + 1 ) ) * -1;
                    }

                    marker.css( { "width" : width } );
                    marker.stop().animate( { "marginLeft": left }, 500 );
                }
            );

            // Add whatever selectors will be processed as tabs, be sure to add a new .on() addition each time, DO NOT add multiple selectors to the same function!
            $( '.mhtci' ).on
            (
                'click',
                function()
                {
                    var plist  = $( this ).closest( 'div.mcbc, div.mcbc-25, div.mcbc-75, div.mcbc-25r, div.mcbc-75r' ).find( '.mhtc' );
                    var pblock = $( this ).closest( 'div.mcbc, div.mcbc-25, div.mcbc-75, div.mcbc-25r, div.mcbc-75r' );
                    var poffset = pblock.offset();
                    var oatab   = pblock.find( '.mhtci.active' );
                    var natab   = $( this );
                    var natabid = natab.attr( 'id' );
                    var natabb  = $( document.getElementById( natabid + 'b' ) );
                    var offset  = natab.offset();
                    var width   = natab.width();
                    var marker  = pblock.find( '.mhtcm' );
                    var left    = 0;

                    // Init State after click
                    oatab.removeClass( 'active' );
                    pblock.find( 'div.mhtcc' ).addClass( 'inactive' );

                    // Now set the state for the active elements
                    natab.addClass( 'active' );
                    natabb.removeClass( 'inactive' );

                    // Now set the marker's initial left margin
                    if( ( pblock.hasClass( 'mcbc-75' ) === true ) || ( pblock.hasClass( 'mcbc-75r' ) === true ) || ( pblock.hasClass( 'mcbc-r' ) === true ) )
                    {
                        left = ( ( poffset.left + pblock.width() ) - offset.left ) * -1;
                    }else
                    {
                        left = ( ( ( poffset.left + pblock.width() )  - offset.left ) - ( ( pblock.width() * 0.015 ) + 1 ) ) * -1;
                    }

                    marker.css( { "width" : width, "margin-left" : left } );
                }
            );

            $( '.mvtbt' ).on
            (
                'click',
                function()
                {
                    var plist   = $( this ).closest( 'div.mcbc, div.mcbc-25, div.mcbc-75, div.mcbc-25r, div.mcbc-75r' ).find( '.mvtbc' );
                    var bid     = $( this ).attr( 'id' );

                    // Init State after click
                    plist.find( 'a.mvtbt' ).removeClass( 'active' );
                    plist.find( 'div.mvtbb' ).addClass( 'inactive' );

                    // Now set the state for the active elements
                    $( this ).addClass( 'active' );
                    $( document.getElementById( bid + 'b' ) ).removeClass( 'inactive' );

                }
            );


            // Initialize the markers for all tab-sets
            var tabsets = {};

            $( 'div.mcbc, div.mcbc-25, div.mcbc-75, div.mcbc-25r, div.mcbc-75r' ).each
            (
                function( event )
                {
                    if( $( this ).find( '.mhtci.active' ).length )
                    {
                        var pblock  = $( this );
                        var poffset = pblock.offset();
                        var atab    = pblock.find( '.mhtci.active' );
                        var offset  = atab.offset();
                        var width   = atab.width();
                        var marker  = pblock.find( '.mhtcm' );
                        var left    = 0;

                        if( ( pblock.hasClass( 'mcbc-75' ) === true ) || ( pblock.hasClass( 'mcbc-75r' ) === true ) || ( pblock.hasClass( 'mcbc-r' ) === true ) )
                        {
                            left = ( ( poffset.left + pblock.width() ) - offset.left ) * -1;
                        }else
                        {
                            left = ( ( ( poffset.left + pblock.width() ) - offset.left ) - ( ( pblock.width() * 0.015 ) + 1 ) ) * -1;
                        }

                        marker.css( { "width": width } );
                        marker.stop().animate( { "marginLeft": left }, 500 );
                    }
                }
            );

            $( '.mhtcm' ).fadeIn();
        }
}( jQuery )
);


// jQuery.lytebox
( function( $ )
    {
        $.fn.lytebox = function ( fn, args )
        {
            if( fn === "load" )
            {
                /**
                 * Method for rendering a lightbox for modal views
                 *
                 * @var object options      An associative array of parameters
                 *      @param int width        Defines a width to set the lightbox to, in pixels ( optional ).
                 *      @param int height       Defines a height to set the lightbox to, in pixels (optional ).
                 *      @param int vscroll      Defines whether to allow vertical scrolling ( 1 = yes, 0 = no ).
                 *      @param int overlay      Defines whether to only call the overlay, set this to 1 ( true ), else 0 ( false ).
                 *
                 * @return void
                 *
                 * @since 1.0
                 */
                var options = $.extend
                (
                    {
                        // Default values
                        width: "",
                        height: "",
                        vscroll: 1,
                        overlay: 0,
                        ui: ""
                    },
                    args
                );

                if( options['overlay'] === 1 )
                {
                    // Here we render the elements of the lytebox overlay

                    $( '#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB\\:O\\:x' ).animate( { 'opacity': '.50' }, 300, 'linear' );
                    $( '#\\:B\\:JC\\:LB\\:O\\:x' ).animate( { 'opacity': '1.00' }, 300, 'linear' );
                    $( '#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB\\:O\\:x' ).css( 'display', 'block' );
                }else
                {
                    // Here we render the elements of the lytebox

                    // If a progress bar is requested, we have to hide the lytebox_xml in place of the progress-xml
                    if( options['ui'] === 'pbar' )
                    {
                        $( '#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:pb\\:x' ).animate( { 'opacity': '.50' }, 300, 'linear' );
                        $( '#\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:pb\\:x' ).animate( { 'opacity': '1.00' }, 300, 'linear' );
                        $( '#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:pb\\:x' ).css( 'display', 'block' );
                    }else
                    {
                        $( '#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:x' ).animate( { 'opacity': '.50' }, 300, 'linear' );
                        $( '#\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:x' ).animate( { 'opacity': '1.00' }, 300, 'linear' );
                        $( '#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:x' ).css( 'display', 'block' );
                    }

                    // This enables users to scroll content that overflows the lightbox container
                    if( options['vscroll'] == 1 )
                    {
                        $( '#\\:B\\:JC\\:LB' ).css( 'overflow-y', 'auto' );
                    }else
                    {
                        $( '#\\:B\\:JC\\:LB' ).css( 'overflow-y', 'none' );
                    }

                    /*
                        Here we get the current width and height of the lightbox after its content is loaded.  We then see
                        if the values are greater than our maximum desirable width/height ( which is 75% of viewable screen on both axis.
                        If so we set the width and height to the maximum value, otherwise we let it take the size of its content.
                    */
                    if( options['width'] != '' && options['width'] != null )
                    {
                        $( '#\\:B\\:JC\\:LB' ).width( options['width'] );
                    }else if( $( '#\\:B\\:JC\\:LB' ).width() > ( $( '#\\:B\\:JC\\:LB\\:O' ).width() * .75 ) )
                    {
                        $( '#\\:B\\:JC\\:LB' ).width(( $( '#\\:B\\:JC\\:LB\\:O' ).width() * .75 ) );
                    }else if( $( '#\\:B\\:JC\\:LB' ).width() < 400 )
                    {
                        $( '#\\:B\\:JC\\:LB' ).width( 400 );
                    }

                    if( options['height'] != '' && options['height'] != null )
                    {
                        $( '#\\:B\\:JC\\:LB' ).height( options['height'] );
                    }else if( $( '#\\:B\\:JC\\:LB' ).height() > ( $( '#\\:B\\:JC\\:LB\\:O' ).height() * .75 ) )
                    {
                        $( '#\\:B\\:JC\\:LB' ).height( (  $( '#\\:B\\:JC\\:LB\\:O' ).height() * .75 ) );
                    }else if( jQuery( '#\\:B\\:JC\\:LB' ).height() < 200 )
                    {
                        $( '#\\:B\\:JC\\:LB' ).height( 200 );
                    }

                    /*
                        Here we divide the width and height of the lytebox in half, and sutract those values
                        from the corresponding margins to keep the lytebox in the center of the screen.
                        We have to set the left and top via javascript, otherwise the display is glitchy and will
                        not behave properly.
                    */
                    $( '#\\:B\\:JC\\:LB' ).css( 'left', '50%' );
                    $( '#\\:B\\:JC\\:LB' ).css( 'top', '50%' );
                    $( '#\\:B\\:JC\\:LB' ).css( 'margin-left', -( $( '#\\:B\\:JC\\:LB' ).width() / 2 ) );
                    $( '#\\:B\\:JC\\:LB' ).css( 'margin-top', -( $( '#\\:B\\:JC\\:LB' ).height() / 2 ) );

                    // Here we set the offset and width of the header div after the main div has been modified to prevent any undesired behavior
                    $( '#\\:B\\:JC\\:LB\\:h' ).css( 'margin-left', '-13px' );
                    $( '#\\:B\\:JC\\:LB\\:h' ).css( 'margin-top', '-32px' );
                    $( '#\\:B\\:JC\\:LB\\:h' ).width( $( '#\\:B\\:JC\\:LB' ).width() + 10 );
                    $( '#\\:B\\:JC\\:LB' ).draggable
                    (
                        {
                            handle: '#\\:B\\:JC\\:LB\\:h'
                        }
                    );
                }
            }

            if( fn === "close" )
            {
                /**
                 * Method to close the lytebox.
                 *
                 * @return void
                 *
                 * @since 1.0
                 */
                var options = $.extend
                (
                    {
                        // Default values
                        ui: ""
                    },
                    args
                );

                var lyteboxElements;

                // Here we hide the lytebox and overlay
                if( options['ui'] === 'pbar' )
                {
                    lyteboxElements = $( '#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:x' );
                }else
                {
                    lyteboxElements = $( '#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:pb\\:x' );
                }

                lyteboxElements.animate
                (
                    { 'opacity':    '0' },
                    300,
                    'linear',

                    function()
                    {
                            lyteboxElements.css('display', 'none');

                        /*
                         Here we unset everything we set in renderlytebox() so that all the css values we set are unset and we have no conflicts.
                         Removing this will make it so that after opening a small modal, opening a large one will make the display
                         behave improperly.  In order to correct this, unsetting values we manually set with jQuery is required.
                        */

                        //document.getElementById( ':B:JC:LB:x' ).innerHTML = 'Please wait..'; // Was throwing an error in firebug that the element was not found...so no need :)
                        $( '#\\:B\\:JC\\:LB' ).css('display', 'none');
                        $( '#\\:B\\:JC\\:LB' ).css('left', '');
                        $( '#\\:B\\:JC\\:LB' ).css('top', '');
                        $( '#\\:B\\:JC\\:LB' ).css('margin-left', '' );
                        $( '#\\:B\\:JC\\:LB' ).css('margin-top', '' );

                        $( '#\\:B\\:JC\\:LB' ).css('width', 'auto');
                        $( '#\\:B\\:JC\\:LB' ).css('height', 'auto' );
                        $( '#\\:B\\:JC\\:LB' ).css('overflow-y','hidden');
                        $( '#\\:B\\:JC\\:LB\\:h' ).css('margin-left', '' );
                        $( '#\\:B\\:JC\\:LB\\:h' ).css('margin-top', '' );
                        $( '#\\:B\\:JC\\:LB\\:h' ).width();
                    }
                );
            }
        }
}( jQuery )
);


// $.slider
( function( $ )
    {
        $.mmod.slider = function( args )
        {
            /**
             * Method for rendering a slider effect on Check-boxes
             *
             * @var object  options     An associative array of parameters
             *      @param string   slider  Defines the id of the slider element.
             *      @param string   target  Defines the id of the check-box to manipulate.
             *      @param string   msg     Defines the msg to display in slider button.
             *      @param bool     init    Not used.
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    slider: "",
                    msg: {},
                    init: 0
                },
                args
            );

            var gcb = $( document.getElementById( options['slider'] ) );
            var rcb = gcb.closest( 'div.mslf' ).find( 'input:checkbox' );

            if( rcb.is( ':checked' ) )
            {
                gcb.removeClass( 'on' );
                gcb.html( options['msg'][1] );
                rcb.removeAttr( 'checked' );
                rcb.prop( 'value', options['msg'][1] );
            }else
            {
                gcb.addClass( 'on' );
                gcb.html( options['msg'][0] );
                rcb.prop( 'checked', 'checked' );
                rcb.prop( 'value', options['msg'][0] );
            }
        }
}( jQuery )
);


// jQuery.pbar
( function( $ )
    {
        $.mmod.pbar = function( fn, args )
        {
            if( fn == "" || fn == 0 || fn == '0' || fn == null || fn == false )
            {
                // We'll hide the retry button as soon as the progress bar or action that uses the progress bar is started
                $( '#__jcd_pbar_retry_btn' ).hide();

                var progressbar = $( '#progressbar' ),
                                                    progresslabel = $( '.progress-label' );

                // The centering of the label at first is off, so let's set it manually to be centered.
                var distance = progresslabel.width() / 2;
                progresslabel.css( 'margin-left', -distance );

                // Prep the progress bar.
                progressbar.progressbar
                (
                    {
                        value: false,
                        change: function ()
                        {
                            // When the change method is running, the label is centered properly for some reason (wtf jQuery??), so let's remove our CSS fix.
                            progresslabel.css( 'margin-left', '0' );

                            progresslabel.text( progressbar.progressbar( 'value' ) + '%' );
                        },
                        complete: function ()
                        {
                            progresslabel.text( 'Complete!' );

                            // The centering of the label will be off again, so let's set it manually to be centered one last time.
                            distance = progresslabel.width() / 2;
                            progresslabel.css( 'margin-left', -distance );

                            // Show the retry button after the action is complete and progress bar has completed (reached 100% and finished)
                            $( '#__jcd_pbar_retry_btn' ).show();
                        }
                    }
                );
            }

            if( fn == "check" )
            {
                // First grab a page which can see the PHP Session Variable, and embed it into an HTML Element.
                $.display( { disp: "configuration", ui: "pbar_status", type: "progress" } );
            }

            if( fn == "update" )
            {
                var progressbar = $( '#progressbar' ),
                progresslabel = $( '.progress-label' );

                // Next, get the string value from the HTML Element
                var strVal = $( '#pbar_status' ).find( '#dsystem_progress' ).html();

                // Convert the string value to an integer value with a radix of 10 for accurate readings.
                var intVal = parseInt( strVal, 10);

                //alert( strVal );
                //alert( intVal );

                // Finally, set the progressbar value (Only very long scripts will process slowly, most of the time the script will finish before the first progress call is made.)
                progressbar.progressbar( 'value', intVal );

                // If we're not at 100% progress complete, we'll schedule this method to run again.
                if( intVal < 99 )
                {
                    setTimeout
                    (
                        function()
                        {
                            $.pbar( 'check' );
                        },
                        100
                    );
                }
            }

            if( fn === "" || fn === 0 || fn === '0' || fn === null || fn === false )
            {
                // Since we've only just defined the progress bar, let's call our progress checking method for the first time, 3 seconds after the page finishes loading.
                setTimeout
                (
                    function()
                    {
                        $.pbar( 'check' );
                    },
                    3000
                );
            }
        };
}( jQuery )
);