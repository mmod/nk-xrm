/**
 * package: nk-xrm
 * sub-package: controllers/dash
 * author: Richard B. Winters <a href="mailto:rik@mmogp.com">rik At Massively Modified</a>
 * copyright: 2011-2015 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


/**
 * Constructor
 *
 * @since 0.0.1
 */
function dashController()
{
}


// /dash GET
dashController.prototype.index = function( request, response )
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
    this.klay.layout = 'shared/dash';
    this.klay.viewbag.title = 'MMod';
    this.klay.viewbag.pagetitle = 'Home';
    this.klay.viewbag.username = client.username;
    this.klay.viewbag.testvar =
    [
        { 'a': '<b>Kwaeri</b>', 'b': '<p>Our work in progress; a state-of-the-art platform featuring a multi-threaded non-blocking/blocking I/O.  Coming soon.</p><p><a href="#" class="btn btn-lg btn-primary" role="button">Learn more</a></p>.', 'c': 'oh' },
        { 'a': '<b>nodakwaeri</b>', 'b': '<p>A concept, and small taste of the application framework experience baked into the up-and-coming Kwaeri platform; for Node.js.</p><p><a href="#" class="btn btn-lg btn-primary" role="button">Check it out</a></p>', 'c': 'ho' },
        { 'a': '<b>nodamysql</b>', 'b': '<p>A concept which will help us shape the future of our data integration tools for the kwaeri platform.</p><p><a href="#" class="btn btn-lg btn-primary" role="button">Learn more</a></p><p><a href="#" class="btn btn-default" role="button">On the Node</a></p>', 'c': 'yea' },
        { 'a': '<b>nk-mvc</b>', 'b': 'The project template for Node.js which makes use of nodakwaeri and nodamysql (nk and nk-mysql on npmjs.org, respectively). A conceptual preview of the experience for - and which will help shape - the Kwaeri platform.<p>.', 'c': 'nice' }
    ];

    this.rendr( request, response );
};


// Export
module.exports = exports = dashController;