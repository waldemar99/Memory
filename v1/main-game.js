//
const arryOfSecretNumbers = [];

function game() {
  let aZZ = 3; // anzahlZufallsZahlen
  if (Number($("aZZ").value)) {
    aZZ = Number($("aZZ").value); // anzahlZufallsZahlen
  }

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
  $("div-span-wrap").hidden = false;

  {
    for (let i = 0; i < aZZ; i++) {
      document.getElementsByClassName("zz")[i].hidden = false;
    }
  }

  for (let i = 0; i < aZZ; i++) {
    const xi = Math.floor(Math.random() * 100);
    document.getElementsByClassName("zz")[i].innerHTML = `${xi}`;
    arryOfSecretNumbers.push(xi);
  }
  console.log(arryOfSecretNumbers);

  // Zufallszahlen nach 3 sec ausblenden

  let i = document.getElementsByClassName("zz").length - 1;

  const interval = setInterval(() => {
    if (i >= 0) {
      document.getElementsByClassName("zz")[i].hidden = true;
      i--;
      if (i === -1) {
        $("div-span-wrap").hidden = true;
      }
    } else {
      clearInterval(interval);
    }
  }, 3_000);
}

function vergleich() {
  if (!$("input-vermutung").value) {
    alert("Bitte Schätzung eingeben!");
    return;
  }

  let meinTip = Number($("input-vermutung").value);
  $("input-vermutung").value = "";

  if (arryOfSecretNumbers.includes(meinTip)) {
    $("ergebnis").innerHTML = "Richtig";
    arryOfSecretNumbers.splice(arryOfSecretNumbers.indexOf(meinTip), 1);
    console.log(arryOfSecretNumbers);

    if (arryOfSecretNumbers.length === 0) {
      (() => {
        alert("Alle Zahlen gewusst");
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
      })();
      return;
    }
    return;
  } else {
    document.getElementById(
      "ergebnis"
    ).innerText = `Falsch! Richtig wäre ${arryOfSecretNumbers.toString()}`;

    return;
  }
}

$("btn-send").addEventListener("click", vergleich);

document.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    vergleich();
  }
});
