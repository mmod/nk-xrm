/**
 * package: nk-xrm
 * sub-package: models/account
 * author: Richard B. Winters <a href="mailto:rik@mmogp.com">rik At Massively Modified</a>
 * copyright: 2011-2015 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


// Deps
var nk = require( 'nk' ),
nk = new nk();  // When we do not pass an argument to the constructor, we
                // get only the core facilities ( .type, .extend, .each,
                // .hash, etc )


/**
 * Defines the context model
 *
 * @since 0.0.1
 */
var accountModel =
{
    login:
    {
        authenticate: function( request, response, callback, klay )
        {
            var user = request.posted.username, pass = request.posted.password;

            console.log( 'pass: ' + request.posted.password );

            // Prep the database object
            var db = this.dbo();

            // Run our query. We will not compare passwords quite yet, as we
            // need the timestamp from the record as part of our salt. This is
            // ok since usernames are unique.
            //var authenticated =
            db.reset();

            var authenticated = db
            .query( "select users.id as id, users.type as type, users.ts as ts, username, password, context, contexts.acl as acl, company, first, " +
                    "last, contexts.email as email from users join contexts on users.id=contexts.owner and" + " users.context = contexts.id " +
                    "where username='" + user + "';" )
            .execute();

            if( nk.type( authenticated ) === 'array' )
            {
                // IMPLEMEMT YOUR OWN AUTHENTICATION TECHNIQUE HERE

                var d = 0123455678810           // IMPLEMENT YOUR OWN SALT LOGIC HERE

                // Now using the timestamp let's hash the provided password
                pass = nk.hash
                (
                    {
                        data: pass,
                        salt: d
                    }
                );

                //console.log( 'hashed: ' + pass );
                //console.log( 'stored: ' + authenticated[0].password );

                //console.log( pass);
                if( pass !== authenticated[0].password )
                {
                    authenticated = false;
                }
            }
            else
            {
                authenticated = false;
            }

            // Remove the password so it is not available
            if( authenticated )
            {
                delete authenticated[0].password;
            }

            // And invoke the callback, passing the result of our query
            if( nk.type( callback ) === 'function' )
            { // Asynchronous
                callback( request, response, authenticated, klay );
            }
            else
            { // Synchronous
                return authenticated;
            }
        },
        schema:
        {
            /*
             * Account Login View Model
             */
            // company: [ true, 'text', 'Record Id' ], // We can extend the user system as we see fit
            id: [ true, 'int', 'User Id'],
            type: [ true, 'int', 'Account Type' ],
            acl: [ true, 'int', 'Access Level' ],
            ts: [ true, 'text', 'Member Since' ],
            username: [ true, 'text', 'Username' ],
            password: [ true, 'text', 'Password' ],
            context: [ true, 'int', 'Default Context' ]
        }
    },
    loginView:
    {
        schema:
        {
            /*
             * Account Login View Model
             */
            // company: [ true, 'text', 'Record Id' ], // We don't need this
            // because all users have a default context which specifies company,
            // we will redirect them properly.
            username: [ true, 'text', 'Username' ],
            password: [ true, 'text', 'Password' ],
            rememberme: [ true, 'int', 'Remember me' ]
        }
    },
    manageView:
    {
        getUser: function()
        {
            // This is a placeholder
            return { username: 'Guest' };
        },
        schema:
        {
            /*
             * Account/Manage View model
             */
            company: [ false, 'int', 'Company' ],
            location: [ false, 'int', 'Location' ],
            type: [ false, 'int', 'User type' ],
            title: [ false, 'text', 'Title' ],
            username: [ false, 'text', 'Username' ],
            email: [ true, 'text', 'Email' ],
            first: [ true, 'text', 'First Name' ],
            last: [ true, 'text', 'Last Name' ],
            add1: [ false, 'text', 'Address 1' ],
            add2: [ false, 'text', 'Address 2' ],
            city: [ false, 'varchar', 'City' ],
            state: [ false, 'varchar', 'State' ],
            zip: [ false, 'varchar', 'Zip/Postal Code' ],
            email: [ true, 'text', 'Email' ],
            phone: [ false, 'varchar', 'Phone' ],
            ext: [ false, 'varchar', 'Ext.' ],
            password: [ true, 'text', 'Password' ],
            retypepassword: [ true, 'text', 'Re-Type Password' ]
        }
    }
};


// Export
module.exports = accountModel;