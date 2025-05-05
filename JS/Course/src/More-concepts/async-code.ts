const buttonEl = document.querySelector('button');

const getUserLocation = () => {
  navigator.geolocation.getCurrentPosition(
    posData => {
      console.log(posData);
    },
    error => {
      console.log(error);
    }
  );
  console.log('Getting user location!');
};

buttonEl?.addEventListener('click', getUserLocation);
