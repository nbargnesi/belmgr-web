#!/usr/bin/env bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Pull in standard functions, e.g., default.
source "$DIR/.gosh.sh" || return 1
default CUSTOM_ENV_SH "$DIR/env.sh.custom"
assert_source "$CUSTOM_ENV_SH" || return 1

### GENERAL ENV VARS ###
default DIR             "$DIR"
default CUSTOM_ENV_SH   "$DIR/env.sh.custom"

### NODE/NPM ENV VARS ###
default NPM_MODPATH     "$DIR"/node_modules
default NPM_PKGJSON     "$DIR"/package.json

### THE GO SHELL ###
default GOSH_SCRIPTS    "$DIR"/scripts
default GOSH_CONTRIB    "$DIR"/scripts/gosh-contrib
