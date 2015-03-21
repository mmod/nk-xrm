/**
 * package: MMod-Node
 * sub-package: Views
 * author:  Richard B. Winters <a href="mailto:rik@massivelymodified.com">rik At MassivelyModified</a>
 * copyright: 2011-2015 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps;
var fs = require( 'fs' );
var dt = new Date();
var nodakwaeri = require( 'nodakwaeri' );

/**
 * Layout processor
 *
 * @since 0.0.1
 */
var layout =
{
    construct: function( request, response, klay )
    {
        // We would normally invoke the nodaklay module, and use the Pottr to construct our layout.  For now we will use a JS
        // version in order to help spur on development.

        // Construct will check if there is a layout specified, and invoke parse accordingly.
        if( klay.layout !== false )
        {
            fs.readFile
            (
                    __dirname + '/' + klay.layout + '.kml',
                    'utf8',
                    function( error, ldata )
                    {
                        var buffer;

                        // If there is an error
                        if( error )
                        {
                            // Log it
                            console.log( 'Error reading layout: ' + klay.layout + '.' );

                            // And set content to contain an error message
                            buffer = "<html><head><title>Failure</title></head><body><h1>Too Bad...</h1><p>There was an issue loading the requested layout!</p></body></html>";

                            response.writeHead
                            (
                                    200,
                                    { 'Content-Type': 'text/html' }
                            );

                            response.write
                            (
                                buffer
                            );

                            response.end();
                        }
                        else
                        {
                            // Success
                            fs.readFile
                            (
                                    __dirname + '/' + klay.controller + '/' + klay.view + '.kml',
                                    'utf8',
                                    function( error, vdata )
                                    {
                                        var buffer;

                                        if( error )
                                        {
                                            // Log it
                                            console.log( 'Error reading view' );

                                            // And set content to contain an error message
                                            buffer = "<html><head><title>Failure</title></head><body><h1>Too Bad...</h1><p>There was an issue loading the requested view!</p></body></html>";

                                            response.writeHead
                                            (
                                                    200,
                                                    { 'Content-Type': 'text/html' }
                                            );

                                            response.write
                                            (
                                                buffer
                                            );

                                            response.end();
                                        }
                                        else
                                        {
                                            //var pottr = nodakwaeri.klay();
                                            //pottr.turn( request, response, klay );
                                            klay.layout = ldata;
                                            klay.view = vdata;
                                            layout.parse( request, response, klay );
                                        }
                                    }
                            );
                        }
                    }
            );
        }else
        {
            fs.readFile
            (
                    './' + klay.controller + '/' + klay.view + '.kml',
                    'utf8',
                    function( error, data )
                    {
                        var buffer;

                        if( error )
                        {
                            // Log it
                            console.log( 'Error reading view' );

                            // And set content to contain an error message
                            buffer = "<html><head><title>Failure</title></head><body><h1>Too Bad...</h1><p>There was an issue loading the requested view: " + error + "\n" + data +"</p></body></html>";

                            response.writeHead
                            (
                                    200,
                                    { 'Content-Type': 'text/html' }
                            );

                            response.write
                            (
                                buffer
                            );

                            response.end();
                        }
                        else
                        {
                            klay.layout = false;
                            klay.view = data;
                            layout.parse( request, response, klay );
                        }
                    }
            );
        }
    },
    parse: function( request, response, klay )
    {
        // First let's prepare the body content; there may not be a layout, but if there is we need the body first.
        var body = klay.view;
        body = body
        .replace
        (   /(\[\[[\s\t\n]*((\/\*.*\*\/|\/\/.*\n)*([a-zA-Z0-9_]*)((\.([a-zA-Z0-9_]*))*(\((.*)\))?)*)[\s\t\n]*\]\])/mg,
            /**
             * This is a tricky RegEx
             *
             * 1.   We search for matches in order to parse the kml properly:
             *  A:  The following general subscript
             *  <twolsquarebrackets>( exactly like this:  [[ )
             *      B. The following general flow of subscript  ( There can be 0 or more of these, let's face it - there could be an empty subscript )
             *      <anynumberofspacesandnewlines>  ( People like to format, let's allow them to please - 0 or more )
             *          C.  Any potential comments that exist
             *          <anycomments>   ( We support both popular forms of comments, there could be mix matches, so obviously 0 or more leading up to a function call )
             *          End C
             *          D. Object Identifier    ( This is the first function call )
             *          <anyword> ( The word must be found in order to be executed or loaded, otherwise it is stripped out in order to end the loop )
             *          End D
             *          E. Member Identifier    ( Sometimes we need to access an object reference and then invoke one of its members, there can be 0 or more of  these )
             *          <possibleperiodfollowedbyword> ( Again the word must be found )
             *          End E
             *          F. The following argument list identifier:
             *          <possibleoneleftparenthesis>    ( Arguments list, which could be a json string there can be 0 or more of these )
             *              G. The following content or argument list
             *              <anycontent>
             *              End G
             *          <possibleonerightparenthesis>
             *          End F
             *      End B
             *      <anynumberofspacesandnewlines>
             *  <tworsquarebrackets>( exactly like this:  ]] )
             *  End A
             */
            function( match, subscript, codeflow, comments, fof, memflow, memstring, member, argflow, args )
            {
                console.log( 'Match: \'' + match + '\' Subscript \'' + subscript + '\' Code-flow: \'' + codeflow + '\' Comments: ' + comments + ' Factory/Function: \'' + fof +
                                '\' Member-flow: ' + memflow + ' Member-string: ' + memstring + ' Member: ' + member + ' Args-flow: ' + argflow +' Args: ' + args + '.' );

                return layout.decorate( codeflow, klay );
            }
        );

        // If a layout was requested, let's prep it
        if( klay.layout !== false )
        {
            klay.view = body;

            var view = klay.layout;
            view = view
            .replace // First strip comments
            (   /\[\[[\s\t\r\n]*([\s\t\r\n]*(\/\*[a-zA-Z0-9_]*\*\/)[\s\t\r\n]*)*[\s\t\r\n]*\]\]/mg,
                function( match, comment )
                {
                    console.log( 'Comment: ' + match + '.' );
                    return "";
                }
            )
            .replace
            (   /(\[\[[\s\t\r\n]*(([a-zA-Z0-9_]*)((\.([a-zA-Z0-9_]*))*(\((.*)\))?)*)[\s\t\r\n]*\]\])/g,
                function( match, subscript, codeflow, comments, fof, memflow, memstring, member, argflow, args )
                {
                    console.log( 'Match: \'' + match + '\' Subscript \'' + subscript + '\' Code-flow: \'' + codeflow + '\' Comments: ' + comments + ' Factory/Function: \'' + fof +
                                    '\' Member-flow: ' + memflow + ' Member-string: ' + memstring + ' Member: ' + member + ' Args-flow: ' + argflow +' Args: ' + args + '.' );

                    return layout.decorate( codeflow, klay );
                }
            );

            response.writeHead
            (
                200,
                { 'Content-Type': 'text/html' }
            );

            response.write
            (
                view
            );

            response.end();
        }

        response.writeHead
        (
            200,
            { 'Content-Type': 'text/html' }
        );

        response.write
        (
            body
        );

        response.end();
    },
    decorate: function( match, klay )
    {
        // Returns the output of the subscript
        //console.log( 'Layout Match: ' + match + ' Group 1: ' + g1 + ' Group 2: ' + g2 + ' Group 3: ' + g3 + '.' );
        switch( match )
        {
            case 'test':
            {
                return 'Test replacement worked!';
            }break;

            case 'title':
            {
                return klay.title;
            }break;

            case 'pagetitle':
            {
                return klay.pagetitle;
            }break;

            case 'body':
            {
                return klay.view;
            }break;

            case 'date.year':
            {
                return dt.getFullYear();
            }break;

            default:
            {
                if( klay[match] !== ( null || undefined ) )
                {
                    return klay[match];
                }

                return 'Error: Invalid script: \`' + match + '\`.';
            }break;
        }

        return 'Too bad...';
    }
};

// Export
module.exports = layout;