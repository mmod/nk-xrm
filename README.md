# nk-xrm

The Massively Modified, Massively Modern Solution for Node.js which enables the collection and customization of desired components via a native extension system in order to create an original (X)Cross-Relational Management System. Users can create a CMS, a CRM, or any other application they can imagine by browsing available plug-ins or creating their own.


## Getting nk-xrm

To get started, open terminal/shell/command prompt and browse to the root of where you're building your application.  Clone the nk-xrm repository:

```
path_to_application/> git clone https://git@github.com/mmod/nk-xrm
```

Alternatively, you could just download a [zip of the source](https://github.com/mmod/nk-xrm/archive/master.zip) and extract it to where you wish to keep the application. 

When finished we need to install the dependencies but before we do that we need to make sure we have some prerequisites in place. Whether you wish to build or not build any of the components, the [nk-mysql documentation](http://github.com/mmod/nk-mysql) will guide you in ensuring you meet any and all requirements.  Once you've gone through the respective documentation, a link is provided which will redirect you back here in order to complete installation.


## Installation

Since we already have nk-xrm, all we need to do is install the dependencies for it and we'll be good to go.  Assuming we've ensured we have all prerequisites completed and verified...

```
path_to_application/> npm install .
```

...will do the trick.


### Configure the Application

To finish configuring your application, open the config.js file in the root of the nk-xrm application.  In this file, notice the URL and SERVER members of both the development and production configuration schemas; You probably need to update at least one of them, as well as any mail config (though we can't use it yet, its there to remind me to build that in!).  If you're developing locally and not using a host entry (meaning you're typing localhost into your browser), then the URL <i>should</i> be http://localhost:XXXX 'lest you want problems.

The only other changes you may need to make, are in the database sections of the configuration file.  

You're all configured now, moving on.


## Usage

To use the nk-xrm application:

#### On Windows:

```node
path_to_application/>set NODE_ENV=development
path_to_application/>node index.js
```

or if you are starting the admin application:

```node
path_to_application/>set NODE_ENV=development
path_to_application/>node index.js admin
```

#### On Linux/Unix:

```node
path_to_application/>NODE_ENV=development node index.js
```

or if you are starting the admin application:

```node
path_to_application/>NODE_ENV=development node index.js admin
```


Some console output should have alerted you that the application is running.  Try visiting http://localhost:<PORT#> if you did not make any changes to the configuration it would be 7719 for the 'front' application, and 7717 for the 'admin' application...otherwise I'm guessing you know what you're doing :)


### Digging Deeper

To get a feel for the XRM and the design of the nk framework, dig through the adm and app folders.  Take note of how the controllers, models, and views are structured and where they are located. This will help you explore and learn about developing with nk.

An example of a website based interface is viewable from the root URL of the xrm application when it is running.

An example of a web application 'dash'  is available by visiting <base_url>/dash


### Important considerations

The advanced cryptography methods were stripped from this source, so you will want to modify /app/models/account and /adm/models/account and updated the *login* members so that they implement a more secure authentication system.


This is a new repository and we have a lot going on. Please bear with us as we update sources and documentation.


### Created with:

[Eclipse Kepler](https://www.eclipse.org/downloads/)

[Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))

[Node.js](http://nodejs.org)