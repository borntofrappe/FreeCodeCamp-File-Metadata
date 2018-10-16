// create an array of possible types
const fileType = [
  'text/plain',
  'text/html',
  'image/jpeg',
  'image/png',
  'audio/mpeg',
  'video/mp4'
];

// select the paragraph detailing the file type
// every 5s change the text of the paragraph to one random type
// every 5s and after 2s, to match the CSS animation
const fileTypeParagraph = document.querySelector('.file p');

const timeoutID = setTimeout(() => {
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * fileType.length);
    fileTypeParagraph.textContent = fileType[randomIndex];
  }, 5000);
  clearTimeout(timeoutID);
}, 1000);

// target the label used in place of the input of type file
// when using the input of type file update the label's text with the name of the selected file
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
