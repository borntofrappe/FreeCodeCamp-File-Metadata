# File Metadata Microservice

> Fifth and final project required to earn the **API and Microservices** certification @freeCodeCamp.

<!-- Link to the UI of the homepage right [here](). -->

<!-- Link to the working project right [here](). -->

## Preface

With this project I am tasked to create a **File Metadata Microservice**. A full-stack application similar to [the one](https://purple-paladin.glitch.me/) reference [right here](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/file-metadata-microservice).

Unlike the previous projects, at least for me, it is not immediate what the application ought to actually achieve. Double checking the _user stories_ and most importantly playing around with the application, it is possible to ascertain the following:

- the application contains a "form" element;

- by selecting the **Choose File** input element, it is possible to select a file from local storage;

- by selecting **Upload**, it is possible to "upload" said file, as to have it then "analysed".

  The analysis itself consists of a JSON object, returned in the `[project]/api/fileanalyse` path and detailing the following:

  1. file's name;

  1. file's type;

  1. file's weight. In bytes.

  The JSON response ought to look something akin to:

  ```JSON
  {"name":"upfile.txt","type":"text/plain","size":33}
  ```

One of the user stories also cares to detail a testing requirement: the input element **Choose file** ought to have its `name` attribute set to `upfile`.

What happens if no file is chosen when hitting **Upload**? The following error message describes the occurrence:

```code
TypeError: Cannot read property 'originalname' of undefined
   at /app/server.js:24:23
   at Layer.handle [as handle_request] (/app/node_modules/router/lib/layer.js:93:5)
   at next (/app/node_modules/router/lib/route.js:138:13)
   at Array.<anonymous> (/app/node_modules/multer/lib/make-middleware.js:52:37)
   at listener (/app/node_modules/on-finished/index.js:169:15)
   at onFinish (/app/node_modules/on-finished/index.js:100:5)
   at callback (/app/node_modules/ee-first/index.js:55:10)
   at IncomingMessage.onevent (/app/node_modules/ee-first/index.js:93:5)
   at emitNone (events.js:106:13)
   at IncomingMessage.emit (events.js:208:7)
```

What happens if a rather heavy file is selected? After quite a bit of time, the page will correctly display the desired information.

```JSON
{"name":"take me home.mp4","type":"video/mp4","size":3003168}
```

These first notes allow to clear the air as to the purpose of the project. Unfortunately, they do not shed a lot of light as to **how** achieve the described outcome. Similarly to the previous projects, I will dedicate a coding session to the design of the application, to the UI of the root path. This to stretch my front-end skills and possibly let my brain work on the development which follows. In the back burner.

## Front-End

The design of the homepage was the subject of a dedicated front-end effort. You can check out the pen [right here](https://codepen.io/borntofrappe/full/mzqzLa). The HTML, CSS and JS files making up in the application are included in the `public` and `views` folders, but the dedicated repo can be found [right here]().
