export const showNotification = (message, type = 'success') => {
  const notificationModal = document.createElement('div');
  notificationModal.className = 'notification-modal';
  notificationModal.innerHTML = `
    <div class="notification-content ${type}">
      <p>${message}</p>
      <button class="close-btn">×</button>
    </div>
  `;

  // Append the modal to the body
  document.body.appendChild(notificationModal);

  // Close the modal when the close button is clicked
  const closeButton = notificationModal.querySelector('.close-btn');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(notificationModal);
  });

  // Automatically close the modal after 3 seconds
  setTimeout(() => {
    if (document.body.contains(notificationModal)) {
      document.body.removeChild(notificationModal);
    }
  }, 3000);
};

// Add modern CSS styles
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .notification-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 400px;
      padding: 20px;
    }
    .notification-content {
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
      position: relative;
      width: 100%;
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
    }
    .close-btn:hover {
      color: red;
    }
  </style>
`);
