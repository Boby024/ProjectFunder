import hashlib

def prepareforJSON(listFromDB, modeller):
  modeledList = []
  for first in listFromDB:
    modeledList.append(dict(zip(modeller, first)))
  return modeledList

def encodePASSWD(password):
  ps = password.encode()
  newpasswd= hashlib.sha3_512(ps).hexdigest()
  return newpasswd

def secureEmail(email):
    main = ""
    stand = True
    counter = 0
    while stand:  # l > counter
        if email[counter] != "@":
            main += email[counter]
        else:
            stand = False
        counter += 1
    return main[::-1]


email = "tester4726472637263@gmail.com"
print(secureEmail(email))

em = "tester"
l = len(em)
for i in range(len(em)):
    continue
