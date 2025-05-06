const ulListElement = document.querySelector('.posts') as HTMLUListElement;
const postTemplate = document.getElementById(
  'single-post'
) as HTMLTemplateElement;
const formElement = document.querySelector('#new-post form') as HTMLFormElement;
const fetchButton = document.querySelector(
  '#available-posts button'
) as HTMLButtonElement;

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const sendHttpRequest: (
  method: string,
  url: string,
  data?: object
) => Promise<string> = (method, url, data?) => {
  const promise = new Promise<string>((resolve, _reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.send(JSON.stringify(data));
  });

  return promise;
};

const fetchPosts: () => void = () => {
  sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
    .then((data: string) => {
      let listOfPosts: Array<Post> = JSON.parse(data).slice(0, 10);
      for (const post of listOfPosts) {
        const postElement = document.importNode(postTemplate.content, true);
        postElement.querySelector('h2')!.textContent = post.title.toUpperCase();
        postElement.querySelector('p')!.textContent = post.body;
        ulListElement.appendChild(postElement);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const createPost: (title: string, content: string) => void = (
  title,
  content
) => {
  const userId = Math.random();
  const post = {
    title,
    content,
    userId
  };

  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
};

fetchButton.addEventListener('click', fetchPosts);
formElement.addEventListener('submit', event => {
  event.preventDefault();
  const titleElement = formElement.querySelector('#title') as HTMLInputElement;
  const contentElement = formElement.querySelector(
    '#content'
  ) as HTMLInputElement;
  createPost(titleElement.value, contentElement.value);
});
