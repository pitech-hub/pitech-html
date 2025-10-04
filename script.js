// Fungsi untuk menangani tombol Emergency Stop
function toggleEmergencyStop() {
  const button = document.getElementById('emergencyStopButton');
  
  // Toggle status aktif atau tidak
  button.classList.toggle('active');
  //button.classList.add('active');
  // Menambahkan logika berdasarkan status tombol
  if (button.classList.contains('active')) {
    console.log('Emergency Stop Activated');
    button.textContent = "EMERGENCY STOP PRESSED"; // Ubah teks tombol
    // Kirim angka 1 ke Node-RED ketika Emergency Stop diaktifkan
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(enskrip1 + "EMG=0");
    } else {
      console.log("WebSocket is not open.");
    }
  } else {

  }
}

// Fungsi untuk melepaskan Emergency Stop (mouse up)
function releaseEmergencyStop() {
    const button = document.getElementById('emergencyStopButton');
  
   // button.classList.remove('active');
  // Menambahkan logika berdasarkan status tombol
  if (button.classList.contains('active')) {

  } else {
    console.log('EMERGENCY STOP RELEASED');
    button.textContent = "EMERGENCY STOP RELEASED";
    // Kirim angka 0 ke Node-RED ketika Emergency Stop dilepas
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(enskrip1 + "EMG=1");
    } else {
      console.log("WebSocket is not open.");
    }
  }
}

function generateUniqueCode() {
  // Membuat kode acak unik dengan panjang 8 karakter
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueCode = '';
  for (let i = 0; i < 8; i++) {
    uniqueCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return uniqueCode;
}

function formatDateTime(date) {
  // Format tanggal dan waktu tanpa spasi dengan menggunakan titik dua sebagai pemisah
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
var enskrip1;
const controlSwitchCONTROL = document.getElementById('controlOnOff');
controlSwitchCONTROL.addEventListener('change', async function () {
  
  if (safetyswitch === "1") {
    if (this.checked) {
      var currentDateTime = new Date(); // Ambil tanggal dan waktu saat ini
      var formattedDateTime = formatDateTime(currentDateTime); // Format tanggal dan waktu
      var uniqueCode = generateUniqueCode(); // Buat kode unik
      var enskrip = `#${uniqueCode}#${formattedDateTime}#`; // Gabungkan data enkripsi
      enskrip1 = enskrip;
      sendMessageToWS2(`CNTRL=1${enskrip}`); // Kirim data saat switch ON
      openWebSocket(); // Buka WebSocket
      
    } else {
      sendMessageToWS2(`CNTRL=0${enskrip1}`); // Kirim data saat switch OFF
      closeWebSocket(); // Tutup WebSocket
    }
  } else {
    alert("Cannot change the switch."); // Tampilkan peringatan jika WebSocket tidak siap
    this.checked = !this.checked; // Kembalikan switch ke keadaan sebelumnya
  }
});



// (mouse down)
function buzzerstophmidown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "BZRSTOPHMI=1");
    console.log('Operation Signal Sent');
  } else {
    console.log("WebSocket is not open.");
  }
  buzzerstophmi.classList.add("active");
}

//(mouse up)
function buzzerstophmiup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "BZRSTOPHMI=0");
    console.log('Operation Released');
  } else {
    console.log("WebSocket is not open.");
  }
  buzzerstophmi.classList.remove("active");
}  

// (mouse down)
function resethmidown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "RSTHMI=1");
    console.log('Operation Signal Sent');
  } else {
    console.log("WebSocket is not open.");
  }
  resethmi.classList.add("active");
}

//(mouse up)
function resethmiup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "RSTHMI=0");
    console.log('Operation Released');
  } else {
    console.log("WebSocket is not open.");
  }
  resethmi.classList.remove("active");
} 

// (mouse down)
function operationrdown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "OPR=1");
  } else {
    console.log("WebSocket is not open.");
  }
}

//(mouse up)
function operationrup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "OPR=0");
  } else {
    console.log("WebSocket is not open.");
  }
}  



// (mouse down)
function stopdown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "STOP=1");
  } else {
    console.log("WebSocket is not open.");
  }
  StopButton.classList.add("active");
}

//(mouse up)
function stopup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "STOP=0");
  } else {
    console.log("WebSocket is not open.");
  }
  StopButton.classList.remove("active");
}  


// (mouse down)
function TRYbtndown() {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(enskrip1 + "TRY=1");
      console.log('Operation Signal Sent');
    } else {
      console.log("WebSocket is not open.");
    }
    TRYButton.classList.add("active");
  }

//(mouse up)
function TRYbtnup() {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(enskrip1 + "TRY=0");
      console.log('Operation Released');
    } else {
      console.log("WebSocket is not open.");
    }
    TRYButton.classList.remove("active");
  }  
  
let trynozzle = "UP";
const controlSwitchtryUpDown = document.getElementById('tryUpDown');
controlSwitchtryUpDown.addEventListener('change', function () {
    if (this.checked) {
      trynozzle = "DOWN";
    } else {
      trynozzle = "UP";
    }
});  

  
// (mouse down)
function tryNozzledown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "TRY" + trynozzle + "=1");
  } else {
    console.log("WebSocket is not open.");
  }
  tryNozzleButton.classList.add("active");
}

//(mouse up)
function tryNozzleup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "TRY" + trynozzle + "=0");
  } else {
    console.log("WebSocket is not open.");
  }
  tryNozzleButton.classList.remove("active");
}  
const tryButton = document.getElementById("tryButton");
const TRYButton = document.getElementById("TRYButton");
const tryNozzleButton = document.getElementById("tryNozzleButton");
const buttonasc = document.getElementById("ascentButton");
const slowascentButton = document.getElementById("slowascentButton");
const StopButton = document.getElementById("StopButton");
const ejectorButton = document.getElementById("ejectorButton");
const descentButton = document.getElementById("descentButton");
const slowdescentButton = document.getElementById("slowdescentButton");
const bolsterinButton = document.getElementById("bolsterinButton");
const bolsterrtcButton = document.getElementById("bolsterrtcButton");
const balancedescentButton = document.getElementById("balancedescentButton");
const bolsteroutButton = document.getElementById("bolsteroutButton");
const bolsterrevButton = document.getElementById("bolsterrevButton");
const sidecoreButton = document.getElementById("sidecoreButton");
const buzzerstophmi = document.getElementById("buzzerstophmi");
const resethmi = document.getElementById("resethmi");

// (mouse down)
function ascentdown() {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(enskrip1 + "ASC=1");
        console.log("Operation Signal Sent");
    } else {
        console.log("WebSocket is not open.");
    }
    // Ganti warna tombol menjadi hijau
    buttonasc.classList.add("active");
}

// (mouse up)
function ascentup() {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(enskrip1 + "ASC=0");
        console.log("Operation Released");
    } else {
        console.log("WebSocket is not open.");
    }
    // Ganti warna tombol menjadi abu
    buttonasc.classList.remove("active");
}

  

// (mouse down)
function slowascentdown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "SASC=1");
    console.log('Operation Signal Sent');
  } else {
    console.log("WebSocket is not open.");
  }
  slowascentButton.classList.add("active");
}

//(mouse up)
function slowascentup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "SASC=0");
    console.log('Operation Released');
  } else {
    console.log("WebSocket is not open.");
  }
  slowascentButton.classList.remove("active");
}  

let ejector = "DOWN";
const controlSwitchejector = document.getElementById('ejector');
controlSwitchejector.addEventListener('change', function () {
    if (this.checked) {
      ejector = "UP";
    } else {
      ejector = "DOWN";
    }
});  

  
// (mouse down)
function ejectordown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "EJC" + ejector + "=1");
  } else {
    console.log("WebSocket is not open.");
  }
  ejectorButton.classList.add("active");
}

//(mouse up)
function ejectorup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "EJC" + ejector + "=0");
  } else {
    console.log("WebSocket is not open.");
  }
  ejectorButton.classList.remove("active");
}  


// (mouse down)
function descentdown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "DESC=1");
    console.log('Operation Signal Sent');
  } else {
    console.log("WebSocket is not open.");
  }
  descentButton.classList.add("active");
}

//(mouse up)
function descentup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "DESC=0");
    console.log('Operation Released');
  } else {
    console.log("WebSocket is not open.");
  }
  descentButton.classList.remove("active");
}  


// (mouse down)
function slowdescentdown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "SDESC=1");
    console.log('Operation Signal Sent');
  } else {
    console.log("WebSocket is not open.");
  }
  slowdescentButton.classList.add("active");
}

//(mouse up)
function slowdescentup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "SDESC=0");
    console.log('Operation Released');
  } else {
    console.log("WebSocket is not open.");
  }
  slowdescentButton.classList.remove("active");
}  


// (mouse down)
function bolsterindown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "BLTIN=1");
    console.log('Operation Signal Sent');
  } else {
    console.log("WebSocket is not open.");
  }
  bolsterinButton.classList.add("active");
}

//(mouse up)
function bolsterinup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "BLTIN=0");
    console.log('Operation Released');
  } else {
    console.log("WebSocket is not open.");
  }
  bolsterinButton.classList.remove("active");
}  

// (mouse down)
function bolsterrtcdown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "BLTRTC=1");
    console.log('Operation Signal Sent');
  } else {
    console.log("WebSocket is not open.");
  }
  bolsterrtcButton.classList.add("active");
}

//(mouse up)
function bolsterrtcup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "BLTRTC=0");
    console.log('Operation Released');
  } else {
    console.log("WebSocket is not open.");
  }
  bolsterrtcButton.classList.remove("active");
}  


// (mouse down)
function balancedescentButtondown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "BLNDESC=1");
    console.log('Operation Signal Sent');
  } else {
    console.log("WebSocket is not open.");
  }
  balancedescentButton.classList.add("active");
}

//(mouse up)
function balancedescentButtonup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "BLNDESC=0");
    console.log('Operation Released');
  } else {
    console.log("WebSocket is not open.");
  }
  balancedescentButton.classList.remove("active");
}  


// (mouse down)
function bolsteroutdown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "BLTOUT=1");
    console.log('Operation Signal Sent');
  } else {
    console.log("WebSocket is not open.");
  }
  bolsteroutButton.classList.add("active");
}

//(mouse up)
function bolsteroutup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "BLTOUT=0");
    console.log('Operation Released');
  } else {
    console.log("WebSocket is not open.");
  }
  bolsteroutButton.classList.remove("active");
}  


// (mouse down)
function bolsterrevdown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "BLTREV=1");
    console.log('Operation Signal Sent');
  } else {
    console.log("WebSocket is not open.");
  }
  bolsterrevButton.classList.add("active");
}

//(mouse up)
function bolsterrevup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "BLTREV=0");
    console.log('Operation Released');
  } else {
    console.log("WebSocket is not open.");
  }
  bolsterrevButton.classList.remove("active");
}  

const controlSwitchADHESION = document.getElementById('adhesionsensor');
controlSwitchADHESION.addEventListener('click', function () {
    console.log(`ADHESION: Clicked, Checked = ${this.checked}`);
    if (this.checked) {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(enskrip1 + "ADH=1");
        } else {
            console.log("WebSocket is not open.");
        }
    } else {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(enskrip1 + "ADH=0");
        } else {
            console.log("WebSocket is not open.");
        }
    }
});

const controlSwitchLIGHT = document.getElementById('light');
controlSwitchLIGHT.addEventListener('click', function () {
    console.log(`LIGHT: Clicked, Checked = ${this.checked}`);
    if (this.checked) {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(enskrip1 + "LIGHT=1");
        } else {
            console.log("WebSocket is not open.");
        }
    } else {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(enskrip1 + "LIGHT=0");
        } else {
            console.log("WebSocket is not open.");
        }
    }
});

let sidecore = "A";
const controlSwitchsidecore = document.getElementById('sidecore');
controlSwitchsidecore.addEventListener('change', function () {
    if (this.checked) {
      sidecore = "B";
    } else {
      sidecore = "A";
    }
});  

  
// (mouse down)
function sidecoredown() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 +"SDC" + sidecore + "=1");
  } else {
    console.log("WebSocket is not open.");
  }
  sidecoreButton.classList.add("active");
}

//(mouse up)
function sidecoreup() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(enskrip1 + "SDC" + sidecore + "=0");
  } else {
    console.log("WebSocket is not open.");
  }
  sidecoreButton.classList.remove("active");
}  

// (mouse down)
function buttontrydown() {
  sendMessageToWS1(enskrip1 + "try" + trybtn + "=1");
  tryButton.classList.add("active");
}

//(mouse up)
function buttontryup() {
  sendMessageToWS1(enskrip1 + "try" + trybtn + "=0");
  tryButton.classList.remove("active");
}  

let ws = null;
// Fungsi untuk membuka koneksi WebSocket
function openWebSocket() {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    ws = new WebSocket("ws://localhost:1880/ws1/sanki1/10.6.177.0");

    // Menangani status koneksi WebSocket
    ws.onopen = function() {
      console.log("WebSocket connection established.");
    };

    ws.onclose = function() {
      console.log("WebSocket connection closed.");
    };

    ws.onerror = function(error) {
      console.log("WebSocket error: " + error);
    };

    ws.onmessage = function(message) {
      console.log("Received message: ", message.data);
    };
  }
}

// Fungsi untuk menutup koneksi WebSocket
function closeWebSocket() {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    ws.close();
  }
}

// Mengirim pesan melalui WebSocket
function sendMessageToWS1(data) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(data);
    //console.log(data);
  } else {
    console.warn("WebSocket 1 is not open");
  }
}

let safetyswitch = "0";

const ws2 = new WebSocket("ws://localhost:1880/ws2/sanki1/10.6.177.0");

// Event handler untuk WebSocket
ws2.onopen = () => {
  console.log("WebSocket2 connection established.");
};

// Mengirim pesan melalui WebSocket
function sendMessageToWS2(data) {
  if (ws2.readyState === WebSocket.OPEN) {
    ws2.send(data);
    //console.log(data);
  } else {
    console.warn("WebSocket 1 is not open");
  }
}

let capasity;

ws2.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    console.log(data);

    // Ambil data dari respons
    const statusMesin = data.CpuRun;
    const reverseStatus = data.ReverseMelodySound;
    const tableStatus = data.TableMelodySound || "0";
    const descentStatus = data.DescentAlarmSound || "0";
    const operationready = data.OperationReady;
    const slidePosition = data.SlidePosition;
    const upperLimit = data.UpperLimit;
    const slowDescent = data.SlowDescent;
    const lowerLimit = data.LowerLimit;
    const pressure = data.Pressure;
    const setPressure = data.SetPressure;
    const oilTemp = data.OilTemp;
    const safetySwitch = data.SafetySwitch;
    const clientfull = data.clientfull;

    // Update elemen tampilan untuk lampu/status
    const lampu = document.getElementById('lampu');
    const table = document.getElementById('table');
    const reverse = document.getElementById('reverse');
    const descent = document.getElementById('descent');
    const safetyswitchlamp = document.getElementById('safetyswitchlamp');
    const readyButton = document.getElementById('operationButton');
    const offButton = document.getElementById('operationOffButton');
  

    const updateStatus = (element, status) => {
      if (!element) return; // Jika elemen tidak ditemukan, hentikan
      if (status === "1") {
        element.classList.add('active'); // Menyalakan lampu (warna kuning)
        element.classList.remove('inactive');
      } else {
        element.classList.add('inactive'); // Mematikan lampu (warna abu-abu)
        element.classList.remove('active');
      }
    };

    if (operationready === "1"){
      readyButton.classList.add('active');
      offButton.classList.remove('active');
    } else {
      offButton.classList.add('active');
      readyButton.classList.remove('active');
    }

    if (clientfull === "1"){
      capasity = clientfull; // Perbarui status terakhir
      alert ("Full Client Access Restricted");
    } else {
      capasity = "0";
    }

    if (safetySwitch !== safetyswitch) {
      // Hanya jalankan logika jika status berubah
      if (safetySwitch === "1") {
        
      } else {
        // Tambahan logika untuk mengatur controlOnOff ke posisi off
        if (controlSwitchCONTROL.checked) {
          controlSwitchCONTROL.checked = false; // Matikan switch
          sendMessageToWS2("CNTRL=0");
          //console.log("CNTRL=0 sent via WebSocket karena safetyswitch berubah ke OFF.");
          //console.log("Status Mesin berubah ke OFF.");
          closeWebSocket();
        }
      }
      safetyswitch = safetySwitch; // Perbarui status terakhir
    } else {
      // Tidak ada perubahan, tidak ada tindakan
     // console.log("Status Mesin tidak berubah. Tidak ada tindakan.");
    }   

    // Perbarui status elemen-elemen
    updateStatus(lampu, statusMesin);
    updateStatus(table, tableStatus);
    updateStatus(reverse, reverseStatus);
    updateStatus(descent, descentStatus);
    updateStatus(safetyswitchlamp, safetySwitch);

    // Update elemen untuk menampilkan angka
    document.getElementById('numerikValue').textContent = slidePosition || "0.0 mm";
    document.getElementById('numerikValue1').textContent = upperLimit || "0.0 mm";
    document.getElementById('numerikValue2').textContent = slowDescent || "0.0 mm";
    document.getElementById('numerikValue3').textContent = lowerLimit || "0.0 mm";
    document.getElementById('numerikValue6').textContent = pressure || "0 kN";
    document.getElementById('numerikValue4').textContent = setPressure || "0 kN";
    document.getElementById('numerikValue5').textContent = oilTemp || "0.0 °C";

    //console.log('Data updated from WebSocket2:', data); // Debug: cek data di konsol
  } catch (error) {
    console.error("Error parsing WebSocket2 data:", error);
  }
};

ws2.onerror = (error) => {
  console.error("WebSocket2 error:", error);
};

ws2.onclose = () => {
  console.log("WebSocket2 connection closed.");
};


/**///////////////////////////////////////////
const knob = document.getElementById('knob');
const displayValue = document.getElementById('potensioValue');
const container = document.querySelector('.potensio');

let isDragging = false;
let currentAngle = 240; // Sudut awal (240 derajat untuk nilai 0)
let lastAngle = 240; // Menyimpan sudut sebelumnya
const MIN_ANGLE = 240; // Sudut minimum (nilai 0)
const MAX_ANGLE = 480; // Sudut maksimum (nilai 100)

// Fungsi untuk menghitung sudut berdasarkan posisi mouse
function calculateAngle(event) {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    return angle;
}

// Fungsi untuk memetakan sudut ke nilai potensiometer
function mapAngleToValue(angle) {
    const normalizedAngle = Math.max(MIN_ANGLE, Math.min(angle, MAX_ANGLE)); // Batas sudut
    return Math.round(((normalizedAngle - MIN_ANGLE) / (MAX_ANGLE - MIN_ANGLE)) * 100);
}

// Event listener untuk memulai putaran
knob.addEventListener('mousedown', () => {
    isDragging = true;
});


// Event listener untuk menghentikan putaran
document.addEventListener('mouseup', () => {
    isDragging = false;
});

let datapot ;
// Event listener untuk memutar knob
document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const angle = calculateAngle(event);

        // Menghitung arah putaran
        let angleDiff = angle - lastAngle;

        // Menghindari lompatan besar antara 0 dan 360
        if (angleDiff > 180) {
            angleDiff -= 360;
        } else if (angleDiff < -180) {
            angleDiff += 360;
        }

        currentAngle += angleDiff;
        lastAngle = angle;

        // Membatasi sudut
        if (currentAngle > MAX_ANGLE) {
            currentAngle = MAX_ANGLE;
        } else if (currentAngle < MIN_ANGLE) {
            currentAngle = MIN_ANGLE;
        }

        // Menghitung nilai potensiometer
        const value = mapAngleToValue(currentAngle);

        // Memperbarui posisi knob
        knob.style.transform = `translate(-50%, -40px) rotate(${currentAngle}deg)`;

        // Menampilkan nilai
        /*displayValue.textContent = value;*/
       
        if (value != datapot){
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(enskrip1 + "MBP=" + datapot);          
          } else {
            console.log("WebSocket is not open.");
          }
          datapot = value;
        }
        
        updateSliderWithPotensio(value); // Update slider

       
    }
});

/* ------------------------------------ */

// Track the currently clicked box
let currentBox = null;

// Open the popup
function openPopup(box) {
  currentBox = box; // Store the clicked box
  const popup = document.getElementById("popup");
  const numericalInput = document.getElementById("numericalInput");
  const infoMinMax = document.getElementById("info-min-max");

  // Update min/max info dynamically
  infoMinMax.textContent = "Enter a value between 100 and 2100:";

  // Pre-fill the input with the current value (remove "mm" text if it exists)
  numericalInput.value = parseFloat(box.innerText);
  popup.style.display = "flex";
}

// Close the popup
function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

// Validate input as user types
document.getElementById("numericalInput").addEventListener("input", function (event) {
  const value = event.target.value;

  // Cek apakah ada lebih dari 1 angka di belakang koma
  if (!/^\d{0,4}(\.\d{0,1})?$/.test(value)) {
    event.target.value = value.slice(0, -1); // Hapus karakter terakhir jika tidak valid
  }
});
// Set the new value
function setValue() {
  const numericalInput = document.getElementById("numericalInput");
  let newValue = numericalInput.value;

  // Validasi format: pastikan memiliki koma dan maksimal 4 digit sebelum koma serta 1 angka setelah koma
  if (!/^\d{1,4}\.\d{1}$/.test(newValue)) {
    alert("Value must be in the format 'xxxx.x' (4 digits max before the decimal point and 1 digit after).");
    return;
  }

  // Konversi ke float untuk validasi rentang nilai
  let floatValue = parseFloat(newValue);

  if (floatValue < 100 || floatValue > 2100) {
    alert("Value must be between 100.0 and 2100.0."); // Show alert if out of range
    return;
  }

  if (currentBox) {
    currentBox.innerText = `${newValue} mm`; // Update the box value
    
    // Determine the key based on the label
    let key = '';
    const label = currentBox.previousElementSibling.innerText.trim(); // Get the label text
 
    if (label === 'UPPER LIMIT') {
      key = 'UP';
    } else if (label === 'SLOW DESCENT') {
      key = 'SD';
    } else if (label === 'LOWER LIMIT') {
      key = 'LL';
    }
 
    // Send the key and value via WebSocket
    if (key && ws.readyState === WebSocket.OPEN) {
      ws.send(enskrip1 + `${key}=${newValue}`);
      //console.log(`WebSocket sent: ${key}=${newValue}`);
    } else if (ws.readyState !== WebSocket.OPEN) {
      console.log("WebSocket is not open.");
    }
  }

  closePopup(); // Close the popup
}

// Track the currently clicked box
let currentBox2 = null;

// Open the popup
function openPopup2(box) {
  currentBox2 = box; // Store the clicked box
  const popup = document.getElementById("popup2");
  const numericalInput = document.getElementById("numericalInput2");
  const infoMinMax = document.getElementById("info-min-max2");

  // Update min/max info dynamically
  infoMinMax.textContent = "Enter a value between 400 and 2000:";

  // Pre-fill the input with the current value (remove "mm" text if it exists)
  numericalInput.value = parseFloat(box.innerText);
  popup.style.display = "flex";
}

// Close the popup
function closePopup2() {
  const popup = document.getElementById("popup2");
  popup.style.display = "none";
}

document.getElementById("numericalInput2").addEventListener("keydown", function (event) {
  const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete"]; // Tombol yang diizinkan
  if (
    !allowedKeys.includes(event.key) && // Tombol kontrol
    (event.key < "0" || event.key > "9") // Hanya angka
  ) {
    event.preventDefault(); // Blokir input
  }

  const value = event.target.value;
  // Remove any non-numeric characters
  event.target.value = value.replace(/[^0-9]/g, "");

  // Restrict input to 4 digits
  if (event.target.value.length > 3) {
    event.target.value = event.target.value.slice(0, 3);
  }
});


// Set the new value
function setValue2() {
  const numericalInput = document.getElementById("numericalInput2");
  let newValue = parseFloat(numericalInput.value);

  // Pastikan nilai adalah bilangan bulat
  if (!Number.isInteger(newValue)) {
    alert("Only whole numbers are allowed.");
    return;
  }

  // Validate the value range
  if (newValue < 400 || newValue > 2000) {
    alert("Value must be between 400 and 2000."); // Show alert if out of range
    return;
  }

  if (currentBox2) {
    currentBox2.innerText = `${newValue} kN`; // Update the box value

    // Send the key and value via WebSocket
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(enskrip1 + `PS=${newValue}`);
    } else {
      console.log("WebSocket is not open.");
    }
  }

  closePopup2(); // Close the popup
}


//*------------------------------------- */

// Fungsi untuk memperbarui slider
function updateSliderWithPotensio(potensioValue) {
  // Validasi nilai potensio dalam rentang 0-100
  const minValue = 0;
  const maxValue = 100;
  const clampedValue = Math.min(Math.max(potensioValue, minValue), maxValue);

  // Hitung persentase untuk slider
  const percentage = (clampedValue / maxValue) * 100;

  // Update elemen slider
  const sliderFill = document.getElementById("sliderFill");
  const sliderThumb = document.getElementById("sliderThumb");

  sliderFill.style.width = `${percentage}%`;
  sliderThumb.style.left = `calc(${percentage}% - 10px)`; // -10px untuk posisi thumb agar tetap berada di tengah slider
}

// Contoh penggunaan dengan potensio
const potensioValueDisplay = document.getElementById("potensioValue");
let currentPotensioValue = 0; // Nilai potensio awal

/* -------------------------------------------- switch 3 state */

// Global state for switch
const states = ["OFF", "ON", "AUTO"];
let currentStateIndex = 0;
let trybtn = "OFF"
// Update the switch display
function updateSwitchState(index) {
  const switchElement = document.getElementById('threeStateSwitch');
  const knobText = document.getElementById('knobText1');
  const state = states[index];

  // Update the UI
  currentStateIndex = index;
  switchElement.setAttribute('data-state', state);
  knobText.textContent = state; // Update status text in the knob

  if (state == "OFF"){
    trybtn = "OFF";
  } else if (state == "ON"){
    trybtn = "ON";
  } else if (state == "AUTO"){
    trybtn = "AUTO";
  }
}

// Handle dragging logic
let startX = 0;
function startDrag(event) {
  startX = event.clientX;
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
}

function handleDrag(event) {
  const deltaX = event.clientX - startX;

  // Check the direction of drag
  if (deltaX > 30 && currentStateIndex < states.length - 1) {
    // Dragging to the right
    updateSwitchState(currentStateIndex + 1);
    stopDrag(); // Stop dragging after change
  } else if (deltaX < -30 && currentStateIndex > 0) {
    // Dragging to the left
    updateSwitchState(currentStateIndex - 1);
    stopDrag(); // Stop dragging after change
  }
}

function stopDrag() {
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
}

// Attach event listener for the knob to enable dragging
document.getElementById('knobText1').addEventListener('mousedown', startDrag);
