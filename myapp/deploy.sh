pwd
printf '%s\n' "$KEYFILE" > keyfile.json
echo "$TRAVIS_BUILD_DIR"
printf '%s\n' "$KEYFILE" > "$TRAVIS_BUILD_DIR/keyfile.json"
serverless deploy