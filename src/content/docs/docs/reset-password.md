---
title: Reset a password
description: Reset any Kivo account's password from the server's command line.
---

Kivo sends no email, so a forgotten password is reset by whoever runs the server, from the command line. It works for any account, including the only admin's, and the server can keep running.

```sh
docker exec -it kivo kivo reset-password alice
```

It asks for the new password twice, without showing it. To script it, give the password on stdin instead, as one line:

```sh
echo 'the new password' | docker exec -i kivo kivo reset-password alice
```

The password is never an argument, since shell history and `ps` would keep it. It must be 8 to 1024 bytes, as anywhere in Kivo.

The account is signed out everywhere: every browser and app it was signed in on is refused from its next request and signs in again with the new password. Its API keys keep working.

Run as root, which is how `docker exec` runs, the command becomes the user that owns the database (your `PUID:PGID`) before opening it, as the server does, so nothing in `/data` ends up owned by root.

Outside Docker, run `kivo reset-password [-config path] <username>` with the server's `server.toml` or `KIVO_*` environment, so it finds the same database.
