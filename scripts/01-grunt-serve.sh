#!/usr/bin/env bash

# The next three lines are for the go shell.
export SCRIPT_NAME="grunt serve"
export SCRIPT_HELP="Serve the app via Grunt."
[[ "$GOGO_GOSH_SOURCE" -eq 1 ]] && return 0

# Normal script execution starts here.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"/../
source "$DIR"/env.sh || exit 1

# Pull in gosh contrib support for node and ruby
use_gosh_contrib || exit 1

assert_env GOSH_CONTRIB_NODE_NPM_MODPATH || exit 1
assert_env GOSH_CONTRIB_NODE_NPM_PKGJSON || exit 1

# Create the node environment if needed...
create_node_env || exit 1
# ... and use it.
export PATH="$GOSH_CONTRIB_NODE_NPM_MODPATH/node_modules/.bin":$PATH

assert_env GOSH_CONTRIB_RUBY_GEMPATH || exit 1
assert_env GOSH_CONTRIB_RUBY_GEMFILE || exit 1

# Create the node environment if needed...
create_gem_path || exit 1
# ... and use it.
export PATH="$GOSH_CONTRIB_RUBY_GEMPATH/bin":$PATH

cd "$DIR" || exit 1
echo $PATH | vim -
require_cmd "bower" || exit 1  # installed via npm
require_cmd "grunt" || exit 1  # installed via npm
require_cmd "compass" || exit 1  # needs to be manually installed
echo -n "Running 'bower install'... "
bower install || exit 1
echo "done"
grunt serve

