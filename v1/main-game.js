function game() {
  let aZZ = Number($("aZZ").value); // anzahlZufallsZahlen
  {
    // Get a reference to the parent element
    const parentElement = $("div-span-wrap");
    // Loop through and remove all child nodes
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
  }

  for (let i = 0; i < aZZ; i++) {
    const newSpan = document.createElement("span");
    newSpan.setAttribute("class", "zz");

    $("div-span-wrap").appendChild(newSpan);
  }

  {
    for (let i = 0; i < aZZ; i++) {
      document.getElementsByClassName("zz")[i].hidden = false;
    }
  }

  const arryOfSecretNumbers = [];

  for (let i = 0; i < aZZ; i++) {
    const xi = Math.floor(Math.random() * 100);
    console.log(xi);
    document.getElementsByClassName("zz")[i].innerHTML = `${xi}`;
    arryOfSecretNumbers.push(xi);
  }
  console.log(arryOfSecretNumbers);

  // Zufallszahlen nach 3 sec ausblenden

  let i = document.getElementsByClassName("zz").length - 1;

  const interval = setInterval(() => {
    console.log(document.getElementsByClassName("zz").length);
    console.log(i);

    if (i >= 0) {
      document.getElementsByClassName("zz")[i].hidden = true;
      i--;
      console.log(i);
    } else {
      clearInterval(interval);
    }
  }, 2000);

  // Zufallszahl mit Eingabewert vergleichen
  //
}

$("btn-send").addEventListener("click", vergleich);

document.addEventListener("", function (e) {
  if (e.keyCode === 13) {
    vergleich;
  }
});
function vergleich() {
  console.log($("input").value);
  if ($("input").value === "") {
    alert("Bitte Schätzung eingeben!");
    return;
  }
  let meinTip = Number($("input").value);
  $("input").value = "";

  if (arryOfSecretNumbers.includes(meinTip)) {
    $("ergebnis").innerHTML = "Richtig";
    arryOfSecretNumbers.splice(arryOfSecretNumbers.indexOf(meinTip), 1);
    console.log(arryOfSecretNumbers);

    if (arryOfSecretNumbers.length === 0) {
      alert("Alle Zahlen gewusst");
      return;
    }
    return;
  }

  document.getElementById(
    "ergebnis"
  ).innerText = `Falsch! Richtig wäre ${arryOfSecretNumbers.toString()}`;
}
// Querry Function
function $(str) {
  return document.getElementById(str);
}

document.addEventListener("dblclick", (e) => {
  $("body-com").style.position = "relative";
  $("body-com").style.left = `${e.pageX}px`;
  console.log(e.pageX);
  $("body-com").style.top = `${e.pageY}px`;
});
