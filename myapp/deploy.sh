printf '%s\n' "$KEYFILE" > "$TRAVIS_BUILD_DIR/keyfile.json"
serverless deploy