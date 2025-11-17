set -x

docker build \
    -t ghcr.io/agaman1792/newwork-assignment-be:0.0.1 \
    --label "org.opencontainers.image.source=https://github.com/agaman1792/newwork-assignment-be" \
    --label "org.opencontainers.image.description=Newwork assignment back-end" \
    --label "org.opencontainers.image.licenses=MIT" \
    .

set +x
