# urp-js

Javascript implementation of the binary protocol for URP, the universal realtime protocol.

# Briteback

At Briteback we use Deepstream and will be aiming at fixing and improving
Deepstream with some fixes and suggestions we have found might be useful.

## Fixes

[] fix bottleneck on client with with "ack registry"
[] fix crashes on closed sockets
[] fix socket leaks
[] fix records hanging and not sending update events for subscriptions
[] fix clients not able to reconnect after server restart
