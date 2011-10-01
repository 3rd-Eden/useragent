# useragent

Useragent is a port of browserscope.org's user agent parser project which
allows you to parse user agent strings with high accuracy by using hand tuned
dedicated regular expressions for browser matching. Regular user agent parser
have major issues because they usually parse out the version number of the
render engine instead of the version number of the browser.

Because user agent parsing will always be like shooting a moving target because
browser vendors keep making subtile changes to them it's important to keep your
the regular expressions database up to date. When you install useragent it will
automatically download the latest regexp database from the ua-parser project
and transform it in to a dedicated nodejs require statement. This way you will
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

#### useragent.fromJSON(agent.toJSON());

Parses the result of `agent.toJSON()` back to a new Agent instance.
