const hide = () => {
  const menu = document.querySelector(".menu");
  const modal = document.querySelector("#modal");

  const btn = document.querySelector("#btn");
  let show = true;
  btn.addEventListener("click", function () {
    if (show === true) {
      menu.outerHTML = "";
      modal.outerHTML = "";
    }
  });
};

export { hide };
