const buttonEl = document.querySelector('button');

const getUserLocation: () => void = () => {
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

const setTimer: (duration: number) => Promise<string> = duration => {
  const promise = new Promise<string>((resolve, _reject) => {
    setTimeout(() => {
      resolve('Timer is done!');
    }, duration);
  });
  return promise;
};

setTimer(2000)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log('Error ', err);
  });
