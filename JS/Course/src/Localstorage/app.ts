const storeBtn = document.getElementById('store-btn') as HTMLButtonElement;
const retreiveBtn = document.getElementById(
  'retrieve-btn'
) as HTMLButtonElement;

storeBtn.addEventListener('click', () => {
  //   localStorage.setItem('uId', '12345');
  sessionStorage.setItem('uId', '12345');

  // Cookies
  document.cookie = 'uid=u123';
});

retreiveBtn.addEventListener('click', () => {
  //   const userId = localStorage.getItem('uId');
  const userId = sessionStorage.getItem('uId');
  if (userId) {
    console.log(`Found user Id ${userId}`);
  } else {
    console.log('Coud not get user Id from storage');
  }

  // Cookies
  console.log(document.cookie);
});
