//
let arryOfSecretNumbers = [];

function game() {
  // Arry leeren falls das vorhergehende Spiel nicht beendet wurde und somit das Arry nicht leer ist
  arryOfSecretNumbers = [];

  // DefaultValue für Anzahl Zufallszahlen
  let aZZ = 3;
  if (Number($("aZZ").value)) {
    aZZ = Number($("aZZ").value); // Eingabewert für Anzahl Zufallszahlen übernehmen
  }

  // vorhandene Span Elemente aus vorangegangenen Spielen zurücksetzen
  {
    // Get a reference to the parent element
    const parentElement = $("div-span-wrap");
    // Loop through and remove all child nodes
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
  }

  // leere Spanelemente erzeugen
  {
    for (let i = 0; i < aZZ; i++) {
      const newSpan = document.createElement("span");
      newSpan.setAttribute("class", "zz");

      $("div-span-wrap").appendChild(newSpan);
    }
  }

  // Attribute hidden = false setzen
  {
    $("div-span-wrap").hidden = false;

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

  const interval = setInterval(() => {
    if (aZZ > 0) {
      document.getElementsByClassName("zz")[aZZ - 1].hidden = true;
      aZZ--;
      if (aZZ === 0) {
        $("div-span-wrap").hidden = true;
        $("input-vermutung").focus();
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
    $("ergebnis").innerText = "Richtig";
    arryOfSecretNumbers.splice(arryOfSecretNumbers.indexOf(meinTip), 1);
    console.log(arryOfSecretNumbers);

    if (arryOfSecretNumbers.length === 0) {
      setTimeout(() => {
        alert("Alle Zahlen gewusst");

        const jsConfetti = new JSConfetti();

        for (let i = 0; i < 2; i++) {
          setTimeout(() => {
            jsConfetti.addConfetti();
          }, i * 2_000);
        }
      }, 0);
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

$("input-vermutung").addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    vergleich();
  }
});

$("aZZ").addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    game();
    $("aZZ").value = "";
  }
});
