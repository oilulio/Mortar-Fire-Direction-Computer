#!/usr/bin/python3

""" Offline js Code generation script to automate the onMouseover etc. given a button loctaion
    on the calculator image
"""

buttons=[["On",10,140,100,80],
         ["Shift",45,440,85,85],
         ["Neg",60+85*2,445+85,85,85],
         ["ML",65+85*3,445+85,85,85],
         ["Grid",45,263,85,85],
         ["Tgts",45,352,85,85],
         ["Sfty",45+90,352,85,85],
         ["MLs",45+90*2,352,85,85],
         ["Shot",45+90*4,440,85,85],
         ["RESET",50,889,85,85],
         ["Back",65+85*4,445+85,85,85]]

# digits 0..9 in [x,y] offset locations
digits=[[0,3],[0,2],[1,2],[2,2],[0,1],[1,1],[2,1],[0,0],[1,0],[2,0]]

TL_DIGIT_X=50+85+20
TL_DIGIT_Y=525+97
DIGIT_WIDTH=95
DIGIT_HEIGHT=89

for d in range(10):
  but=["B"+str(d),TL_DIGIT_X+(27+DIGIT_WIDTH)*digits[d][0],
              TL_DIGIT_Y+(DIGIT_HEIGHT)*digits[d][1],
              DIGIT_WIDTH,DIGIT_HEIGHT]
  buttons.append(but)

but=["RUN",TL_DIGIT_X+(27+DIGIT_WIDTH)*2,
              TL_DIGIT_Y+(DIGIT_HEIGHT)*3,
              DIGIT_WIDTH,DIGIT_HEIGHT]
buttons.append(but)


for but in buttons:
  print ('<area shape = "rect" coords = "'+str(but[1])+","+str(but[2])+","+str(but[1]+but[3])+","+str(but[2]+but[4])+'" onclick="'+but[0]+'();" onmouseover="over'+but[0]+'();" onmouseout="out'+but[0]+'();" href = "#0" alt="'+but[0]+'">')

  
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
