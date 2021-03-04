if (process.client && "Notification" in window) {
  Notification.requestPermission();
}
