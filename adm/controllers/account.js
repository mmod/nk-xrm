/**
 * package: nk-xrm
 * sub-package: controllers/account
 * author: Richard B. Winters <a href="mailto:rik@mmogp.com">rik At Massively Modified</a>
 * copyright: 2013-2014 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


/**
 * Constructor
 *
 * @since 0.0.1
 */
function accountController()
{
}


accountController.prototype.index = function( request, response )
{
    // Undoubtedly there will be session variables we will want to keep
    // persistent and need to keep track of without knowing the entry
    // point of the user.
    response.session.set( 'user', request.session.get( 'user', JSON.stringify( { username: 'Guest', email: '', name: { first: 'Guest' } } ) ), { secure: true } );

    // We just need to display a message here
    this.klay.layout = 'shared/main';
    this.klay.viewbag.title = 'MMod XRM: Account';
    this.klay.viewbag.pagetitle = 'Nothin to see here...';
    this.klay.viewbag.authenticated = request.isAuthenticated;
    this.klay.viewbag.username = request.session.get( 'username', 'Guest' );

    this.rendr( request, response );
};


// HTTP GET /account/login
accountController.prototype.login = function( request, response )
{
    // Undoubtedly there will be session variables we will want to keep
    // persistent and need to keep track of without knowing the entry
    // point of the user.
    response.session.set( 'user', request.session.get( 'user', JSON.stringify( { username: 'Guest', email: '', name: { first: 'Guest' } } ) ), { secure: true } );

    // We just need to display fields for a login here
    this.klay.layout = 'shared/login';
    this.klay.model = require( '../models/account' ).loginView;
    this.klay.viewbag.title = 'MMod XRM: Login';
    this.klay.viewbag.pagetitle = 'Please log in';
    this.klay.viewbag.username = request.session.get( 'username', 'Guest' );

    this.rendr( request, response );
};


// HTTP POST /account/login
accountController.prototype.loginPost = function( request, response )
{
    var na = this;

    // Here we're going to want to use our database provider, when we do so
    // we'll define a callback to send along with our query
    // to support an implicit asynchronicity.
    var viewModel = require( '../models/account' ).loginView,
    loginModel = require( '../models/account' ).login,
    model = this.modl.set( loginModel );

    this.klay.layout = 'shared/main';
    this.klay.model = require( '../models/account' ).loginView;
    this.klay.viewbag.title = 'MMod XRM: Account';
    this.klay.viewbag.pagetitle = 'You tried to log in.';
    this.klay.viewbag.authenticated = request.isAuthenticated;
    this.klay.viewbag.username = request.session.get( 'username', 'Guest' );

    // Here we define the callback for our authentication method
    var callback = function( req, res, authenticated, tk )
    {
        if( !authenticated )
        {
            console.log( 'We were unable to authenticate the user.' );
            res.session.set
            (
                'user',
                JSON.stringify
                (
                    {
                        username: 'Guest',
                        name: { first: 'Guest' }
                    }
                ),
                { secure: true }
            );

            req.session.setUserAuth( req.session.client.id, true );

            na.rendr( req, res );
        }
        else
        {
            console.log( 'We were able to authenticate the user.' );
            // Using POST variables is quite easy as well:
            if( req.posted.rememberme )
            {
                res.session.set( 'persistence', true, { secure: true } );
            }

            // Store user information for later use
            res.session.set
            (
                'user',
                JSON.stringify
                (
                    {
                        id: authenticated[0].id,
                        username: authenticated[0].username,
                        email: authenticated[0].email,
                        name: { first: authenticated[0].first, last: authenticated[0].last },
                        company: { id: authenticated[0].company, name: authenticated[0].companyname }
                    }
                ),
                { secure: true }
            );

            req.session.setUserAuth( req.session.client.id );

            // Let's redirect, but remember to set the session before we do.
            res.redirect( '/' );
        }
    };

    // And here we invoke the model's authenticate method. I'm sure you can see
    // the changes you would need to make in this controller method to make things
    // synchronous instead (i.e. remove code body from callback, have it run after
    // model executes, but have model return its value to a variable within this method's
    // scope like var authenticated = mode.authenticate... callback can be left undefined.)
    model.authenticate( request, response, callback, this.klay );
};


// HTTP /account/manage
accountController.prototype.manage = function( request, response )
{
    // Undoubtedly there will be session variables we will want to keep
    // persistent and need to keep track of without knowing the entry
    // point of the user.
    response.session.set
    (   'user',
        request.session.get
        (   'user',
            JSON.stringify
            (   {
                    company: 'Massively Modified, Inc.',
                    location: 'Oneonta, NY',
                    type: 'Admin',
                    title: 'Chief Executive',
                    username: 'Guest',
                    email: '',
                    name: { first: 'Guest', last: 'Last' },
                    address: { first: '', second: '', city: '', state: '', zip: '' },
                    contact: { phone: '', ext: '' }
                }
            ),
            { secure: true }
        )
    );

    // Display fields to manage account information
    this.klay.layout = 'shared/main';
    this.klay.model = require( '../models/account' ).manageView;
    this.klay.viewbag.title = 'MMod XRM: Manage account';
    this.klay.viewbag.pagetitle = 'Please manage yourself.';
    this.klay.viewbag.user = JSON.parse( request.session.get( 'user' ) );
    this.klay.viewbag.authenticated = request.isAuthenticated;
    this.klay.viewbag.usertypes =
    {
            'a': 'Guest',
            'b': 'Registered',
            'c': 'Moderator',
            'd': 'Administrator'
    };

    this.rendr( request, response );
};


// HTTP POST /account/manage
accountController.prototype.managePost = function( request, response )
{
    // Undoubtedly there will be session variables we will want to keep
    // persistent and need to keep track of without knowing the entry
    // point of the user.
    response.session.set( 'user', request.session.get( 'user', JSON.stringify( { username: 'Guest', email: '', name: { first: 'Guest' } } ) ), { secure: true } );

    // We just need to display a message here
    this.klay.layout = 'shared/main';
    this.klay.viewbag.title = 'MMod XRM: Manage account';
    this.klay.viewbag.pagetitle = 'You have tried to manage yourself.';
    this.klay.viewbag.authenticated = request.isAuthenticated;
    this.klay.viewbag.username = request.session.get( 'username', 'Guest' );

    this.rendr( request, response );

    var layout = this.config.view_provider;
};


// Export
module.exports = exports = accountController;