# Asterisk: Instalace a konfigurace na Raspberry Pi

## Příprava Raspberry Pi

1. **Povolení SSH**  
   Použijte Raspberry Pi Imager nebo `raspi-config` pro zapnutí SSH.

2. **Připojení přes SSH**

   ```sh
   ssh <uzivatel>@<IP_ADRESA_RPI>
   ```

3. **Nastavení statické IP adresy**  
   Postupujte dle [návodu zde][rpi-static-ip].

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

:link: [Oficiální dokumentace - Prerequisites][prerequisites]

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

### Kompilace a Instalace

:link: [Oficiální dokumentace - Build & Install][build-install]

```sh
make
sudo make install
```

## Inicializační skripty

:link: [Oficiální dokumentace - Init Scripts][init-scripts]

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
   Pokud používate `nano` na úpravu souborů. Můžete na konec souboru skočit pomocí zkratky `ctrl + /`. Číslo řádku bude `-1`.
   :::

   :::code-group

   ```ini [sip.conf]
   ;TEMPLATE
   ;------------------------------------------------------------------------------------------
   ;[tel1]                 ; ID uzivatele
   ;secret=Tel123          ; heslo
   ;context=locals         ; kontext, vaze uzivatele k dialplanu vytvorenem v extensions.conf
   ;type=friend
   ;host=dynamic

   [jarmil]
   secret=Jarmil123
   context=locals
   type=friend
   host=dynamic

   [helena]
   secret=Helena123
   context=locals
   type=friend
   host=dynamic

   ```

   ```ini [extensions.conf]
   [locals]                        ; kontext, vaze dialplan k uzivatelum v sip.conf
   exten => 123,1,dial(SIP/jarmil) ; zavolame jarmilovi, kdyz nekdo vytoci '123'
   exten => 321,1,dial(SIP/helena)

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

## Ověření

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
helena                     helena123                         locals           No   No

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
  '321' =>          1. dial(SIP/helena)                           [extensions.conf:917]

-= 2 extensions (2 priorities) in 1 context. =-

```

## Nastavení telefonu Linksys a Cisco

IP adresa telefonu se získá z menu (tlačítko :page_facing_up:) -> Network. Lze použít i zkratku menu -> 9.

Na počítači se přihlašte do webového rozhraní IP telefonu -> Admin login (vpravo nahoře) -> Ext1 a vyplnit následující údaje:

| Klíč     | Hodnota                                  |
| -------- | ---------------------------------------- |
| Proxy IP | adresa Asterisk serveru                  |
| User ID  | Identifikátor ze sip.conf (ID uzivatele) |
| Password | Heslo ze sip.conf (heslo uzivatele)      |

<!-- Links -->

[rpi-static-ip]: https://raspberrytips.com/set-static-ip-address-raspberry-pi/#set-a-static-ip-via-the-command-line
[prerequisites]: https://docs.asterisk.org/Getting-Started/Installing-Asterisk/Installing-Asterisk-From-Source/Prerequisites/Checking-Asterisk-Requirements/
[build-install]: https://docs.asterisk.org/Getting-Started/Installing-Asterisk/Installing-Asterisk-From-Source/Building-and-Installing-Asterisk/
[init-scripts]: https://docs.asterisk.org/Getting-Started/Installing-Asterisk/Installing-Asterisk-From-Source/Installing-Initialization-Scripts/
