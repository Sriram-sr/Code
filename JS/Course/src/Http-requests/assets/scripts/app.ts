const ulListElement = document.querySelector('.posts') as HTMLUListElement;
const postTemplate = document.getElementById(
  'single-post'
) as HTMLTemplateElement;

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

xhr.onload = function () {
  let listOfPosts: Array<Post> = JSON.parse(xhr.response).slice(0, 10);
  for (const post of listOfPosts) {
    const postElement = document.importNode(postTemplate.content, true);
    postElement.querySelector('h2')!.textContent = post.title.toUpperCase();
    postElement.querySelector('p')!.textContent = post.body;
    ulListElement.appendChild(postElement);
  }
};

xhr.send();
