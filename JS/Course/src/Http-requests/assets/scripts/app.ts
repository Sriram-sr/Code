const ulListElement = document.querySelector('.posts') as HTMLUListElement;
const postTemplate = document.getElementById(
  'single-post'
) as HTMLTemplateElement;

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const sendHttpRequest: (method: string, url: string) => Promise<string> = (
  method: string,
  url: string
) => {
  const promise = new Promise<string>((resolve, _reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.send();
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

fetchPosts();
