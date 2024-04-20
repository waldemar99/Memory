document.addEventListener("dblclick", (e) => {
  if (!($("body-complete") === e.target)) {
    {
      $("body-complete").style.position = "relative";
      $("body-complete").style.left = `${e.pageX}px`;
      console.log(e.pageX);
      $("body-complete").style.top = `${e.pageY}px`;
      return;
    }
  }
});
// console.log($("body-complete").children);
