---
title: Setting up MongoDB
published: true
tags:
- integrations
- databases
---

This guide walks through how you can setup a MongoDB database
on your Nitrous.IO box.

In: [MongoLab](https://mongolab.com)

![MongoLab](https://raw.github.com/action-io/action-assets/master/support/screenshots/mongodb/mongolab.png)

Go ahead and sign into MongoLab. Once in the dashboard, you'll
see a list of any databases you've already created. Click the **Create
New** button in the **Databases** section.

You'll see a bunch of professional plans appear below. You can ignore
these until you've deployed your new world-changing application to
production and you have millions of customers and can afford them.

MongoLab knows we need something lightweight to get our feet wet, so for
now we'll just pick the **Free (0.5GB)** plan.

Pick your Cloud Provider to be **Amazon Web Services** and choose either
the **EU-West-1 (Ireland)** or **US-East-1 (Virginia)** - whichever is
geographically close to the Nitrous.IO box that you created.

Pick a name for your database, say **my-awesome-apps-mongodb** as well as
a username and password (which you will use later to connect to your
MongoDB database).

![Pick Plan Button](https://raw.github.com/action-io/action-assets/master/support/screenshots/mongodb/pick-plan.png)

You'll see your new database at the top of your list of databases (or
just one if you just created an account).

![Create Database](https://raw.github.com/action-io/action-assets/master/support/screenshots/mongodb/create-database.png)

### MongoLab Database Connection Settings

In the *MongoLab* website, click your database name
(my-awesome-apps-mongodb) to get to the database dashboard. You will see your
database connection URL listed. The username/password combination is the
one you set earlier while creating your database.

![MongoLab Settings](https://raw.github.com/action-io/action-assets/master/support/screenshots/mongodb/mongodb-settings.png)

As seen in the screenshot, **ds043447.mongolab.com** is the host, **43447**
is the port, **my-awesome-apps-mongodb** is the database name, **dbuser**, **dbpassword**
is the username/password combination that you set earlier.

Grab each of the values and add them as environment variables in your
**~/.bash_profile** file on your Nitrous.IO box. It is good practice to
namespace your environment variables variables with the environment that you want to use your database in
(development or test), like so:

    export MONGODB_DEVELOPMENT_HOST=ds043447.mongolab.com
    export MONGODB_DEVELOPMENT_PORT=43447
    export MONGODB_DEVELOPMENT_DB=my-awesome-apps-mongodb
    export MONGODB_DEVELOPMENT_USERNAME=dbuser
    export MONGODB_DEVELOPMENT_PASSWORD=dbpassword
    export MONGODB_DEVELOPMENT_URI=mongodb://${MONGODB_DEVELOPMENT_USERNAME}:${MONGODB_DEVELOPMENT_PASSWORD}@${MONGODB_DEVELOPMENT_HOST}:${MONGODB_DEVELOPMENT_PORT}/${MONGODB_DEVELOPMENT_DB}

(Note: Some libraries for e.g. Ruby's Mongoid gem prefers to use the URI
format, so "MONGODB_DEVELOPMENT_URI" is also included as part of your
environment variables).

This will ensure that every time you log into your Nitrous.IO box, your
database credentials will be available as environment variables to use
in any of your apps.

If you want the environment variables to be loaded immediately, run

    source ~/.bash_profile

You can verify that your MongoDB credentials are loaded correctly by
running

    echo $MONGODB_DEVELOPMENT_HOST

This should return **ds043447.mongolab.com**

### Connecting with the Official MongoDB Client

All Nitrous.IO boxes come bundled with the official "mongo" client which
can be used to connect to the database. You can connect to the MongoLab
MongoDB database that you just created, by using the command

    mongo --shell --host $MONGODB_DEVELOPMENT_HOST --port $MONGODB_DEVELOPMENT_PORT -u $MONGODB_DEVELOPMENT_USERNAME -p $MONGODB_DEVELOPMENT_PASSWORD $MONGODB_DEVELOPMENT_DB

![MongoDB Shell](https://raw.github.com/action-io/action-assets/master/support/screenshots/mongodb/shell.png)

### Rails/Ruby

You can now access your database in your Rails application for e.g. by
using

<pre class="prettyprint lang-ruby">
ENV['MONGODB_DEVELOPMENT_URI']
</pre>

We recommend using the mongoid gem which you can install using:

    gem install mongoid

If you are running a Rails app, remember to include mongoid as part of
your Gemfile and run

    rails generate mongoid:config

![rails generate mongoid:config](https://raw.github.com/action-io/action-assets/master/support/screenshots/mongodb/mongoid.png)

Then in your "development" environment, under the default session, set
the uri to be "ENV['MONGODB_DEVELOPMENT_URI']"

![Rails MongoDB Settings](https://raw.github.com/action-io/action-assets/master/support/screenshots/mongodb/database-ruby.png)

### Node.JS

In Node.JS, you can access each of the environment variables by using

<pre class="prettyprint lang-javascript">
process.env.MONGODB_DEVELOPMENT_HOST, process.env.MONGODB_DEVELOPMENT_PORT,
process.env.MONGODB_DEVELOPMENT_USER, process.env.MONGODB_DEVELOPMENT_PASSWORD,
process.env.MONGODB_DEVELOPMENT_DB, process.env.MONGODB_DEVELOPMENT_URI
</pre>

(Please note, you'll probably need to install the
[mongoose](https://npmjs.org/package/mongoose) NPM
before you use Postgres in a Node.JS app, using the following command:

    npm install mongoose

Here's an example of how you can connect to your MongoLab database using
mongoose

![Node.JS MongoDB Settings](https://raw.github.com/action-io/action-assets/master/support/screenshots/mongodb/database-nodejs.png)

### Django/Python

In Python, you can access each of the environment variables by using

<pre class="prettyprint lang-python">
os.environ['MONGODB_DEVELOPMENT_HOST'], os.environ['MONGODB_DEVELOPMENT_PORT'],
os.environ['MONGODB_DEVELOPMENT_USER'], os.environ['MONGODB_DEVELOPMENT_PASSWORD'],
os.environ['MONGODB_DEVELOPMENT_DB'], os.environ['MONGODB_DEVELOPMENT_URI']
</pre>

The instructions in the official MongoDB documentatin for Python is an
excellent guide, but you can replace the settings in settings.py with
the MongoLab variables, like so:

![Python MongoDB Settings](https://raw.github.com/action-io/action-assets/master/support/screenshots/mongodb/database-python.png)


