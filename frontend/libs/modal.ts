function closeModal() {
  const overlay = document.querySelector("[data-overlay]");
  const target = document.querySelector(
    "div[data-togglebtn]"
  ) as HTMLDivElement;
  if (target && target.classList.contains("modal-open"))
    target.classList.remove("modal-open");
  overlay.classList.remove("overlay-show");
  const div = document.querySelector("div.btn");
  const links = div.parentElement.querySelectorAll("a");
  links.forEach((link) => {
    link.removeAttribute("style");
  });
}

function toggleModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  const overlay = document.querySelector("div[data-overlay]");
  const target = document.querySelector(
    "div[data-togglebtn]"
  ) as HTMLDivElement;
  if (target && target.classList.contains("modal-open")) {
    target.classList.remove("modal-open");
  } else if (target) {
    target.classList.add("modal-open");
  }
  if (overlay.classList.contains("overlay-show")) {
    overlay.classList.remove("overlay-show");
    const div = e.target as HTMLDivElement;
    const links = div.parentElement.querySelectorAll("a");
    links.forEach((link) => {
      link.removeAttribute("style");
    });
  } else {
    overlay.classList.add("overlay-show");
    const div = e.target as HTMLDivElement;
    const links = div.parentElement.querySelectorAll("a");
    links.forEach((link, index) => {
      link.style.opacity = "1";
      link.style.top = `${index * 50 + 50}px`;
      link.style.zIndex = "1001";
      link.style.pointerEvents = "all";
    });
  }
}

export { closeModal, toggleModal };
