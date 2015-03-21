# nk-xrm [![Donate via PayPal.com](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8ZCX9RCEQ2DDJ)

The Massively Modified, Massively Modern Solution for Node.js which enables the collection and customization of desired components via a native extension system in order to create an original (X)Cross-Relational Management System. Users can create a CMS, a CRM, or any other application they can imagine by browsing available plug-ins or creating their own.


<br />
## Getting nk-xrm

### Installing nk-xrm via the npmjs.org Install Package


***NOTES***

- *The package - available on npmjs.org - is an installer package; It fetches a source archive from Github.com and decompresses it to the application root - or the directory containing the __node-modules__ directory.*
<br />
- *To use the installer package you will need to have installed __Python v2.7__. You will also need __node-gyp__ installed in the following manner:* `npm install -g node-gyp`.
- *Because the package on npmjs.org is an __installer__ package - and __not__ the source package; updates to the installer need not take place for each release of nk-xrm. Due to this, you will want to ensure that you check for new releases of nk-xrm from time to time so that you can update your installation when necessary.*
- *To update nk-xrm via the installer package to the latest source, you should ensure to backup - and will need to remove - any existing source in the chosen application root first. Then run the following:* `chosen_application_root/node_modules/nk-xrm/> node-gyp rebuild`.


To get started, run the following via terminal/command prompt:

```node
chosen_application_root/> npm install nk-xrm
```

<br />
You can supply a number of arguments to `npm install nk-xrm` and/or `node-gyp configure` in order to further customize your installation:

- `--remote_url` to override the github.com repository    
   <sub>i.e. `npm install nk-xrm --remote_url="https://github.com/mmod/archive"`</sub>   
   
- `--remote_branch` to override the github.com branch   
   <sub>i.e. `npm install nk-xrm --remote_branch="master"`</sub>   
   
- `--archive_name` to override the archive's local name   
   <sub>i.e. `npm install nk-xrm --archive_name="nk-xrm-latest"`</sub>   
   
- `--archive_extension` to override the archive's extension   
   <sub>i.e. `npmn install nk-xrm --archive_extension=".tar.gz"`</sub>   
   
- `--archive_destination` to override the archive's local destination   
   <sub>i.e. `npm install nk-xrm --archive_destination="./"`</sub>   
   
- `--package_destination` to override the xrm's desination   
   <sub>i.e. `npm install nk-xrm --package_destination="<(module_root_dir)/../../"`</sub>   
   
- `--ignorable_files` to override the list of files to ignore in the source tarball   
   <sub>i.e. `npm install nk-xrm --ignorable_files=['.project', '.gitignore']`</sub>   
   

We anticipate that the most used override should be `--remote_branch`. This allows the end user to choose between stable and unstable variants of the xrm package. The examples listed above represent the default values currently set in the installer's source.


<br />
### Installing nk-xrm the Ol' Fashioned Way

If you find yourself having issues with the installer, or simply prefer to do things the old-fashioned way:

```
chosen_application_root/> git clone https://github.com/mmod/nk-xrm
```

<br />
Alternatively, you could just download a [tarball](https://github.com/mmod/nk-xrm/archive/master.tar.gz) and extract it to where you wish to keep the application. 


<br />
#### Finishing the Installation

When finished getting and/or installing nk-xrm, we need to install its dependencies. Before we do that we need to make sure we have some prerequisites in place for the data-tools to install correctly. Whether you wish to build or not build the data-tools, the [nodakwaeri wiki @ Github](http://github.com/mmod/nodakwaeri/wiki/nk-mysql) will guide you through ensuring you meet any and all requirements.  Once you've gone through the respective documentation, return here in order to complete installation and configuration.

What we need to do now, is to install the dependencies for nk-xrm.  Assuming we've ensured we have all prerequisites completed and verified:

```
chosen_application_root/> npm install .
```

...will do the trick.


<br />
## Configuration

### Seed the Database

In the root of your nk-xrm application, you'll find a directory named `install` containing a file named `seed.sql`.  If you open the file you will see in 2 places exists the string: `<REPLACEWITHYOURPASSWORDHASH>`.  You will need to replace these with - you guessed it - a hashed password.

In order to do this, create a file `whatever.js` in the root of your application, and add the following code to it (replacing `<YourPasswordHere>` and `<YourSecretHere>`) with your actual password and secret, respectively:

```node
var nk = require( 'nk' ),
    nk = new nk(),
    pass = "<YourPasswordHere>",
    secret = "<YourSecretHere>";
    
console.log( nk.hash( { data: pass, salt: key } );
```

<br />
Please note, that the secret can be a 10 character or 100 character string; nodakwaeri will use it to generate a 256-bit salt. You will want to remember the string you used for the secret so as you build your user system out you have it to generate the hash again for comparison during login.

Save the file and execute it using node.js:

```node
chosen_application_root/>node whatever.js
```  

<br />
The hash function let's you supply a secret that it then hashes; so that you can supply it either with the same string over and over, or by invoking a function that will return a secret from elsewhere, since - being realistic - the more acceptable and professionally practiced way to build a *secure* authentication system is to store secrets and/or encrypt passwords on an external device.  

Take the hashed password printed on your console window/terminal as a result of the invoked `console.log()` method(wherever it came from), and add it to the `seed.sql` file - replacing the existing `<REPLACEWITHYOURPASSWORDHASH>` values where they are. Update other fields as desired as well.

Run/Execute the contents of the `seed.sql` file either in MySQL Workbench, or via your favorite means (in the future nk-mysql will have additional tools which will provide features similar to Microsoft's Migrations, but until then...).  You will also want to browse `path_to_application/app/models/account` and `path_to_application/adm/models/account`, to update the *login* members with the proper salt/secret and/or expand upon the authentication system making it more secure and to your liking. 


<br />
### Configure the Application

To finish configuring your application, open the `config.js` file in the root of the nk-xrm application.  In this file, notice the **url** and **server** members of both the **development** *and* **production** configuration schemas; You probably need to update at least one of them, as well as any mail config (though we can't use it yet, it's there to remind us to build that in!).  If you're developing locally and not using a host entry (meaning you're typing localhost into your browser), then the URL *should* be `http://localhost:XXXX` 'lest you want problems.

The only other changes you may need to make, are in the database sections of the configuration file.  

You're all configured now, moving on.


<br />
## Usage

To use the nk-xrm application:

<br />
#### On Windows:

```node
chosen_application_root/>set NODE_ENV=development
chosen_application_root/>node index.js
```

or if you are starting the admin application:

```node
chosen_application_root/>set NODE_ENV=development
chosen_application_root/>node index.js admin
```

<br />
#### On Linux/Unix:

```node
chosen_application_root/>NODE_ENV=development node index.js
```

or if you are starting the admin application:

```node
chosen_application_root/>NODE_ENV=development node index.js admin
```

<br />
Some console output should have alerted you that the application(s) is/are running.  Try visiting `http://localhost:XXXX`; if you did not make any changes to the configuration the port would be **7719** for the *front* application, and **7717** for the *admin* application...otherwise we're guessing you know what you're doing :)


<br />
### Digging Deeper

To get a feel for the XRM and the design of the nk framework, dig through the `adm` and `app` folders.  Take note of how the controllers, models, and views are structured and where they are located. This will help you explore and learn about developing with nk.

- An example of a website based interface is viewable from the root URL of the xrm application when it is running.
- An example of a web application 'dash'  is available by visiting `<base_url>/dash`.

***NOTE:*** *The extension system is NOT fully implemented, what is present is only a conceptual skeleton for implementation.*


<br />
### Important considerations

The advanced cryptography methods were stripped from this source, so you will want to modify `chosen_application_root/app/models/account` and `chosen_application_root/adm/models/account` and update the *login* members so that they implement a more secure authentication system.


**This is a new repository and we have a lot going on. Please bear with us as we update sources and documentation.**


<br />
### The Gist of the Framework

Like any MVC Framework, it's up to the developers to supply the Controllers, Models, and Views which make up the application.


<br />
#### Controllers 

Controllers are where we set/get session variables, they're where we invoke data queries, and they are where we place most application or business logic specific to our application. 

Properties of a controller object are considered the different *actions* the controller provides to the application; simply adding a new action to an existing controller will yield a new usable URL:  `<base_url>/<controller>/<action>`.  Adding ***Post*** to the end of a controller action name will let the framework know that it should be called when a POST is made upon that URL.

Take a look at `chosen_application_root/app/controllers/account.js` to see some examples.


***NOTE:*** *Currently there are no examples for API transactions, however -> responding to API requests will take place directly in the controller.  Example coming soon.*


<br />
#### Models

Models are where we define data queries, and data properties.

Members of a model file's object are considered *models*; You could essentially have numerous related models within a single model file.  From within a model, we are able to access the database object, and are typically fed a callback to make data processing implicitly asynchronous.

Take a look at `chosen_application_root/app/models/account.js` to see an example.


<br />
#### Views

Views are where we define what the end user is going to see when the response is set (and we are returning a content type of text/html).  This involves preparation of a layout as well as content for the layout.

Each directory under `chosen_application_root/app/views` (aside from *shared*), denotes a set of views for each controller's various actions.  The *shared* directory under `chosen_application_root/app/views` allows developers to create *layouts* or *templates* which are available to the entire application.  

Take a look at the various files within the `chosen_application_root/app/views/` directory to see some examples.

<br />
***A little note***
*To change your favicon, just replace the favicon.ico that exists in the `path_to_application/assets/` and `path_to_application/adm/assets` directories.  Icons cache in Windows, so after dropping your new favicon you may notice that in file explorer the old icon is still displaying (you will need to restart your pc to correct this).  Rest assured that once you've deleted your browsers cache, in the browser the proper favicon will show (even before restarting).*  

More documentation to come.


<br />
## Development

Feel free to fork the repository and submit pull requests. Browse any of our other repositories as well [MMOD @ Github](http://github.com/mmod). 

Documentation for getting the development environment setup is coming soon.

   <sub>*You may also contribute by making a donation*</sub>   
   [![Donate via PayPal.com](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8ZCX9RCEQ2DDJ)



<br />
### Created with:

[Eclipse Luna](https://www.eclipse.org/downloads/)

[Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))

[Node.js](http://nodejs.org)
