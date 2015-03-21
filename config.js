/**
 * config.js
 *
 * package: nk-xrm
 * version:  0.1.5
 */

var path = require( 'path' ),
    config;

config =
{
    // Development configuration
    development:
    {
        url: 'http://dev.mmogp.com',
        forceAdminSSL: true,
        mail:
        {
            fromaddress: 'noreply@mmogp.com',
            transport: 'SMTP',
            options:
            {
                service: 'Gmail',
                auth:
                {
                    user: 'test@gmail.com',
                    pass: 'password'
                }
            }
        },
        admin:
        {   // Yes, the admin application is a separate application from the main application.
            root: 'adm',
            controller_path: __dirname + '/adm/controllers',
            model_path: __dirname + '/adm/models',
            view_path: __dirname + '/adm/views',
            asset_path: __dirname + '/adm/assets'
        },
        app:
        {
            root: 'app',
            controller_path: __dirname + '/app/controllers',
            model_path: __dirname + '/app/models',
            view_path: __dirname + '/app/views',
            asset_path: __dirname + '/assets'
        },
        database:
        {
            client: 'mysql',
            host: 'localhost',
            port: '3306',
            db: 'mmdev',
            user: 'mmdadm',
            password: '^DevPass777$',
            debug: true
        },
        server:
        {
            host: '0.0.0.0',
            port:
            {
                app: '7719',
                admin: '7717'
            }
        }
    },

    // Production configuration
    production:
    {
        url: 'http://mmogp.com',
        forceAdminSSL: true,
        mail:
        {
            fromaddress: 'noreply@mmogp.com',
            transport: 'SMTP',
            options:
            {
                service: 'Gmail',
                auth:
                {
                    user: 'test@gmail.com',
                    pass: 'password'
                }
            }
        },
        admin:
        {   // Yes, the admin application is a separate application from the main application.
            root: 'adm',
            controller_path: __dirname + '/adm/controllers',
            model_path: __dirname + '/adm/models',
            view_path: __dirname + '/adm/views',
            asset_path: __dirname + '/adm/assets'
        },
        app:
        {
            root: 'app',
            controller_path: __dirname + '/app/controllers',
            model_path: __dirname + '/app/models',
            view_path: __dirname + '/app/views',
            asset_path: __dirname + '/assets'
        },
        database:
        {
            client: 'mysql',
            host: 'localhost',
            port: '3306',
            db: 'mmpro',
            user: 'mmpadm',
            password: '^ProPass777$',   // Passwords should be strong like so, but this is obviously a bad one to use...
            debug: false
        },
        server:
        {
            host: '0.0.0.0',
            port:
            {
                app: '7720',
                admin: '7718'
            }
        }
    },
};


// Use module.exports so that we have the direct context of the exported object, regardless of type.
module.exports = exports = config;
