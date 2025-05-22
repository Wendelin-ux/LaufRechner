let mode = 'paceToSpeed'; // Andere: speedToPace, distanceTime

function setMode(newMode) {
    mode = newMode;
  
    // Alle Inputs verstecken
    document.getElementById('paceToSpeed').style.display = 'none';
    document.getElementById('speedToPace').style.display = 'none';
    document.getElementById('distanceTime').style.display = 'none';
  
    // Aktuellen sichtbar machen
    document.getElementById(newMode).style.display = 'block';
  
    // Alle Buttons deaktivieren
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + newMode).classList.add('active');
  
    // Ergebnis zurücksetzen
    document.getElementById('result').innerText = 'Ergebnis: --';
  }  

function calculate() {
  if (mode === 'paceToSpeed') {
    const min = parseFloat(document.getElementById('minutes').value) || 0;
    const sec = parseFloat(document.getElementById('seconds').value) || 0;
    const totalMinutes = min + sec / 60;

    if (totalMinutes <= 0) {
      document.getElementById('result').innerText = "Bitte gültige Werte eingeben";
      return;
    }

    const kmh = 60 / totalMinutes;
    document.getElementById('result').innerText = `Geschwindigkeit: ${kmh.toFixed(2)} km/h`;

  } else if (mode === 'speedToPace') {
    const kmh = parseFloat(document.getElementById('kmh').value);

    if (!kmh || kmh <= 0) {
      document.getElementById('result').innerText = "Bitte gültige Geschwindigkeit eingeben";
      return;
    }

    const totalMinutes = 60 / kmh;
    const min = Math.floor(totalMinutes);
    const sec = Math.round((totalMinutes - min) * 60);

    document.getElementById('result').innerText = `Pace: ${min}:${sec.toString().padStart(2, '0')} min/km`;

  } else if (mode === 'distanceTime') {
    const dist = parseFloat(document.getElementById('distance').value);
    const min = parseFloat(document.getElementById('timeMin').value) || 0;
    const sec = parseFloat(document.getElementById('timeSec').value) || 0;
    const totalMinutes = min + sec / 60;

    if (!dist || dist <= 0 || totalMinutes <= 0) {
      document.getElementById('result').innerText = "Bitte gültige Distanz und Zeit eingeben";
      return;
    }

    const paceMin = totalMinutes / dist;
    const paceMinPart = Math.floor(paceMin);
    const paceSec = Math.round((paceMin - paceMinPart) * 60);

    const kmh = (dist / totalMinutes) * 60;

    document.getElementById('result').innerText = `Pace: ${paceMinPart}:${paceSec.toString().padStart(2, '0')} min/km, Geschwindigkeit: ${kmh.toFixed(2)} km/h`;
  }
}

// Modus beim Start setzen
setMode('paceToSpeed');
