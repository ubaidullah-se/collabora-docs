export function goToElement(elementSelector: string) {
  document
    .querySelector(elementSelector)
    ?.scrollIntoView({ behavior: "smooth" });
}

export function lockBodyScroll(value: boolean) {
  document.querySelector("body")!.style.overflow = value ? "hidden" : "";
}
