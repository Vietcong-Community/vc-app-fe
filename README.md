# Vietcong app

Frontend aplikace pro podporu hraní hry Vietcong. Aplikace je vytvořena v Reactu a bude umožňovat následující:

- Správa uživatelů
  - Registrace
  - Přihlášení
  - CRUD nad údaji usera
  - Změna hesla
  - Statistiky z her
  - Role (admin ligy/turnajů)
- Týmy
  - CRUD nad údaji týmů
  - Role v týmu
    - CL :D
    - Match manager
    - Člen
- Hraní MIX zápasů a jejich bodování
  - Vytvoření jednorázového zápasu, kam se můžou přiřadit hráči
  - Bodování hráčů na základě výsledků
  - Tabulka hráčů na základě bodů z MIX zápasů
  - Získávání výsledků z MP result
  - Nahrávání příloh k zápasům
  - Admin může upravovat zápas i po jeho schválení oboumi směry
- Liga
  - Klasická tabulka
  - ELO systém (vzorečky na netu)
  - Zápasy mezi týmy/hráči v ligách
  - Admin může spravovat ligy, nepůjdou mazat, jen archivovat
- Zápasy
  - Stejné jako MIX zápasy
  - Lze vybírat mapu
  - Umožnit vybírat hráče
  - Zadávání skóre pro všechny hráče po kolech
  - Nahrávání MP result výsledků
  - Schválování oběma stranama
- Turnaje
  - Vytvoření turnaje
  - Různé systémy
    - Tabulka každý s každým
    - Tabulka a následná single eliminace, double eliminace
  - Podpora pro KAŘEZ turnaje
    - Registrace týmů
- Informační sekce
  - Kde sehnat VC,
  - Kařez
  - Jak se napojit na servery
  - Napojení na FB GS, kteří jsou hodně aktivní

## Jak na vývoj

Nainstalované prerekvizity pro spuštění:
- yarn
- nodejs

Potom spustit příkazy:

    // Nainstaluje knihovny a připraví projekt na spuštění
    yarn install

    // Spustí lokálně projekt
    start:development

### Vývoj

Když chci začít programovat task, tak bude přibližně následující postup:

    // nad develop branchí
    git pull
    git checkout -b task/VC-XX

    // Naprogramovat co mám, např. vytvoření Headeru :D
    // Před commitem spustit příkaz (níže), který vygeneruje ze souborů messages.ts překlady do cs.json a en.json
    yarn extract:messages

    // Commit s názvem co se dělalo, čistě pro nějakou štábní kulturu a snažší dohledání co se kde posralo.
    git commit -m "[VC-XX] Header component"

    // Je nainstalovaný husky (hlídací pes :D), který před commitem kontroluje, zda kód nemá nějaké syntax chyby,
    // aby se zachovala nějaké struktura. Když commit neprojde, je třeba opravit a poté zkusit znovu.
    git push

Po mergnutí se znova přepnout na develop a pullnout si.