# todo-backend-modern-js

This is an implementation of [Todo-Backend](http://www.todobackend.com/).

This implementation uses modern Javascript features like decorators. It combines
a few libraries meant to organize and simplify your node.js stack while taking
advantage of ES6/7 features.

## How the code works

This codebase uses [app-context](http://app-contextjs.com/) to boot and initialize the application.
This is managed by the `app-context.js` file. It uses a few community-based initializers to read
and environment-specific config file, connects to the MongoDB endpoint in the configuration, and then
creates and starts an [express](http://expressjs.com/) server.

The [express initializer](https://www.npmjs.com/package/app-context-express) will create a new server
and add a default set of middleware to it (check the docs), then it will pass the server to the `router.js`
file to add routes.

We configure the server with a set of routes using a resolver that will lazy-load modules as they are
needed by the router. This resolver expects to find a class that it will lazily instantiate. It will
then call the methods passed to the `resolve` calls, expecting a promise. It will take the response and
encode it as JSON. The `resolve.errorHandler` at the end of the file will catch errors thrown through
promises in the resolved handlers, encoding them properly as JSON and setting the status code correctly.

The Todo routes are handled in `routes/todos.js` (referenced by the resolver). Here we grab a model from
MongoDB (which uses promises) and use it to do some basic CRUD operations. Thanks to a lot of beautiful
language features in new versions of Javascript we can make the handler methods super terse. To make the
methods even shorter we use `@view` from [@mattinsler/garnish](https://www.npmjs.com/package/@mattinsler/garnish)
to transform the returned records before they're sent to the client.

If you want any help or just want to tell me how horrible my code is, please [reach out to me](mailto:matt.insler@gmail.com)!
