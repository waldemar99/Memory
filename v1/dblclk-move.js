document.addEventListener("dblclick", (e) => {
  console.log(e.target);
  if (!($("body-complete") === e.target || $("div-wrap") === e.target)) {
    $("body-complete").style.position = "absolute";
    $("body-complete").style.left = `${e.pageX}px`;
    console.log(e.pageX);
    $("body-complete").style.top = `${e.pageY}px`;
    return;
  }
});
