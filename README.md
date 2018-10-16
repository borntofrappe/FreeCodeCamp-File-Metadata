# File Metadata Microservice

> Fifth and final project required to earn the **API and Microservices** certification @freeCodeCamp.

Link to the UI for the homepage right [here](https://codepen.io/borntofrappe/full/mzqzLa).

Link to the working project right [here](https://melted-grin.glitch.me/).

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

The design of the homepage was the subject of a dedicated front-end effort. You can check out the pen [right here](https://codepen.io/borntofrappe/full/mzqzLa). The HTML, CSS and JS files making up in the application are included in the `public` and `views` folders, but the dedicated repo can be found [right here](https://github.com/borntofrappe/Practice-Front-End-Web-Development/tree/master/Front-End%20File%20Metadata).

## Back-End

I was not sure as to how to allow the visitor to select a file. Luckily, while developing the UI of the application I came upon the MDN documentation on the `input` element. Among the possible values of the `type` attribute, `file` appeared to completely answer all of my worries. The type is well documented [right here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file) and beside causing a few issues with the style of the application, it tackles the main feature the application ought to offer. That being selecting a file from local storage.

### Front-End Update

To tailor this new input element and an eventual POST request, the following modifications are enacted on the HTML markup:

- change the `main` container nesting the `input` elements to actually be a `form`.

  Add here attributes for the `action`, directing toward the established path of `/api/fileanalyse` and for the `method`, naturally picking `POST`.

  ```HTML
  <form class="app__form" action="/api/fileanalyse" method="POST">
    <!--  input elements  -->
  </form>
  ```

- for the first `input` element, add a `type` attribute of `file` and a `name` attribute of `upfile`. The second `input` element doesn't need any modification, as it already details a `type` of `submit`.

  ```HTML
  <form class="app__form" action="/api/fileanalyse" method="POST">
    <input type="file" name="upfile">
    <input type="submit" value="Upload">
  </form>
  ```

- to pass data instead of simply text, as accessible through the `body-parser` package, an attribute of `enctype` must be set to `multipart/form-data`.

  As documented [right here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype), and included as follows:

  ```HTML
  <form class="app__form" action="/api/fileanalyse" method="POST" enctype="multipart/form-data">
    <input type="file" name="upfile">
    <input type="submit" value="Upload">
  </form>
  ```

### Update

As it turns out, an `input` element of `type="file"` messes up my design as detailed in the Front-End folder. To fix this, I've added a couple of `label` elements, which is why the markup might look a tad different. The important thing is that a `label` element with a `for` attribute that matches the `id` of an `input` element allows to enable the same functionality as clicking the input element itself.

### JavaScript Script

After quite a bit of research, I discovered how the `body-parser` package was quite unfit to collect information about the file being submitted. The `multer` package turned out to be the dependency for the job. How did I find out about this package? Well, the error message of the application provided by freeCodeCamp was already a hint in the right direction:

```code
(/app/node_modules/multer/lib/make-middleware.js:52:37)
```

A quick google search on the library proved to be rather fruitful, with the package well documented right [here](https://github.com/expressjs/multer).

Of course this roundabout sketchy discovery could have been avoided by using the boilerplate provided by freeCodeCamp in the first place.

```JS
// require and use "multer"...
```

Regardless of how I came about to discover **multer**, it functions rather similarly to the **body-parser** package.

Once set up:

```JS
// require multer
const multer = require('multer');
// set up the upload method from the multer package
// a single file will be uploaded
// the input element has a `type`of `file` and a `name` of `upfile`
const upload = multer().single('upfile');
```

It allows to retrieve the information from submitted file in a property of the request. Specifically `req.file`.

```JS
app.post('/api/fileanalyse', upload, (req, res) => {
  // access the file's information from req.file
  file = req.file;
}
```

With a small conditional checking if such a file is `undefined` (meaning the form was submitted without a file), an appropriate JSON object can be sent back to the visitor.

### Update

By tinkering with the application, I realized how my label+input design had a small mishap. By uploading a file and going back to the homepage, indeed the label pointed toward "File not chosen", but selecting the same file again would not update this string. To avoid such a minor, yet unnerving error, a bit of JavaScript can be used.

In the JavaScript file served alongside the stylesheet, the text of the label can be updated as needed. Additionally, the value of the input can be "reset" as the homepage loads.

```JS
const upfileInput = document.querySelector('input#upfile');
const chosenfileLabel = document.querySelector('label#chosenfile');
// reset the value of the input element
upfileInput.value = '';

// on change update the label's text to match the selected file
upfileInput.addEventListener('change', (e) => {
  // the file's name is available in an array under `event.target.files`
  // as there's only one item, target it and retrieve its name
  const file = e.target.files[0].name;
  chosenfileLabel.textContent = file;
});
```
