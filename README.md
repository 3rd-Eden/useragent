# useragent 

Current build status:[![BuildStatus](https://secure.travis-ci.org/3rd-Eden/useragent.png)](http://travis-ci.org/3rd-Eden/useragent)

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

### Performance

The 1.0 release of the useragent parser spots a major performance improvement
of the old parser, it also has a reduced memory level because we recompiled the
regex list to make a smaller impact.

Some stats from the benchmark:

> ```
> Starting the benchmark, parsing 47 useragent strings per run
> Executed benchmark (useragent2)
> Count (86), Cycles (96), Elapsed (5.028), Hz (1640.9779913574882)
>
> Executed benchmark (useragent1)
> Count (56), Cycles (96), Elapsed (5.03), Hz (1063.7910527195145)
> ```

As you can see that useragent 2 (1.0) is much faster then original parser. The
test above was executed on a iMac 2010 and Node.js v0.4.12. The code has been
optimized to take full advantage of the upcoming V8 crankshaft support in
node.js and you will another performance boost from it. Free performance boost,
so that is pretty bad ass.

### Installation

Installation is done using the Node Package Manager (npm). If you don't have
npm installed on your system you can download it from
[npmjs.org](http://npmjs.org)

```
npm install useragent
```

### Migrating from 0.1.2 to 1.0.0

If you are upgrading from 0.1.2 to 1.0.0 these changes will affect your:

* `useragent.browser(ua)` has been renamed to `useragent.is(ua)`.
* `useragent.parser(ua, jsua)` has been renamed to `useragent.parse(ua, jsua)`.
* `result.pretty()` has been renamed to `result.toAgent()`.
* `result.V1` has been renamed to `result.major`.
* `result.V2` has been renamed to `result.minor`.
* `result.V3` has been renamed to `result.patch`.
* `result.prettyOS()` has been removed.
* `result.match` has been removed.

For more detailed information, check out the API below.

### API / Working the codez

Include the useragent parser in you node.js application:

```js
var useragent = require('useragent');
```

The useragent library allows you do use the automatically installed regex
library or you can fetch it live from the remote servers. So if you are
paranoid and always want your regex library to be up to date to match with
agent the widest range of useragent strings you can do:

```js
var useragent = require('useragent');
useragent(true);
```

This will async load the database from the server and compile it to a proper
JavaScript supported format. If it fails to compile or load it from the remote
location it will just fallback silently to the shipped version.

But there are more ways to update your regex library, when the useragent is
installed on your system we automatically start a update process to see if the
shipped version is out of date or not, if we can fetch one we will store that
one instead so you have latest version available for you when you install.

In addition to this, doing a `npm update useragent` should also re-fetch the
library for you. So many ways to stay up to date ;).

#### useragent.is(useragent string).browsername;

This api provides you with a quick and dirty browser lookup. The underlying
code is usually found on client side scripts so it's not the same quality as
our parse method but it does the job.

`useragent.is` returns a object with potential matched browser names

```js
useragent.is(req.headers['user-agent']).firefox // true
useragent.is(req.headers['user-agent']).safari // false
var ua = useragent.is(req.headers['user-agent'])

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
var agent = useragent.parse(req.headers['user-agent']);

// example for parsing both the useragent header and a optional js useragent
var agent2 = useragent.parse(req.headers['user-agent'], req.query.jsuseragent);
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
var agent = useragent.parse(req.headers['user-agent'])
  , another = useragent.fromString(agent.toString());

console.log(agent == another);
```

#### useragent.fromJSON(agent.toJSON());

Parses the result of `agent.toJSON()` back to a new Agent instance.

```js
var agent = useragent.parse(req.headers['user-agent'])
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
var agent = useragent.parse(req.headers['user-agent']);
agent.toAgent(); // 'Chrome 15.0.874'
```

#### Agent.toString();

Returns the results of the `Agent.toAgent()` but also adds the parsed operating
system to the string in a human readable format.

```js
var agent = useragent.parse(req.headers['user-agent']);
agent.toString(); // 'Chrome 15.0.874 / Mac OS X'

// as it's a to string method you can also concat it with another string

'your useragent is ' + agent; // 'your useragent is Chrome 15.0.874 / Mac OS X'
```

#### Agent.toVersion();

Returns the version of the browser in a human readable string.

```js
var agent = useragent.parse(req.headers['user-agent']);
agent.toVersion(); // '15.0.874'
```

#### Agent.toJSON();

Generates a stringified JSON output of the agent, this can later be used again
to create a new Agent instance using the `useragent.fromJSON` method.

```js
var agent = useragent.parse(req.headers['user-agent']);
agent.toJSON(); //'{"family":"Chrome","major":"15","minor":"0","patch":"874","os":"Mac OS X"}'
```

### Adding more features to the Agent

As I wanted to keep the core of the useragent parser as clean and fast as
possible I decided to move some of the initally planned features to a new
`plugin` file.

These extenstions to the Agent prototype can be loaded by requiring the
`useragent/features` file:

```js
var useragent = require('useragent');
require('useragent/features');
```

The inital release introduces 1 new method, satisfies, which allows you to see
if the version number of the browser satisfies a certain range. It uses the
semver library to do all the range calculations but here is a small summary of
the supported range styles:

* `>1.2.3` Greater than a specific version.
* `<1.2.3` Less than.
* `1.2.3 - 2.3.4` := `>=1.2.3 <=2.3.4`.
* `~1.2.3` := `>=1.2.3 <1.3.0`.
* `~1.2` := `>=1.2.0 <2.0.0`.
* `~1` := `>=1.0.0 <2.0.0`.
* `1.2.x` := `>=1.2.0 <1.3.0`.
* `1.x` := `>=1.0.0 <2.0.0`.

#### Agent.satisfies('range style here');

Check if the agent matches the supplied range.

```js
var agent = useragent.parse(req.headers['user-agent']);
agent.satisfies('15.x || >=19.5.0 || 25.0.0 - 17.2.3'); // true
agent.satisfies('>16.12.0'); // false
```
