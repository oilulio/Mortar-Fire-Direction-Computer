// TODO - currently assumed 8 figure grids, expand to 10.
// Mortar flight calcutaion is pure example.

const START_L1="MFDC2-MDP38";
const START_L2="225A-2F4B10A";
const START_L3="L16-L15(4/2)";

const DISPLAY_WIDTH=12;
var on=false;     // Device on
var firston=true; // Cold start message
var firstCountdown=0;
var shift=false;  // Shift key pressed
var timeOffset=0; // Seconds ahead of PC clock
var img;
var offsetX=5;  // Same as padding in img tag
var offsetY=5;
var temperature=21;  // Default.
var defaultText="MK 4 NO ML";
var countdown=0;

var tgt_grid=-1;
var tgt_alt=-1;
var tgt_desig="";

var grid=-1; // Location set by resection
var ml_grid=-1;
var ml_alt=-1;

// Finite State Machine states
const READY=0;
const STARTING1=100;
const STARTING2=101;
const STARTING3=102;
const RESECTION_GR1=1;
const RESECTION_BR1=2;
const RESECTION_GR2=3;
const RESECTION_BR2=4;
const RESECTION_GR3=5;
const RESECTION_BR3=6;
const RESECTION_CALC=7;
const RESECTION_FOUND=8;
const TEMP_UPDATE=9;
const TGT_GRID=10;
const TGT_ALT=11;
const TGT_NO=12;
const ML_GRID=13;
const ML_ALT=14;
const SHOW_ML_GRID=15;
const SHOW_ML_ALT=16;
const GET_GRID=17;
const GET_ALT=18;
const SOLUTION=19;
const SOLUTION_EL=20;
const COUNTDOWN=21;

var resect_gr1;
var resect_gr2;
var resect_gr3;
var resect_br1;
var resect_br2;
var resect_br3;

var state=STARTING1;
const TOO_NEAR="TGT TOO NEAR";
const OUT_RANGE="OUT OF RANGE";
const INVALID_KEY="INVALID KEY";
var keyboardInput="";

function start() {
  
var disp=document.getElementById('display');
disp.style.visibility='hidden';
shift=false;
on=false;

img = new Image;                          
img.onload = setup;
img.src = 'images/mfdc.webp';

return false;
}
function setup() {
  
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
img.usemap = document.getElementById("buttons");
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
//------------------------------------------------------------------

document.onkeydown= onKeyDown; 
function onKeyDown(evt){   // Give me some keyboard control (Enter, backspace,minus and 0-9)
  //if (true) { alert(evt.keyCode); }
  if (evt.keyCode==13) {RUN(); return false;}
  if (evt.keyCode==8)  {Back(); return false;}
  else if (evt.keyCode==189){Neg(); return false;}
  else if (evt.keyCode==48) {B0(); return false; }
  else if (evt.keyCode==49) {B1(); return false; }
  else if (evt.keyCode==50) {B2(); return false; }
  else if (evt.keyCode==51) {B3(); return false; }
  else if (evt.keyCode==52) {B4(); return false; }
  else if (evt.keyCode==53) {B5(); return false; }
  else if (evt.keyCode==54) {B6(); return false; }
  else if (evt.keyCode==55) {B7(); return false; }
  else if (evt.keyCode==56) {B8(); return false; }
  else if (evt.keyCode==57) {B9(); return false; }
}
//-------------FOLLOWING BLOCK AUTOGENERATED -------------------------
function overOn() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(10,140,100,80);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overRESET() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(42,888,87,86);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overGrid() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(38,253,90,89);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overTgts() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(38,344,90,89);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overSfty() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(130,344,90,89);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overMLs() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(222,344,90,89);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overShift() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(38,435,90,89);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overShot() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(406,435,90,89);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overNeg() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(222,526,90,89);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overML() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(314,526,90,89);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overBack() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(406,526,90,89);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overB0() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(155,889,95,90);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overB1() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(155,799,95,90);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overB2() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(277,799,95,90);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overB3() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(399,799,95,90);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overB4() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(155,709,95,90);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overB5() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(277,709,95,90);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overB6() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(399,709,95,90);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overB7() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(155,619,95,90);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overB8() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(277,619,95,90);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overB9() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(399,619,95,90);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function overRUN() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(399,889,95,90);
ctx.lineWidth=8;
ctx.strokeStyle = '#ff0000';
ctx.stroke();
}
function outOn() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(10,140,100,80);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outRESET() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(42,888,87,86);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outGrid() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(38,253,90,89);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outTgts() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(38,344,90,89);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outSfty() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(130,344,90,89);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outMLs() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(222,344,90,89);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outShift() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(38,435,90,89);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outShot() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(406,435,90,89);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outNeg() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(222,526,90,89);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outML() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(314,526,90,89);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outBack() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(406,526,90,89);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outB0() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(155,889,95,90);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outB1() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(155,799,95,90);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outB2() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(277,799,95,90);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outB3() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(399,799,95,90);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outB4() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(155,709,95,90);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outB5() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(277,709,95,90);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outB6() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(399,709,95,90);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outB7() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(155,619,95,90);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outB8() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(277,619,95,90);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outB9() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(399,619,95,90);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
function outRUN() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(399,889,95,90);
ctx.drawImage(img,offsetX,offsetY,540,1000);
}
//-----------------------END AUTOGEN -------------------------------
/*function startupMsg() {
  
if (firstCountdown>=STARTUP_MSG.length) {
  document.getElementById('maintext').textContent="MK 4 NO ML"; 
  state=READY;
} else {
  document.getElementById('maintext').textContent=
         STARTUP_MSG.substring(firstCountdown,firstCountdown+DISPLAY_WIDTH);
  firstCountdown+=1;
  setTimeout(startupMsg,300);
}
  
return false;  
}*/
//------------------------------------------------------------------
function startupMsg() {

if (state==STARTING1) {  
  document.getElementById('maintext').textContent=START_L1; 
  state=STARTING2;
  setTimeout(startupMsg,1000);
  return false;
} else if (state==STARTING2) {  
  document.getElementById('maintext').textContent=START_L2; 
  state=STARTING3;
  setTimeout(startupMsg,1000);
  return false;
} else if (state==STARTING3) {  
  document.getElementById('maintext').textContent=START_L3; 
  state=READY;
  setTimeout(backToReady,1000);
  return false;
}
return false;  
}
//------------------------------------------------------------------
function flightCountdown() {
  
countdown-=1;
if (countdown<0) { // Device seems to use 6s.
  document.getElementById('maintext').textContent="SPLASH"; 
  state=SOLUTION;
  setTimeout(RUN,5000);
} else {
  document.getElementById('maintext').textContent="  "+countdown+" SECS";
  setTimeout(flightCountdown,1000);
}
return false;  
}
//------------------------------------------------------------------
function On() {
  
on=!on; 
  
if (firston) { startupMsg(); firston=false; }
  
var disp=document.getElementById('display');
disp.style.visibility=(on)?'visible':'hidden'; 

var sh=document.getElementById('shift');
sh.style.visibility=(on && shift)?'visible':'hidden';     

return false;
}
//------------------------------------------------------------------
function Shift() {
 
if (!on) return false; 
  
shift=!shift;  
  
var sh=document.getElementById('shift');
sh.style.visibility=(shift)?'visible':'hidden';  
  
return false;
}
//------------------------------------------------------------------
function Neg() {
 
if (!on) return false; 
   
if (keyboardInput.length<11) {
  if (keyboardInput.substring(0,1)=="-") keyboardInput=keyboardInput.substring(1);
  else keyboardInput="-"+keyboardInput;
  document.getElementById('maintext').textContent=keyboardInput; 
}
  
return false;
}
//------------------------------------------------------------------
function Sfty() {
 
if (!on) return false; 

if (state!=READY) return false;
   
document.getElementById('maintext').textContent="NO SFTY DATA"; // TODO allow setting 
setTimeout(backToReady,1000);
  
return false;
}
//------------------------------------------------------------------
function Back() {
 
if (!on) return false; 
   
if (keyboardInput.length>0) {
  keyboardInput=keyboardInput.substring(0,keyboardInput.length-1);
  document.getElementById('maintext').textContent=keyboardInput;
}
if (keyboardInput.length==0) {
  document.getElementById('maintext').textContent=defaultText;
}
return false;
}
//------------------------------------------------------------------
function Tgts() {
 
if (!on) return false; 
   
if (state!=READY) return false;

if (shift) {
  Shift();  // Cancel shift
  keyboardInput=""; // Cleanup
  state=TGT_GRID;  
  document.getElementById('maintext').textContent="STOTGT GRID?"; 
} else {
  if (tgt_grid==-1) {
    document.getElementById('maintext').textContent="NO RECORD";
    setTimeout(backToReady,1000);
    state=READY;
  }
}
return false;
}
//------------------------------------------------------------------
function RESET() {
 
if (!on) return false; 
   
state=READY;

keyboardInput=""; // Cleanup
document.getElementById('maintext').textContent=defaultText; 
return false;
}
//------------------------------------------------------------------
function ML() {
 
if (!on) return false; 

// Shifted = set a new one, unshifted - show current
   
keyboardInput=""; // Cleanup

if (shift) {
  Shift();  // Cancel shift
  if (state==RESECTION_FOUND) {
    ml_grid=grid;
    ml_alt=0; // Seems like a fault in the calculator - doesn't ask for alt after resection
    state=TEMP_UPDATE;  
    defaultText="ML 00 READY";  // In future we show as set
    document.getElementById('maintext').textContent="ACTIVE ML 00"; 
    setTimeout(confirmTemp,2000);
  } else if (state==READY) {
    state=ML_GRID;
    document.getElementById('maintext').textContent="ML GRID?"; 
  }
} else {
  if (ml_grid==-1) {
    document.getElementById('maintext').textContent="NO RECORD";
    setTimeout(backToReady,1000);
    state=READY;
  } else {
    state=SHOW_ML_GRID;
    document.getElementById('maintext').textContent="00 "+ml_grid;
  }
}

return false;
}
//------------------------------------------------------------------
function MLs() {
 
if (!on) return false; 

// Shifted = set a new one, unshifted - show current
   
keyboardInput=""; // Cleanup

if (shift) {
  Shift();  // Cancel shift
  if (state==READY) {
    state=ML_GRID;
    document.getElementById('maintext').textContent="ML GRID?"; 
  }
} else {
  if (ml_grid==-1) {
    document.getElementById('maintext').textContent="NO RECORD";
    state=READY;
    setTimeout(backToReady,1000);
  } else {
    state=SHOW_ML_GRID;
    document.getElementById('maintext').textContent="00 "+ml_grid;
  }
}

return false;
}
//------------------------------------------------------------------
function confirmTemp() {
 
if (!on) return false; 

keyboardInput=""; // Cleanup
state=TEMP_UPDATE;  
document.getElementById('maintext').textContent="CH TMP "+temperature+"C?"; 

return false;
}
//------------------------------------------------------------------
function Grid() {
 
if (!on) return false; 
   
if (state!=READY) return false;

if (ml_grid==-1) {
  document.getElementById('maintext').textContent="NO ML";
  state=READY;
  setTimeout(backToReady,1000);
  return false;
}

keyboardInput=""; // Cleanup
state=GET_GRID;  
document.getElementById('maintext').textContent="TGT GRID?"; 
return false;
}
//------------------------------------------------------------------
function Shot() {
 
if (!on) return false; 
   
if (state!=SOLUTION && state!=SOLUTION_EL) {
  document.getElementById('maintext').textContent="INVALID KEY";
  state=READY;
  setTimeout(backToReady,1000);
  return false;
}
if (ml_grid==-1) {
  document.getElementById('maintext').textContent="NO ML";
  state=READY;
  setTimeout(backToReady,1000);
  return false;
}
var distance=Math.sqrt(Math.pow(ml_grid%10000-tgt_grid%10000,2)+Math.pow(ml_grid/10000-tgt_grid/10000,2));

if (distance>4000) {
  document.getElementById('maintext').textContent="OUT OF RANGE";
  keyboardInput=""; // Cleanup
  return false;
}
if (distance<100) {  document.getElementById('maintext').textContent="TGT TOO NEAR";
  keyboardInput=""; // Cleanup
  return false;
}

keyboardInput=""; // Cleanup
state=COUNTDOWN;  
countdown=37;
document.getElementById('maintext').textContent="   "+countdown+" SECS";
setTimeout(flightCountdown,1000);
return false;
}
//------------------------------------------------------------------
function B0() { // Digit 0
  
if (!on) return false;  
  
if (shift) return false;  // Do nothing if shifted 
  
if (keyboardInput.length<12) {
  keyboardInput+="0";
  document.getElementById('maintext').textContent=keyboardInput; 
}
return false;
}
//------------------------------------------------------------------
function B1() { // Digit 1
  
if (!on) return false;  
  
if (shift) return false;  // Do nothing if shifted 
  
if (keyboardInput.length<12) {
  keyboardInput+="1";
  document.getElementById('maintext').textContent=keyboardInput; 
}
return false;
}
//------------------------------------------------------------------
function B2() { // Digit 2, also, when shifted RESECT
  
if (!on) return false;  
  
if (state== READY && shift) {
  Shift();  // Cancel shift
  keyboardInput=""; // Cleanup
  state=RESECTION_GR1;  
  document.getElementById('maintext').textContent="PT. 1 GRID?"; 
  return false;
}
if (shift) return false;  // Do nothing if shifted and not ready
  
if (keyboardInput.length<12) {
  keyboardInput+="2";
  document.getElementById('maintext').textContent=keyboardInput; 
}
return false;
}
//------------------------------------------------------------------
function B3() { // Digit 3
  
if (!on) return false;  
  
if (shift) return false;  // Do nothing if shifted 
  
if (keyboardInput.length<12) {
  keyboardInput+="3";
  document.getElementById('maintext').textContent=keyboardInput; 
}
return false;
}
//------------------------------------------------------------------
function B4() { // Digit 4
  
if (!on) return false;  
  
if (shift) return false;  // Do nothing if shifted 
  
if (keyboardInput.length<12) {
  keyboardInput+="4";
  document.getElementById('maintext').textContent=keyboardInput; 
}
return false;
}
//------------------------------------------------------------------
function B5() { // Digit 5
  
if (!on) return false;  
  
if (shift) return false;  // Do nothing if shifted 
  
if (keyboardInput.length<12) {
  keyboardInput+="5";
  document.getElementById('maintext').textContent=keyboardInput; 
}
return false;
}
//------------------------------------------------------------------
function B6() { // Digit 6
  
if (!on) return false;  

if (state== READY && shift) {
  Shift();  // Cancel shift
  state=TEMP_UPDATE;  
  document.getElementById('maintext').textContent="CH TEMP "+temperature+"C?"; 
  return false;
}
  
if (shift) return false;  // Do nothing if shifted and not ready
  
if (keyboardInput.length<12) {
  keyboardInput+="6";
  document.getElementById('maintext').textContent=keyboardInput; 
}
return false;
}
//------------------------------------------------------------------
function B7() { // Digit 7
  
if (!on) return false;  
  
if (shift) return false;  // Do nothing if shifted 
  
if (keyboardInput.length<12) {
  keyboardInput+="7";
  document.getElementById('maintext').textContent=keyboardInput; 
}
return false;
}
//------------------------------------------------------------------
function B8() { // Digit 8
  
if (!on) return false;  
  
if (shift) return false;  // Do nothing if shifted 
  
if (keyboardInput.length<12) {
  keyboardInput+="8";
  document.getElementById('maintext').textContent=keyboardInput; 
}
return false;
}
//------------------------------------------------------------------
function B9() { // Digit 9
  
if (!on) return false;  
  
if (shift) return false;  // Do nothing if shifted 
  
if (keyboardInput.length<12) {
  keyboardInput+="9";
  document.getElementById('maintext').textContent=keyboardInput; 
}
return false;
}
//------------------------------------------------------------------
function RUN() { 
  
if (!on) return false;  
  
shift=false;  // Clear shift if we run
var sh=document.getElementById('shift');
sh.style.visibility='hidden';
  
if (keyboardInput.length==0  && state!=TEMP_UPDATE && state!=SHOW_ML_ALT && state!=SHOW_ML_GRID && state!=SOLUTION && state!=SOLUTION_EL) {
  if (state==RESECTION_GR3) { // Skip 3rd point
    state=RESECTION_CALC;
    resect_gr3=-1; // No 3rd point
    document.getElementById('maintext').textContent="WORKING"; 
    setTimeout(resection,3000);
    return false;
  }
  document.getElementById('maintext').textContent=INVALID_KEY;
  return false;  
}
if (state==READY) {  // There is no valid input for run when READY
  keyboardInput="";
  document.getElementById('maintext').textContent=INVALID_KEY;
  return false;  
}

switch (state) {
  case(TGT_GRID):  tgt_grid=getGrid(); 
    if (tgt_grid!=-1)  { state=TGT_ALT; document.getElementById('maintext').textContent="STO TGT ALT?"; } break;
  case(TGT_ALT):  tgt_alt=Number(keyboardInput); 
    if (!isNaN(tgt_alt))  { state=TGT_NO; document.getElementById('maintext').textContent="STO TGT NO?"; } break;
  case(TGT_NO):  tgt_no=keyboardInput;
    if (!isNaN(tgt_no))  { state=READY; document.getElementById('maintext').textContent=tgt_no+" STORD"; 
        setTimeout(backToReady,3000); } break;

  case(GET_GRID):  tgt_grid=getGrid();   // Snap shot at a grid
    if (tgt_grid!=-1)  { state=GET_ALT; document.getElementById('maintext').textContent="TGT ALT?"; } break;
  case(GET_ALT):  tgt_alt=Number(keyboardInput); 
    if (!isNaN(tgt_alt))  {
      state=SOLUTION; 
      document.getElementById('maintext').textContent="ML:00 HE/WPN";
      setTimeout(solution,1000);
    }
    break;
  case (SOLUTION):
    document.getElementById('maintext').textContent="EL: 1258 T: 37"; // TODO make based on calculation
    state=SOLUTION_EL;
    break;
  case (SOLUTION_EL):
    document.getElementById('maintext').textContent="BG: 1577 CH: 3"; // TODO make based on calculation
    state=SOLUTION;  // Cycles round awaiting SHOT
    break;

  case(ML_GRID):  ml_grid=getGrid(); 
    if (ml_grid!=-1)  { state=ML_ALT; document.getElementById('maintext').textContent="ML ALT.?"; } break;
  case(ML_ALT):  ml_alt=Number(keyboardInput); 
    if (!isNaN(ml_alt))  {
      state=TEMP_UPDATE; document.getElementById('maintext').textContent="CH TEMP "+temperature+"C?"; 
      defaultText="ML 00 READY" 
    }
    break;

  case (SHOW_ML_GRID):
    state=SHOW_ML_ALT; document.getElementById('maintext').textContent="00 ALT:"+ml_alt; break;
  case (SHOW_ML_ALT):
    state=TEMP_UPDATE; 
    document.getElementById('maintext').textContent="CH TEMP "+temperature+"C?"; 
    defaultText="ML 00 READY";
    break;

  case(RESECTION_GR1):  resect_gr1=getGrid(); 
    if (resect_gr1!=-1)  { state=RESECTION_BR1; document.getElementById('maintext').textContent="PT. 1 BRG?"; } break;
  case(RESECTION_BR1):  resect_br1=getBrg(); 
    if (resect_br1!=-1) { state=RESECTION_GR2; document.getElementById('maintext').textContent="PT. 2 GRID?"; } break;
  case(RESECTION_GR2):  resect_gr2=getGrid(); 
    if (resect_gr2!=-1) { state=RESECTION_BR2; document.getElementById('maintext').textContent="PT. 2 BRG?"; } break;
  case(RESECTION_BR2):  resect_br2=getBrg(); 
    if (resect_br2!=-1) { state=RESECTION_GR3; document.getElementById('maintext').textContent="PT. 3 GRID?"; } break;
  case(RESECTION_GR3):  resect_gr3=getGrid(); 
    if (resect_gr3!=-1) { state=RESECTION_BR3; document.getElementById('maintext').textContent="PT. 3 BRG?"; } break;
  case(RESECTION_BR3):  resect_br3=getBrg(); 
    keyboardInput="";
    document.getElementById('maintext').textContent="WORKING"; 
    if (resect_br3!=-1) state=RESECTION_CALC;
    setTimeout(resection,3000);
    break;
  case (TEMP_UPDATE):
    if (keyboardInput=="") keyboardInput=temperature.toString();  // keep current
    var tmp=Number(keyboardInput);
    if (!isNaN(tmp)) { temperature=tmp; state=READY; document.getElementById('maintext').textContent=defaultText;}
    else { document.getElementById('maintext').textContent=INVALID_KEY; }
    break;
}
keyboardInput="";
return false;
}

//------------------------------------------------------------------
function backToReady() {
  document.getElementById('maintext').textContent=defaultText;
  return false;
}
//------------------------------------------------------------------
function solution() {
  document.getElementById('maintext').textContent="BG: 1577 CH:4";// TODO make a variable!
  return false;
}

//------------------------------------------------------------------
function getGrid() {
  
  if ((keyboardInput.length%2)!=0) { // Grids must be even
    document.getElementById('maintext').textContent=INVALID_KEY;
    return -1;  
  }    
  // TODO - for now assume 8 figure grids only.  Later 6,8,10 should be OK
  if ((keyboardInput.length%2)!=0) {
    document.getElementById('maintext').textContent=INVALID_KEY;
    return -1;  
  }    
  if (keyboardInput.length!=8) {  
    document.getElementById('maintext').textContent=INVALID_KEY;
    return -1;  
  }
   if (Number(keyboardInput)<0) {  
    document.getElementById('maintext').textContent=INVALID_KEY;
    return -1;  
  } 
  
  return (Number(keyboardInput));  
}
//------------------------------------------------------------------
function getBrg() {
  var tmp=Number(keyboardInput); 

  document.getElementById('maintext').textContent="READ:"+(tmp);
  if (tmp>=0 && tmp<=6400) return tmp;  

  document.getElementById('maintext').textContent=INVALID_KEY;
  return -1;  
}
//------------------------------------------------------------------
function resection() {
  // Two point resection to determine location from which sightings are made
  // Should be mathematically correct, and matches (within accuracy) the calculator
  // calculation.  Might struggle for special cases (e.g. small denominator)
  // Currently assumes 8 figure grids.
  
  if (resect_br1==resect_br2 || ((resect_br2-resect_br1)%6400)==0) { // Parallel
    document.getElementById('maintext').textContent="NO SOLUTION";
    state=READY;
    setTimeout(backToReady,3000);
    return false;
  }
  var resect_br1_rad=2*Math.PI*(resect_br1/6400.0); // Mils to radians
  var resect_br2_rad=2*Math.PI*(resect_br2/6400.0);
  //var resect_br3=2*Math.PI*(resect_br3/6400.0);  // TODO - third bearing
  var numerator=Math.sin(resect_br1_rad)*((resect_gr2%10000)-(resect_gr1%10000))-
                Math.cos(resect_br1_rad)*((resect_gr2/10000)-(resect_gr1/10000));
  
  var denominator=Math.sin(resect_br2_rad)*Math.cos(resect_br1_rad)-
                  Math.cos(resect_br2_rad)*Math.sin(resect_br1_rad);
  
  if (denominator==0) { // Not sure this is possible or might duplicate parallel test
    document.getElementById('maintext').textContent="NO SOLUTION";
    state=READY;
    setTimeout(backToReady,4000);  // Not quick!
    return false;    
  }
  var length2=numerator/denominator;

  var eastings=Math.round((resect_gr2/10000)+length2*Math.sin(resect_br2_rad));
  var northing=Math.round((resect_gr2%10000)+length2*Math.cos(resect_br2_rad));

  grid=eastings*10000+northing;  // Store for use by ML
  document.getElementById('maintext').textContent="INT: "+eastings%10000+" "+northing%10000;
  state=RESECTION_FOUND;
  keyboardInput="";
  return;  
}
//------------------------------------------------------------------
//------------------------------------------------------------------
function setTime() {  // Unfinshed.. Compares user input with
// machine time and sets an offset between the two
var today=new Date();
var hr=today.getHours();
var min=today.getMinutes();
var sec=today.getSeconds();
}
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
