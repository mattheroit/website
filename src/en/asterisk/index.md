# Asterisk: Instalation and configuration on Raspberry Pi

## Preparing the Raspberry Pi

1. **Enable SSH**  
   Use Raspberry Pi Imager or `raspi-config` to enable SSH.

2. **Connect via SSH**

   ```sh
      ssh <username>@<RPI_IP_ADDRESS>
   ```

3. **Set a static IP Address**  
   Follow the [guide here][rpi-static-ip].

4. **Update the OS**

   ```sh
    sudo apt-get update
    sudo apt-get upgrade
   ```

5. **Restart RPi**

   ```sh
   sudo shutdown -r 0
   ```

6. **Reconnect via SSH**

## Downloading Asterisk

1. **Downloading the latest version:**

   ```sh
   wget https://downloads.asterisk.org/pub/telephony/asterisk/asterisk-18-current.tar.gz
   ```

2. **Extract the archive:**

   ```sh
   tar -xvzf asterisk-18-current.tar.gz
   ```

### Configuring Asterisk

:link: [Official Documentation - Prerequisites][prerequisites]

1. **Navigate to the folder:**

   ```sh
   cd asterisk-18.26.1
   ```

2. **Install dependencies:**

   ```sh
   sudo ./contrib/scripts/install_prereq install
   ```

3. **Run configuration:**

   ```sh
   ./configure
   ```

   Upon successful completion, the ASCII logo and system information will appear.

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

### Compilation and Installation

:link: [Official Documentation - Build & Install][build-install]

```sh
make
sudo make install
```

## Initialization scripts

:link: [Official Documentation - Init Scripts][init-scripts]

```sh
sudo make config
sudo make install-logrotate
sudo make samples
```

## Asterisk server configuration

1. **Open the configuration folder:**

   ```sh
   cd /etc/asterisk/
   ```

2. **Edit `sip.conf` and `extensions.conf`**

   :::tip
   If you are using `nano` to edit files. You can jump to the end of the file using the shortcut `ctrl + /`. The line number will be `-1`.
   :::

   :::code-group

   ```ini [sip.conf]
   ;TEMPLATE
   ;------------------------------------------------------------------------------------------
   ;[tel1]                 ; user ID
   ;secret=Tel123          ; password
   ;context=locals         ; context, links user to a dialplan created in extensions.conf
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
   [locals]                        ; context, links dialplan to users in sip.conf
   exten => 123,1,dial(SIP/jarmil) ; call jarmil when someone dials '123'
   exten => 321,1,dial(SIP/helena)

   ```

3. **Edit `modules.conf`:**

   Find the line `noload = chan_sip.so` and comment it out:

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

## Verification

### Starting Asterisk

```sh
sudo asterisk -cvvvvv
```

:::tip
In the Asterisk console, use `help` for assistance.
:::

### Checking `sip.conf`

1. **Reload:**

   ```sh
   sip reload
   ```

2. **Show users:**

   ```sh
   sip show users
   ```

Expected output:

```sh
*CLI> sip show users
Username                   Secret           Accountcode      Def.Context      ACL  Forcerport
jarmil                     Jarmil123                         locals           No   No
helena                     helena123                         locals           No   No

```

### Checking `extensions.conf`

1. **Reload dialplan:**

   ```sh
   dialplan reload
   ```

2. **Show dialplan:**

   ```sh
   dialplan show locals
   ```

Expected output:

```sh
*CLI> dialplan show locals
[ Context 'locals' created by 'pbx_config' ]
  '123' =>          1. dial(SIP/jarmil)                           [extensions.conf:916]
  '321' =>          1. dial(SIP/helena)                           [extensions.conf:917]

-= 2 extensions (2 priorities) in 1 context. =-

```

## Linksys and Cisco Phone Setup

The phone's IP address can be found in the menu (button :page_facing_up:) -> Network. You can also use the shortcut for menu -> 9.

On your PC, log in to the IP phone's web interface -> Admin login (top right) -> Ext1 and fill in the following details:

| Key      | Value                                  |
| -------- | -------------------------------------- |
| Proxy IP | Asterisk server address                |
| User ID  | Identifier from sip.conf (user ID)     |
| Password | Password from sip.conf (user password) |

<!-- Links -->

[rpi-static-ip]: https://raspberrytips.com/set-static-ip-address-raspberry-pi/#set-a-static-ip-via-the-command-line
[prerequisites]: https://docs.asterisk.org/Getting-Started/Installing-Asterisk/Installing-Asterisk-From-Source/Prerequisites/Checking-Asterisk-Requirements/
[build-install]: https://docs.asterisk.org/Getting-Started/Installing-Asterisk/Installing-Asterisk-From-Source/Building-and-Installing-Asterisk/
[init-scripts]: https://docs.asterisk.org/Getting-Started/Installing-Asterisk/Installing-Asterisk-From-Source/Installing-Initialization-Scripts/
