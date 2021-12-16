sudo apt update -y

git clone https://github.com/OceansSeven/HelpMeOut.git

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

. ~/.nvm/nvm.sh

nvm install node

cd HelpMeOut

npm install

