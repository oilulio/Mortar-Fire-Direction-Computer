#!/usr/bin/python3

""" Offline js/html Code generation script to automate the onMouseover etc. given a button location
    on the calculator image.  Updated for the rectified/squared image.
"""

buttonTopGrid=[["Grid",0,0,"Firing solution at grid reference, if ML is set"],  #Name, xy location in button grid
               ["WM",2,0,"Firing solution at Bearing/Range"],
               ["DATUM",3,0],
               ["Tgts",0,1],
               ["Sfty",1,1],
               ["MLs",2,1],
               ["MET",3,1,"Get or set (if shifted) Met data"],
               ["Shift",0,2,"Enables/Disables shifted commands"],
               ["Shot",4,2,"Take shot at target - start flight countdown"],
               ["Neg",2,3,"Toggle sign of number"],
               ["ML",3,3,"Get or set (if shifted) Mortar location"],
               ["Back",4,3,"Delete last character from display input"]]

buttons=[["On",10,140,100,80,"On/Off"]] # 'On' is in a unique position

XSPAN=92
YSPAN=91
TLX=38
TLY=253

for but in buttonTopGrid:
  if (len(but)<4):
    buttons.append([but[0],TLX+(XSPAN)*but[1],TLY+YSPAN*but[2],XSPAN-2,YSPAN-2])
  else:
    buttons.append([but[0],TLX+(XSPAN)*but[1],TLY+YSPAN*but[2],XSPAN-2,YSPAN-2,but[3]])


# TODO (alignment alredy tested) : buttons.append(["CORRECTION",TLX,TLY+YSPAN*3,2*XSPAN-2,YSPAN-2,"Adjust aimpoint relative to fall of shot"])

buttonsLHS=[#["DN",0],   # Name, Ypos
           ["SIM",1],
           ["CLEAR",2],
           ["RESET",3]]

for but in buttonsLHS:
  if (len(but)<3):
    buttons.append([but[0],42,6+TLY+(YSPAN-1)*(4+but[1]),XSPAN-4,YSPAN-2])
  else:
    buttons.append([but[0],42,6+TLY+(YSPAN-1)*(4+but[1]),XSPAN-4,YSPAN-2,but[2]])

# digits 0..9 in [x,y] offset locations and additional function tooltip
digits=[[0,3],[0,2],[1,2,"Resection - get grid from bearings of known landmarks"],[2,2],[0,1,"Report target details"],[1,1],[2,1,"Set ambient temperature"],[0,0,"Set clock"],[1,0,"Set H-Hour"],[2,0,]]

TL_DIGIT_X=155
TL_DIGIT_Y=619
DIGIT_WIDTH=95
DIGIT_HEIGHT=90

for d in range(10):
  but=["B"+str(d),TL_DIGIT_X+(27+DIGIT_WIDTH)*digits[d][0],
              TL_DIGIT_Y+(DIGIT_HEIGHT)*digits[d][1],
              DIGIT_WIDTH,DIGIT_HEIGHT]
  if (len(digits[d])>2):
    but.append(digits[d][2])
  buttons.append(but)

buttons.append(["Bdp",TL_DIGIT_X+(27+DIGIT_WIDTH)*1,
              TL_DIGIT_Y+(DIGIT_HEIGHT)*3,
              DIGIT_WIDTH,DIGIT_HEIGHT])

but=["RUN",TL_DIGIT_X+(27+DIGIT_WIDTH)*2,
              TL_DIGIT_Y+(DIGIT_HEIGHT)*3,
              DIGIT_WIDTH,DIGIT_HEIGHT,"Process input or accept prompt"]
buttons.append(but)

print ("Code to insert in HTML -----------------------------")
for but in buttons:
  if (len(but)<6): # No tooltip
    print ('<area shape = "rect" coords = "'+str(but[1])+","+str(but[2])+","+str(but[1]+but[3])+","+str(but[2]+but[4])+'" onclick="'+but[0]+'();" onmouseover="over'+but[0]+'();" onmouseout="out'+but[0]+'();" href = "#0" alt="'+but[0]+'">')
  else:
    print ('<area shape = "rect" coords = "'+str(but[1])+","+str(but[2])+","+str(but[1]+but[3])+","+str(but[2]+but[4])+'" onclick="'+but[0]+'();" onmouseover="over'+but[0]+'();" onmouseout="out'+but[0]+'();" href = "#0" alt="'+but[0]+'" title="'+but[5]+'">')
    

print ("Code to insert in JS ----------------------------")  
for but in buttons:

  print ("function over"+but[0]+"() {")
  print ('var c = document.getElementById("myCanvas");')
  print ('var ctx = c.getContext("2d");')
  print ('ctx.beginPath();')
  print ('ctx.rect('+str(but[1])+","+str(but[2])+","+str(but[3])+","+str(but[4])+');')
  print ('ctx.lineWidth=8;')
  print ("ctx.strokeStyle = '#ff0000';")
  print ("ctx.stroke();")
  print ("}")

for but in buttons:

  print ("function out"+but[0]+"() {")
  print ('var c = document.getElementById("myCanvas");')
  print ('var ctx = c.getContext("2d");')
  print ('ctx.clearRect('+str(but[1])+","+str(but[2])+","+str(but[3])+","+str(but[4])+');')
  print ('ctx.drawImage(img,offsetX,offsetY,540,1000);')
  print ("}")
