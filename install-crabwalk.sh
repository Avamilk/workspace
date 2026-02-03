#!/bin/bash
set -e

VERSION=$(curl -s https://api.github.com/repos/luccast/crabwalk/releases/latest | grep '"tag_name"' | cut -d'"' -f4)
echo "Installing Crabwalk ${VERSION}..."

mkdir -p ~/.crabwalk ~/.local/bin
curl -sL "https://github.com/luccast/crabwalk/releases/download/${VERSION}/crabwalk-${VERSION}.tar.gz" | tar -xz -C ~/.crabwalk
cp ~/.crabwalk/bin/crabwalk ~/.local/bin/
chmod +x ~/.local/bin/crabwalk

echo "🦀 Crabwalk ${VERSION} installed"
echo "Run 'crabwalk' to start the server"
