/**
 * package: nk-xrm
 * author:  Richard B. Winters <a href='mailto:rik@mmogp.com'>Rik At MMOGP</a>
 * copyright: 2011-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps
var nk = require( 'nk' ),
config = require( './config' ),
app = new nk( config );

//console.log( app.hash( { data: 'demo' } ) );

// Start our App
app.init();