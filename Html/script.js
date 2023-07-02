window.addEventListener('DOMContentLoaded', function () {
  var deleteButton = document.getElementById('deleteButton');
  var modal = document.getElementById('myModal');
  var cancelButton = document.getElementById('cancelButton');
  var okButton = document.getElementById('okButton');

  deleteButton.addEventListener('click', function () {
    modal.style.display = 'block';
  });

  cancelButton.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  okButton.addEventListener('click', function () {
    // Perform delete operation here
    modal.style.display = 'none';
  });
});
