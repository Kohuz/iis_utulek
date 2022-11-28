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

## Programming Notes

### Javascript Module exports

`module.exports` is usually used for just one object/funtions

```js
module.exports = { ... };
```

`exports` if you want to make a module that consist of more objects and
functions. Like in python.

```js
exports.func1 = () => { ... };
exports.obj1 = { ... };
exports.func2 = () => { ... };
```

## Saving documentation

Provided documentation is saved with some weird encoding defined in HTTP
standard, therefore we have to enable proper UTF8 encoding in our editors.

### Vim related setup

```vim
set fileencoding=utf8
set bomb
```
