Vagrant er tól til að auðvelda manni að setja upp sýndarveĺar. Það er hægt að setja upp forstilltar sýndarvélar úr skrám. Mismunandi aðstæður kalla á mismunandi sýndarvélar en sýndarvélar sem eru settar upp úr sömu skrá verða eins. Þá er auðvelt að endurskapa sama umhverfi. Það t.d. sparar tíma við uppsetningu ef bara þarf að setja upp einu sinni og það er hægt að vera með nákvæmlega eins þróunarumhverfi fyrir alla í þróunarteyminu.

VirtualBox er hugbúnaður sem leyfir manni að keyra sýndarvélar. Það er að segja leyfir manni að keyra upp stýrikerfi inn í öðru stýrikerfi með því að líkja við (simulate) tölvu sem keyrir ákveðið stýrikerfi. 

Grunt er tól sem keyrir verkefni. Ástæðan fyrir því er að sjálfvirknivæða þróunarferlið þitt. Í þróun eru allskonar verkefni sem þarf að gera. Til að deploya þá þarf kannski að uglify-a og minify-a. Grunt gerir það auðvelt að safna saman verkefnum og keyra með einni skipun.


Nodejs er javascript framework og keyrsluumhverfi til að búa til vefforrit. Keyrsluumhverfið keyrir bara á einum þræði asynchronously frekar en að multithreada og notar eventa í staðinn. Það er tiltölulega auðvelt að búa til og keyra upp einfalt forrit og auðvelt að skala það upp líka.

NPM (Node package manager) er pakkaumsjónarkerfi, upphaflega fyrir Nodejs en er búið að færa út kvíarnar í dag. Þetta er tæki til að halda utan um pakka sem eru yfirleitt libraries frá þriðja aðila. Þetta hjálpar við að halda öllum pökkum eins þegar við erum að þróa og gefa út hugbúnað því pakkarnir og útgáfunúmer eru geymdir í sameiginlegri skrá.

Bower er svipað tól og NPM, pakkaumsjónarkerfi fyrir javascript libraries. Yfirleitt notað fyrir framendann og ekki eins mikið af þróunartólum og í npm. Sömu kostir, auðveldara að tryggja sér að allir séu að nota sömu libraries.


##Umhverfi og CI pípan:
2 virtual vélar sjá um að halda uppi allri pípunni. Önnur er dev vélin sem keyrir líka jenkins þjóninn. Hin er production-like test umhverfið sem er líka load test umhverfið. Þegar breytingum er ýtt inn á github þá sækir jenkins þjónninn breytingarnar,keyrir einingapróf, setur upp libraries með npm install og keyrir scriptu sem heitir dockerbuild.sh. Hún byggir kerfið með grunt og pakkar því saman í docker image. Til að deploya kerfinu þá er notuð scriptan deploy.sh sem ýtir docker image út á netið, tengir sig svo inn á prod-like test umhverfið og sækir docker imaginn og keyrir hana upp í staðinn fyrir eldri útgáfu. Að lokum keyrir jenkins svo acceptance próf á móti prod-like test umhverfinu.

##Capacity tests
Ég byrjaði á að keyra 1000 leiki þangað til jafntefli varð. Það komu undarlegar niðurstöður úr því þar sem aldrei kom timeout og miklu fleiri próf voru keyrð en beðið var um, hátt í 6000. Það komu í ljós villur í fluidApi sem ég lagaði. Síðan lækkaði ég prófin niður í 10 og síðan 100 þar sem keyrslan var eðlileg og tíminn var yfirleitt í kring um 7-8 sek á 100 leikjum. Ég stillti því timeout í 9 sek.

##Paralell eða serial
Nodejs er með asynchronus IO sem þýðir að það bíður ekki eftir að fallið klárar heldur heldur áfram og notar callback functions til að skila gögnum til baka. Það þýðir að á meðan eitt fall keyrir þá er hægt að byrja á næsta. Þannig að prófin eru keyrð samhliða.

##Spurningar dagur 10
###Hvað gefur þetta okkur? O.s.frm?
Þetta leyfir okkur að velja hvaða útgáfu við notum. Þeir sem nota hugbúnaðinn okkar geta valið sér útgáfu til að vera vissir um að það sé eins. Við getum líka bakkað í eldri útgáfu í production ef gallar koma í ljós í nýrri útgáfum.

###Hvað er að því að hafa docker push í deployment scriptu?
Við viljum ekki þurfa að ýta docker image í hvert sinn sem við deployum eitthvert. Þá getur líka allt farið í rugl ef það er búið að builda nýja image þegar við ætlum að deploya, það verður meiri hætta á mistökum. Builda binaries einu sinni og ýta þeim síðan á servera til að testa eða fara í prod.

###Hvernig virkar þetta?
Þegar þú committar þá býr git til sha1 hash fyrir uppfærsluna úr alls konar upplýsingum, höfundur, parent commit og eitthvað fleira. Þegar við ýtum á docker þá merkjum við docker imaginn með þessu hashi og náum í það með sama merki. Þá getum við valið útgáfu með því að finna sha1 hashið fyrir git commitið.

