---
title: Recording Packages
aliases:
  - Recording macOS Packages
---

# Recording macOS Packages

First, get macOS network interface ID

```bash
networksetup -listallhardwareports
```

```bash
sudo tcpdump -i en0 -n
```

- `tcpdump` is the name of macOS’s built-in packet trace tool.
- The `sudo` command causes `tcpdump` to run with privileges, which is necessary in order to record
  packets.
- The `-i en0` option tells `tcpdump` to record packets on the default Ethernet-like interface.
  Replace `en0` with the short interface name you determined in
  [Choose the Correct Interface](https://developer.apple.com/documentation/network/recording_a_packet_trace#3034663).
- The `-n` option tells tcpdump not to attempt to use reverse DNS to map IP addresses to names; such
  mapping is rarely useful on the modern Internet and it radically slows things down.

To output the dump,

```bash
sudo tcpdump -i en0 -w trace.pcap
```

To track iOS packets, attach the iOS devices as Remove Virtual Interface

```bash
rvictl -s b0e8fe73db17d4993bd549418bfbdba70a4af2b1
```

- `rvictl` is the name of the command that manipulates RVIs.
- `-s` tells `rvictl` to set up a new RVI.
- `b0e8fe73db17d4993bd549418bfbdba70a4af2b1` is the UDID of the iOS device to target. This UDID is
  just an example; you can find your device’s UDID in the Devices and Simulators window in Xcode.

https://developer.apple.com/documentation/network/recording_a_packet_trace
