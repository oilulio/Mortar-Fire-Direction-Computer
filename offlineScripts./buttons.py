#!/usr/bin/python3

""" Offline js/html Code generation script to automate the onMouseover etc. given a button location
    on the calculator image.  Updated for the rectified/squared image.
"""

buttonTopGrid=[["Grid",0,0],  #Name, xy location in button grid
               ["Tgts",0,1],
               ["Sfty",1,1],
               ["MLs",2,1],
               ["Shift",0,2],
               ["Shot",4,2],
               ["Neg",2,3],
               ["ML",3,3],
               ["Back",4,3]]

buttons=[["On",10,140,100,80],
         ["RESET",42,888,87,86]]

XSPAN=92
YSPAN=91
TLX=38
TLY=253

for but in buttonTopGrid:
  buttons.append([but[0],TLX+(XSPAN)*but[1],TLY+YSPAN*but[2],XSPAN-2,YSPAN-2])

# digits 0..9 in [x,y] offset locations
digits=[[0,3],[0,2],[1,2],[2,2],[0,1],[1,1],[2,1],[0,0],[1,0],[2,0]]

TL_DIGIT_X=155
TL_DIGIT_Y=619
DIGIT_WIDTH=95
DIGIT_HEIGHT=90

for d in range(10):
  but=["B"+str(d),TL_DIGIT_X+(27+DIGIT_WIDTH)*digits[d][0],
              TL_DIGIT_Y+(DIGIT_HEIGHT)*digits[d][1],
              DIGIT_WIDTH,DIGIT_HEIGHT]
  buttons.append(but)

but=["RUN",TL_DIGIT_X+(27+DIGIT_WIDTH)*2,
              TL_DIGIT_Y+(DIGIT_HEIGHT)*3,
              DIGIT_WIDTH,DIGIT_HEIGHT]
buttons.append(but)

print ("Code to insert in HTML -----------------------------")
for but in buttons:
  print ('<area shape = "rect" coords = "'+str(but[1])+","+str(but[2])+","+str(but[1]+but[3])+","+str(but[2]+but[4])+'" onclick="'+but[0]+'();" onmouseover="over'+but[0]+'();" onmouseout="out'+but[0]+'();" href = "#0" alt="'+but[0]+'">')


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

