#!/usr/bin/env bash

# The next three lines are for the go shell.
export SCRIPT_NAME="grunt serve"
export SCRIPT_HELP="Serve the app via Grunt."
[[ "$GOGO_GOSH_SOURCE" -eq 1 ]] && return 0

# Normal script execution starts here.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"/../
source "$DIR"/env.sh || exit 1
assert_env "$SCRIPTS" || exit 1
"$SCRIPTS"/grunt.sh build

