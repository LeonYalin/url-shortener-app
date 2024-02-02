window.addEventListener("load", function () {
  const toastLiveExample = document.getElementById("global-toast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  window.GlobalApi = {
    Toast: {
      show(msg) {
        document.getElementById("global-toast-body").innerText = msg;
        toastBootstrap.show();
      },
    },
  };
});
