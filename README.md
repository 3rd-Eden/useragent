# useragent

Useragent is a port of browserscope.org's user agent parser project which
allows you to parse user agent strings with high accuracy by using hand tuned
dedicated regular expressions for browser matching. Regular user agent parser
have major issues because they usually parse out the version number of the
render engine instead of the version number of the browser.

Because user agent parsing will always be like shooting a moving target because
browser vendors keep making subtle changes to them it's important to keep your
the regular expressions database up to date. When you install useragent it will
automatically download the latest regexp database from the ua-parser project
and transform it in to a dedicated node.js require statement. This way you will
always be up to date.

But there few more tricks, so keep reading on until you hit the API section.

### Installation

Installation is done using the Node Package Manager (npm). If you don't have
npm installed on your system you can download it from
[npmjs.org](http://npmjs.org)

```
npm install useragent
```

### API / Working the codez

Include the useragent parser in you node.js application:

```js
var useragent = require('useragent');
```

#### useragent.is(useragent string).browsername;

This api provides you with a quick and dirty browser lookup. The underlying
code is usually found on client side scripts so it's not the same quality as
our parse method but it does the job.

`useragent.is` returns a object with potential matched browser names

```js
useragent.is('ua string').firefox // true
useragent.is('ua string').safari // false
var ua = useragent.is('ua string')

// the object
{
  version: '3'
  webkit: false
  opera: false
  ie: false
  chrome: false
  safari: false
  mobile_safari: false
  firefox: true
}
```

#### useragent.parse(useragent string[, js useragent]);

This is the actual user agent parser, this is where all the magic is happening.
The function accepts 2 arguments, both should be a `string`. The first argument
should the useragent string that is known on the server from the
`req.headers.useragent` header. The other argument is optional and should be
the useragent string that you see in the browser, this can be send from the
browser using a xhr request or something like this. This allows you detect if
the user is browsing the web using the `Chrome Frame` plugin.

The parser returns a Agent instance, this allows you to output user agent
information in different predefined formats. See the Agent section for more
information.

```js
var agent = useragent.parse(req.headers.useragent);

// example for parsing both the useragent header and a optional js useragent
var agent2 = useragent.parse(req.headers.useragent, req.query.jsuseragent);
```

#### useragent.lookup(useragent string[, js useragent]);

This provides the same functionality as above, but it caches the useragent
string and it's parsed result in memory to provide faster lookups in the
future. This can be handly if you expect to parse a lot of user agent strings.

It uses the same arguments as the `useragent.parse` method and returns exactly
the same result, but it's just cached.

#### useragent.fromString(agent.toString());

Parses the result of `agent.toString()` back to a new Agent instance.

```js
var agent = useragent.parse(req.headers.useragent)
  , another = useragent.fromString(agent.toString());

console.log(agent == another);
```

#### useragent.fromJSON(agent.toJSON());

Parses the result of `agent.toJSON()` back to a new Agent instance.

```js
var agent = useragent.parse(req.headers.useragent)
  , another = useragent.fromJSON(agent.toJSON());

console.log(agent == another);
```

### Agents

Most of the methods mentioned above return a Agent instance. This Agent exposes
the parsed out information from the user agent strings. This allows us to
extend the agent with more methods that do not nessesarly need to be in the
core agent instance, allowing us to expose a plugin interface for third party
developers.

You can read out the following properties:

* `family` The browser family, or browser name, it defaults to Other.
* `major` The major version number of the family, it defaults to 0.
* `minor` The minor version number of the family, it defaults to 0.
* `patch` The patch version number of the family, it defaults to 0.
* `os` The operating system of the user, it defaults to Other.

While most version number information is a string, I have chosen to present
them all as string because a browser can also be identified as beta or alpha.
When the family name or os can not be determined we will default to the string
Other.

The following methods are available:

#### Agent.toAgent();

Returns the family and version number concatinated in a nice human readable
string.

```js
var agent = useragent.parse(req.headers.useragent);
agent.toAgent(); // 'Chrome 15.0.874'
```

#### Agent.toString();

Returns the results of the `Agent.toAgent()` but also adds the parsed operating
system to the string in a human readable format.

```js
var agent = useragent.parse(req.headers.useragent);
agent.toString(); // 'Chrome 15.0.874 / Mac OS X'

// as it's a to string method you can also concat it with another string

'your useragent is ' + agent; // 'your useragent is Chrome 15.0.874 / Mac OS X'
```

#### Agent.toVersion();

Returns the version of the browser in a human readable string.

```js
var agent = useragent.parse(req.headers.useragent);
agent.toVersion(); // '15.0.874'
```

#### Agent.toJSON();

Generates a stringified JSON output of the agent, this can later be used again
to create a new Agent instance using the `useragent.fromJSON` method.

```js
var agent = useragent.parse(req.headers.useragent);
agent.toJSON(); //'{"family":"Chrome","major":"15","minor":"0","patch":"874","os":"Mac OS X"}'
```

### Adding more features to the Agent
