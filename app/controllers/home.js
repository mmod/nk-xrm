/**
 * package: nk-xrm
 * sub-package: controllers/home
 * author: Richard B. Winters <a href="mailto:rik@mmogp.com">rik At Massively Modified</a>
 * copyright: 2011-2015 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


/**
 * Constructor
 *
 * @since 0.0.1
 */
function homeController()
{
}


// / GET
homeController.prototype.index = function( request, response )
{
    if( !request.isAuthenticated )
    {
        response.redirect( '/account/login' );
        return;
    }

    // Undoubtedly there will be session variables we will want to keep
    // persistent and need to keep track of without knowing the entry
    // point of the user.
    response.session.set( 'user', request.session.get( 'user', JSON.stringify( { username: 'Guest', email: '', name: { first: 'Guest' } } ) ), { secure: true } );
    var client = JSON.parse( request.session.get( 'user' ) );

    // We just need to display a welcome here for now
    this.klay.layout = 'shared/main';
    this.klay.viewbag.title = 'MMod';
    this.klay.viewbag.pagetitle = 'Home';
    this.klay.viewbag.username = client.username;
    this.klay.viewbag.testvar =
    [
        { 'a': '<b>A Powerful Combination</b>', 'b': '<p>This project comes prepared with the jQuery JavaScript Library, as well as the Bootstrap CSS - which includes their version of Normalize - and JavaScript Libraries. Their links:</p><p><a href="http://jquery.com/" target="_blank">The jQuery website.</a></p><p><a href="http://getbootstrap.com/" target="_blank">The GetBootstrap website.</a></p>.' },
        { 'a': '<b>MySQL</b>', 'b': '<p>This project harnesses the power of MySQL Community Server through nodamysql (nk-mysql on npm), which uses the MySQL Connector C++ to provide efficient and secure data integration. Browse the following links for specifics:</p><p><a href="http://www.mysql.com/about/legal/licensing/foss-exception/" target="_blank">Oracle\'s Free and Open Source (\"FOSS\") License</a>.</p><p><a href="http://github.com/mmod/nodamysql" target="_blank">The nodamysql GitHub.</a></p>' },
        { 'a': '<b>The</b> SJCL', 'b': '<p>This project makes use of the Stanford Javascript Crypto Library, and provides a great starting place for creating a secure and efficient user system. Here are some links to get you started:</p><p><a href="http://crypto.stanford.edu/sjcl/" target="_blank">The Stanford JavaScript Cryto Library website.<a></p><p><a href="https://jswebcrypto.azurewebsites.net/demo.html#/pbkdf2" target="_blank">Getting started with JavaScript and Web Cryptography.</a></p>', 'c': 'yea' }
    ];

    this.rendr( request, response );
};


// Export
module.exports = exports = homeController;