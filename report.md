## Vagrant
Hugbúnaður sem hjálpar til með virtual umhverfi (VirtualBox, VMware) fyrir þróara. Gerir hlutina auðveldari þannig að hægt er að setja upp tilbúið pakkað box þannig að t.d umhverfi hjá teymi séu samstillt. Hægt er að finna sér box til að setja upp á https://atlas.hashicorp.com/boxes/search 

##VirtualBox
VirtualBox er hugbúnaðurinn sem býr til sýndarvélar og keyrir þær. Hægt er að setja upp eins margar vélar og maður vill eins lengi og minnið leyfir á host vélinni. T.d hægt að nota til að keyra forrit sem ekki virka á stýrikerfinu sem er sett upp nú þegar, til þess að setja upp hreint umhverfi eða bara til að prófa eitthvað nýtt. Svona hugbúnaður er líka lykillinn að því að leysa release antipattern vandamálið *"Deploying to a Production-like Environment only after Development is Complete - Testing done exclusively on development machines"* ásamt Vagrant.


##Grunt
JavaScript task runner sem hjálpar með að framkvæma verkefni sem þarf að endurtaka. *Gruntfile.js* í rótinni skilgreinir töskin sem á að framkvæma í build-inu og dæmi er t.d að hreinsa möppur í kring, keyra linter og fara í gegnum testin. Þetta er aðal tólið sem build-ar forritið og automate-ar hlutina þannig að þetta útrýmir þá release antipattern *"Deploying Software Manually - Manual testing"*

##npm
Pakka-installer fyrir JavaScript NodeJS. Aðveldar það að deila og endurnota kóða. Heldur utan um dependencies fyrir forritið í package.json skránni sem svo sækir það sem þar er tilgreint þegar *npm install* er keyrt og setur í node_modules möppuna. Vinnur á móti *"Manual configuration"* release antipattern-inu.

##Node.js
JavaScript Open-source umhverfi fyrir þróun á server-side apps. Notar Google V8 JavaScript engine og kemur með built-in libraries sem leyfa apps að vera stand-alone vefþjónar á mjög lightweight hátt. Það að vera með cloud API auðveldar testing svo ekki þurfi að prófa á móti GUI sem verður fljótt vandamál og er því eitt af *"Principles of software delivery"*.

##Bower
Pakka-installer fyrir JavaScript. Svipaður og npm nema heldur frekar utan um dependencies fyrir framenda-vefforritun eins og CSS. Heldur utan um hlutina í bower.json skránni og svo er hægt að sækja það sem er þar með *bower install* skipun og svo fer allt í bower_components möppuna. Vinnur á móti sama release anti pattern og npm eða *"Manual configuration"*.

#Topology of the deployment path so far (Dagur 3)
Búið er að setja upp tvær virtual vélar, eina dev vél sem er CentOS vél sett upp með Vagrant og svo aðra test vél sem var sett upp í DigitalOcean cloudinu. Test vélin er Ubuntu 14.04 með 512MB Ram og 20GB SSD disk og svo var Docker settur þar upp.

Svo er búið að búa til tvö script, *dockerbuild.sh* sem buildar forritið með Grunt og pakkar svo öllu saman í Docker image sem er svo hægt að setja upp á annari vél sem er með Docker sett upp. Síðan er *test_deploy.sh* keyrt og þá er Docker image-ið sem var búið til með fyrra scriptinu pushað á dockerhub og svo er ssh-að inná DigitalOcean test vélina, image-ið pullað þangað og sett í gang.

Jenkins CI hefur svo verið sett upp á dev vélinni. Í hvert skipti þegar breytingar eru gerðar á kóðanum inná github þá fer build ferlið í gang. Þar er svo hægt að sjá upplýsingar um heilsuna á forritinu í öll síðustu skipti ásamt því að Karma JUnit Reporter sér svo um að búa til test skýrslur í leiðinni en þær fara svo í "karma" möppuna sem er í rótinni.

#Load/capacity tests (Dagur 9)
##Results
Eftir að hafa prófað mig aðeins áfram ákvað ég að sjá hvað það myndu sirka nást margir leikir á 5sec svo þeir yrðu ekki of margir. Á rétt yfir 3000ms náðust 10000 leikir að spilast svo ég hækkaði 5sec mörkin um 20% í 6sec sem er þá load tolerance-ið.

*Should play 10000 games in 6 seconds. (3320ms)*

*Should play 10000 games in 6 seconds. (3231ms)*

*Should play 10000 games in 6 seconds. (3119ms)*

*Should play 10000 games in 6 seconds. (3026ms)*

##Does the load test run in serial or in parallel?
NodeJS keyrir sem Asyncrhonous I/O eða non-blocking I/O sem þýðir að næsti read/write process (næsti leikur/test) fer af stað um leið og einn er byrjaður þannig að þeir keyra margir á sama tíma.

