# IIS Project

## Database

For development purposes we are running mysql database in container using
podman or docker runtime.

After the definition of schema of our database, we should add some SQL script
to fill the database with test data. It is going to be then used in
Containerfile which is going to make container image containing our definition
of database. Which is going to be ready for deploy.

### Initialisation

Simply run test script provided in the `podman/` directory. But beware, **do not**
use this command for production, as it contains definition of database root
password, which is for testing purposes set to `test`

    $ ./podman/start.sh

### Connection to database

We have a script as a short hand provided in `podman/` directory. Otherwise
it is possible to connect using command line (and of course directly from
code).

    $ ./podman/connect.sh

