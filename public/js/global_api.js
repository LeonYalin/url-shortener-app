window.addEventListener("load", function () {
  const globalToast = bootstrap.Toast.getOrCreateInstance("#global-toast");
  const globalModal = new bootstrap.Modal("#global-modal");
  let modalOkCallback = null;
  document
    .getElementById("global-modal-ok-btn")
    .addEventListener("click", (e) => {
      globalModal.hide();
      if (modalOkCallback && typeof modalOkCallback === "function") {
        modalOkCallback(e);
      }
    });

  const GlobalApi = {
    Toast: {
      show(msg) {
        document.getElementById("global-toast-body").innerText = msg;
        globalToast.show();
      },
    },
    Modal: {
      show(title, msg, callback) {
        modalOkCallback = callback;
        document.getElementById("global-modal-title").innerText = title;
        document.getElementById("global-modal-body").innerText = msg;
        globalModal.show();
      },
    },
    Flash: {
      show({ level, msg }) {
        switch (level) {
          case "success":
            GlobalApi.Toast.show(msg);
            break;
          case "info":
            GlobalApi.Toast.show(msg);
            break;
          case "error":
            GlobalApi.Toast.show(msg);
            break;
          default:
            break;
        }
      },
    },
  };
  this.window.GlobalApi = GlobalApi;
});
