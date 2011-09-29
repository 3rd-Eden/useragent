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

`useragent` has 2 methods:

1. `useragent.is(useragent string).browsername` This api provides you with a
   quick and dirty browser lookup. The underlying code is usually found on
   client side scripts so it's not the same quality as our parse method but it
   does the job.

   `useragent.is` returns a object with potential matched browser names

   ```js
   useragent.is('ua string').firefox // true
   useragent.is('ua string').safari // false
   var ua = useragent.is('ua string')
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

2. `useragent.parse(useragent string)` This initiates our parser`.. bla bla
