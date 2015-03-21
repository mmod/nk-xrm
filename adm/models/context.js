/**
 * package: nk-xrm
 * sub-package: models/context
 * author:  Richard B. Winters <a href="mailto:rik@mmogp.com">rik At Massively Modified</a>
 * copyright: 2011-2015 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


/**
 * Context model
 *
 * @since 0.0.1
 */
var context =
{
    company:
    {   /*
         *  Companies represent a form of a global user.  In order to make use of this application one will need to subscribe to at
         *  least the starter edition.  In the process of doing so 1 company is allotted 1 location and 1 human user is authorized for use.
         *  The consumer would define company settings and create for themselves an administrator/user at which point they would proceed with
         *  setting up their business/inventory.
         *
         *  Each additional user the company desires, will need to have an additional user license purchased and assigned for their
         *  user Id.  Existing users (even those with contexts belonging to other companies) may also be invited to the company, but a license
         *  will need to be assigned to them in order for them to be able to work with said company and be able to do so in their company's
         *  context.
         *
         *  Contrary to what you may think, companies also have contexts, since companies can reside in multiple locations and have
         *  multiple points of presence.  However, this would be gearing more towards small business and enterprise class consumers requiring
         *  a completely different subscription tier in order to.  Such subscription tears also offer more performance, features, and value and
         *  therefore pricing is also different.
         */
        add: function()
        {
            // Inserts record(s)
        },
        get: function()
        {
            // Selects record(s)
        },
        update: function()
        {
            // Updates record(s)
        },
        remove: function()
        {
            // Deletes record(s)
        },
        schema:
        {
            /*
             * Within Schema, each member is a column of the table - except for the member which defines the table - spelled exactly as it exists within the respective table.
             * The value of each member, is an array containing the following attributes by index:
             *
             * 0:  Key or Boolean value, indicating whether the value is required, or if it is a key.  The first key in the array is the primary.
             * 1:  Type specifier ( int, varchar, datetime, time, date, text )
             * 2:  Display value of the column for html generation
             */
            id: [ 'key', 'int', 'Record Id' ],
            type: [ true, 'int', 'Type' ],
            ts: [ true, 'datetime', 'Created' ],
            owner: [ true, 'int', 'Created by' ],
            luts: [ true, 'datetime', 'Last Updated' ],
            luby: [ true, 'int', 'Last Updated by' ],
            name: [ true, 'text', 'Company Name' ],
            description: [ false, 'text', 'Company Description' ]
        }
    },
    location:
    {   /*
         * Locations serve as a form of company context.  A starter subscription allots 1 company 1 location and 1 user. Consumers then have a couple of different
         * options:
         *
         * 1. Purchase additional location and/or user licenses.
         * 2. Upgrade to a subscription tier which includes support for multiple-locations and purchase additional user licenses only.
         * 3. Suggestions?  Sound good so far?
         */
        schema:
        {
            id: [ 'key', 'int', 'Record Id' ],
            type: [ true, 'int', 'Type' ],                          // Type in a company location could be:  0 Head Quarters (default), 1 Office, 2 Warehouse, 3 Store, 4 Other/Kiosk
            ts: [ true, 'datetime', 'Created' ],
            company: [ true, 'int', 'Created by' ],
            luts: [ true, 'datetime', 'Last Updated' ],
            luby: [ true, 'int', 'Last Updated by' ],
            name: [ true, 'text', 'Company Name' ],
            description: [ false, 'text', 'Company Description' ],
            add1: [ false, 'text', 'Address Line 1' ],
            add2: [ false, 'text', 'Address Line 2' ],
            city: [ false, 'varchar', 'City' ],
            state: [ false, 'varchar', 'State' ],
            zip: [ false, 'varchar', 'Zip/Postal Code' ],
            phone: [ false, 'varchar', 'Phone' ]
        }
    },
    user:
    {   /*
         *  Users are system users.  Each user contains a type, username, password, and first, middle, last names.  Types in the user table differ from types
         *  within the context table:  Types in the user table designate to the system whether a user is a sysadmin or an end-user.  Types in the context table
         *  designate to the system whether a user is a regular user, a company mod/admin, and their access level within the company.  This could be different
         *  for each company so it is not stored within the user records but rather the contexts themselves.
         *
         *  Company admins/users never know one another's password.  It should never be that way and defeats the purpose of auditing individual users if even a
         *  single password is shared.  Due to this, the same password is used to login to any context that a user owns.
         *
         *  Users are designated a default context which contains their default email etc.  Typically this context is pre-coupled with a company account
         *  making it a 'company context'.  However, user's could ultimately create a default context that is not tied to a company, and this would be considered
         *  their only personal context.  A company would then need to extend an invitation to the user (identified by username) in order to allow that user a
         *  company context under their company.
         *
         */
        add: function()
        {
            // Inserts record(s)
        },
        get: function()
        {
            // Selects record(s)
        },
        update: function()
        {
            // Updates record(s)
        },
        remove: function()
        {
            // Deletes record(s)
        },
        schema:
        {
            id: [ 'key', 'int', 'Record Id' ],
            type: [ true, 'int', 'Type' ],                  // User type lets the system know if the user is a sysadmin or not.
            acl: [ true, 'int', 'Access Level' ],
            ts: [ true, 'datetime', 'Created' ],
            luts: [ true, 'datetime', 'Last Updated' ],
            luby: [ true, 'int', 'Last Update by' ],
            username: [ true, 'varchar', 'Username' ],      // Each user has only 1 username and password that is used for all owned contexts.
            password: [ true, 'text', 'Password' ],
            first: [ false, 'varchar', 'First name' ],
            middle: [ false, 'varchar', 'Middle name' ],
            last: [ false, 'varchar', 'Last name' ],
            email: [ true, 'text', 'Email' ],
            context: [ false, 'int', 'Default Context' ]
        }
    },
    elevated:
    {   /*
         *  Elevated models represent the administrator user in that the respective table stores the
         *  administrator password for any user added to the system as an administrator
         *
         */
        add: function()
        {
            // Inserts record(s)
        },
        get: function()
        {
            // Selects record(s)
        },
        update: function()
        {
            // Updates record(s)
        },
        remove: function()
        {
            // Deletes record(s)
        },
        schema:
        {
            id: [ 'key', 'int', 'Record Id' ],
            user: [ true, 'int', 'User' ],
            secure: [ true, 'text', 'Elevated password' ]
        }
    },
    context:
    {   /*
         * Contexts are the actual user identities as far as humans and system auditing are concerned.  While users are each end user's single point
         * of entry into the application, they only store the username, password, general profile information which would be shared among all of that
         * user's contexts, and provide a 'user id'.  Beyond this, contexts serve to store Company relationships, contact information (a user could use
         * different emails between multiple company contexts).
         *
         * A good example of different contexts would be:
         *
         * 1.   Richard B. Winters
         *      Software Engineer
         *      Massively Modified, Inc.
         *      Address 1
         *      Phone 1
         *      Email 1
         *
         * 2.   Richard B. Winters
         *      Software Engineer
         *      FTX POS, LLC
         *      Address 2
         *      Phone 2
         *      Email 2
         *
         * 3.   Richard B. Winters
         *      Consultant
         *      Company ABC, LTD
         *      Address 3
         *      Phone 3
         *      Email 3
         *
         * And of course company information is stored with each company: business addresses, communication methods, etc.  The basic rule is this:
         *
         * A user may only have 1 context which is not tied to a company, this is known as a personal context.
         *
         * A user may have only 1 context per company, this is known as a company context.
         *
         * A user may have as many different company contexts as they wish, and can create them either by starting a new company or being extended an invitation to an existing company.
         *
         */
        add: function()
        {
            // Inserts record(s)
        },
        get: function()
        {
            // Selects record(s)
        },
        update: function()
        {
            // Updates record(s)
        },
        remove: function()
        {
            // Deletes record(s)
        },
        schema:
        {
            id: [ 'key', 'int', 'Record Id' ],
            type: [ true, 'int', 'Type' ],                          // Context types let the system know whether the user is register, a company mod/admin.
            acl: [ true, 'int', 'Access Level' ],                   // ACL designates Access Level, and lets the system know the user's company access level.
            ts: [ true, 'datetime', 'Created' ],
            owner: [ true, 'int', 'User Id'],                       // Each user can only have 1 context for any company.
            location: [ true, 'int', 'Location Id' ],               // User can only exist at one location.  If they are district manager, they're a corp employee and should be listed as HeadQuarters
            company: [ true, 'int', 'Company Id' ],
            luts: [ true, 'datetime', 'Last Updated' ],
            luby: [ true, 'int', 'Last Update by' ],
            add1: [ false, 'text', 'Address Line 1' ],
            add2: [ false, 'text', 'Address Line 2' ],
            country: [ false, 'varchar', 'Country' ],
            city: [ false, 'varchar', 'City' ],
            state: [ false, 'varchar', 'State/Province' ],
            zip: [ false, 'varchar', 'Zip/Postal Code' ],
            email: [ true, 'text', 'Email' ],
            phone: [ false, 'varchar', 'Phone' ],
            ext: [ false, 'varchar', 'Ext.' ]

        }
    }
};


//Export
module.exports = context;