const word=`
chamber, deny, document, emphasize, fever, flu, freeze, gesture, interrupt, last, 
likeness , moreover, perspective, rational, recover, rely, shock, shy, stare,thus,
aim, attach, bet, carriage, classic, commute, confirm, criticize, differ, expense, 
formal, height, invent, junior, labor, mechanic, prime, shift, signal, sincere,
ability, agriculture, cartoon, ceiling, convince, curious, delay, diary, element, faith, 
grain, greet, investigate, joy, label, monk, odd, pause, priest, profession,
adopt, beg, beyond, costume, exclaim, extend, fool, forbid, illustrate, indeed, 
interpret, kindly, motive, nest, origin, reception, reject, silence, stream,tone,
accomplish, approve, approximate, barrier, detect, duty, elementary, failure, gradual, 
immigrant, insert, instant, poverty, pretend, rank, recognition, refrigerate, rent, retire, statistic,
astronaut, awake, courage, float, grant, gravity, jewel, miner, mineral, participate, 
permission, pour, presence, raw, satellite, scale, skip, stretch, telescope, underground,
 alarm, apart, arrest, award, breed, bucket, contest, convict, garage, journalist, 
pup, qualify, repair, resume, rob, slip, somewhat, stable, tissue, yard ,
 alike, annoy, architecture, artificial, chain, distinct, distinguish, dust, excitement, heal, 
inherit, manner, mount, roof, shortage, solid, stock, substance, tomb, wound ,
 bath, bend, chew, disabled, fantastic, fiction, flag, inspect, journal, liquid, marvel, 
nutrient, overcome, recall, regret, soul, sufficient, surgery, tough, tube ,
 admit, bin, bowl, cabin, cash, criminal, dozen, elder, facial, fence, inspire, mere, 
neat, occasion, penalty, rude, settle, vehicle, wallet, yell, 
 accuse, adjust, amuse, coral, cotton, crash, deck, engage, firm, fuel, grand, 
 hurricane, loss, plain, reef, shut, strict, surf, task, zone,
 apology, bold, capture, cardinal, duke, expose, guilty, hire, innocent, jail, minister, 
ordinary, permanent, preserve, pronounce, resemble, symptom, tobacco, twin, witch,
accompany, bare, branch, breath, bridge, cast, dare, electronic, inn, net, philosophy, 
pot, seed, sharp, sort, subtract, tight, virtual, weigh, whisper,
abstract, annual, clay, cloth, curtain, deserve, feather, fertile, flood, furniture, grave, 
ideal, intelligence, nowadays, obtain, religious, romantic, shell, shore, wheel,
appeal, assume, borrow, client, downtown, dull, embarrass, fare, former, formula, 
found, invest, loan, practical, quarter, salary, scholarship, temporary, treasure, urge
`
let res = word.split(",");
res = res.map(r=>r.trim());
let es = ""

es+="["
res.map(s => {
    es+="["
    es+=`"${s}",`
    es+=`"/'æŋ(k)ʃəs/",`
    es+=`"adj.",`
    es+=`"",`
    es+=`"",`
    es+=`"",`
    es+="],"
})
es+="]"

document.body.innerText = es;

