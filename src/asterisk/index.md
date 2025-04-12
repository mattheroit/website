# Asterisk: Instalace a konfigurace na Raspberry Pi

## Příprava Raspberry Pi

1. **Povolení SSH**  
   Použijte Raspberry Pi Imager nebo `raspi-config` pro zapnutí SSH.

2. **Připojení přes SSH**

   ```sh
   ssh <uzivatel>@<IP_ADRESA_RPI>
   ```

3. **Nastavení statické IP adresy**  
   Postupujte dle [návodu zde](https://raspberrytips.com/set-static-ip-address-raspberry-pi/#set-a-static-ip-via-the-command-line).

4. **Aktualizace operačního systému**

   ```sh
   sudo apt-get update
   sudo apt-get upgrade
   ```

5. **Restart RPi**

   ```sh
   sudo shutdown -r 0
   ```

6. **Opětovné připojení přes SSH**

## Stažení Asterisku

1. **Stažení poslední verze:**

   ```sh
   wget https://downloads.asterisk.org/pub/telephony/asterisk/asterisk-18-current.tar.gz
   ```

2. **Rozbalení archivu:**

   ```sh
   tar -xvzf asterisk-18-current.tar.gz
   ```

### Konfigurace Asterisku

:link: [Oficiální dokumentace - Prerequisites](https://docs.asterisk.org/Getting-Started/Installing-Asterisk/Installing-Asterisk-From-Source/Prerequisites/Checking-Asterisk-Requirements/)

1. **Přejděte do složky:**

   ```sh
   cd asterisk-18.26.1
   ```

2. **Instalace závislostí:**

   ```sh
   sudo ./contrib/scripts/install_prereq install
   ```

3. **Spuštění konfigurace:**

   ```sh
   ./configure
   ```

   Po úspěšném dokončení se zobrazí ASCII logo a informace o systému.

   ```sh

                  .$$$$$$$$$$$$$$$=..
               .$7$7..          .7$$7:.
             .$$:.                 ,$7.7
           .$7.     7$$$$           .$$77
        ..$$.       $$$$$            .$$$7
       ..7$   .?.   $$$$$   .?.       7$$$.
      $.$.   .$$$7. $$$$7 .7$$$.      .$$$.
    .777.   .$$$$$$77$$$77$$$$$7.      $$$,
    $$$~      .7$$$$$$$$$$$$$7.       .$$$.
   .$$7          .7$$$$$$$7:          ?$$$.
   $$$          ?7$$$$$$$$$$I        .$$$7
   $$$       .7$$$$$$$$$$$$$$$$      :$$$.
   $$$       $$$$$$7$$$$$$$$$$$$    .$$$.
   $$$        $$$   7$$$7  .$$$    .$$$.
   $$$$             $$$$7         .$$$.
   7$$$7            7$$$$        7$$$
    $$$$$                        $$$
     $$$$7.                       $$  (TM)
      $$$$$$$.           .7$$$$$$  $$
        $$$$$$$$$$$$7$$$$$$$$$.$$$$$$
          $$$$$$$$$$$$$$$$.

   configure: Package configured for:
   configure: OS type  : linux-gnu
   configure: Host CPU : aarch64
   configure: build-cpu:vendor:os: aarch64 : unknown : linux-gnu :
   configure: host-cpu:vendor:os: aarch64 : unknown : linux-gnu :

   ~/asterisk-18.26.1 $
   ```

### Kompilace a instalace

:link: [Oficiální dokumentace - Build & Install](https://docs.asterisk.org/Getting-Started/Installing-Asterisk/Installing-Asterisk-From-Source/Building-and-Installing-Asterisk/)

```sh
make
sudo make install
```

## Inicializační skripty

:link: [Oficiální dokumentace - Init Scripts](https://docs.asterisk.org/Getting-Started/Installing-Asterisk/Installing-Asterisk-From-Source/Installing-Initialization-Scripts/)

```sh
sudo make config
sudo make install-logrotate
sudo make samples
```

## Konfigurace Asterisk serveru

1. **Otevření složky s konfigurací:**

   ```sh
   cd /etc/asterisk/
   ```

2. **Úprava `sip.conf` a `extensions.conf`**

   :::tip
   Na konec souboru můžeme skočit pomocí zkratky `ctrl + /`. Číslo řádku bude `-1`
   :::

   ::: code-group

   ```ini [sip.conf]
   ;TEMPLATE
   ;------------------------------------------------------------------------------------------
   ;[tel1]                 ; ID uzivatele
   ;secret=Tel123          ; heslo
   ;context=locals         ; kontext, vaze uzivatele k dialplanu vytvorenem v extentions.conf
   ;type=friend
   ;host=dynamic

   [jarmil]
   secret=Jarmil123
   context=locals
   type=friend
   host=dynamic

   [andela]
   secret=Andela123
   context=locals
   type=friend
   host=dynamic

   ```

   ```ini [extensions.conf]
   [locals]                        ; kontext, vaze dialplan k uzivatelum v sip.conf
   exten => 123,1,dial(SIP/jarmil) ; zavolame jarmilovi, kdyz nekdo vytoci '123'
   exten => 321,1,dial(SIP/andela)

   ```

3. **Úprava `modules.conf`:**

   Najděte řádek `noload = chan_sip.so` a zakomentujte ho:

   ```ini:line-numbers=44
   noload = res_hep.so
   noload = res_hep_pjsip.so
   noload = res_hep_rtcp.so
   ;
   ; Do not load chan_sip by default, it may conflict with res_pjsip.
   noload = chan_sip.so    ;[!code --]
   ;[!code ++]
   ; noload = chan_sip.so
   ;
   ; Load one of the voicemail modules as they are mutually exclusive.
   ; By default, load app_voicemail only (automatically).
   ;

   ```

### Ověření

### Spuštění Asterisku

```sh
sudo asterisk -cvvvvv
```

:::tip
V Asterisk konzoli použijte `help` pro nápovědu.
:::

### Kontrola `sip.conf`

1. **Načtení:**

   ```sh
   sip reload
   ```

2. **Zobrazení uživatelů:**

   ```sh
   sip show users
   ```

Očekávaný výstup:

```sh
*CLI> sip show users
Username                   Secret           Accountcode      Def.Context      ACL  Forcerport
jarmil                     Jarmil123                         locals           No   No
andela                     Andela123                         locals           No   No

```

### Kontrola `extensions.conf`

1. **Reload dialplanu:**

   ```sh
   dialplan reload
   ```

2. **Zobrazení dialplanu:**

   ```sh
   dialplan show locals
   ```

Očekávaný výstup:

```sh
*CLI> dialplan show locals
[ Context 'locals' created by 'pbx_config' ]
  '123' =>          1. dial(SIP/jarmil)                           [extensions.conf:916]
  '321' =>          1. dial(SIP/andela)                           [extensions.conf:917]

-= 2 extensions (2 priorities) in 1 context. =-

```

## Nastavení telefonu Linksys a Cisco

IP adresa telefonu se získá z menu (tlačítko :page_facing_up:) -> Network. Lze použít i zkratku menu -> 9.

Přihlašte se do webového rozhraní IP telefonu -> Admin login (vpravo nahoře) -> Ext1 a vyplnit následující údaje:

| Klíč     | Hodnota                                  |
| -------- | ---------------------------------------- |
| Proxy IP | adresa Asterisk serveru                  |
| User ID  | Identifikátor ze sip.conf (ID uzivatele) |
| Password | Heslo ze sip.conf (heslo uzivatele)      |
