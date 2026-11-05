---
title: Getting started
description: Install the Kivo server with Docker and set it up in a browser.
---

The Kivo server runs on the computer or NAS that has your media files. It's available as a Docker image today; native builds for Linux and Windows are coming soon.

## Install with Docker

```sh
docker run -d --name kivo \
  --network host \
  -v /path/to/config:/config \
  -v /path/to/data:/data \
  -v /path/to/cache:/cache \
  -v /path/to/media:/media:ro \
  --device /dev/dri \
  ghcr.io/kivodev/kivo:latest
```

Replace each `/path/to/...` with a folder on your server:

| Folder | What it holds |
| --- | --- |
| `/config` | Settings. |
| `/data` | The database. Keep it on a local disk, not a network share. |
| `/cache` | Artwork and transcoding files. Safe to lose. |
| `/media` | Your movies, shows and audiobooks. Kivo only reads it, so it can be mounted read-only. |

`--device /dev/dri` gives Kivo an Intel or AMD GPU for hardware transcoding. Leave it out to transcode on the CPU.

Host networking (`--network host`) lets the apps find the server on your network by themselves. If you'd rather publish only the port, use `-p 8484:8484` instead, and enter the server's address in each app.

## First run

Open `http://your-server:8484` in a browser, using your server's name or IP address. The setup wizard walks you through creating an admin account and adding your libraries.

Kivo then scans your folders, identifies what's there and fetches artwork and details. Large libraries take a while the first time; you can start watching while it works.

## Next steps

- [Get the apps](/docs/apps/) for your phone, TV and other devices.
- [Set up remote access](/docs/remote-access/) to watch away from home.
