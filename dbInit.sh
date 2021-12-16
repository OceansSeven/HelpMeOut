sudo apt update -y
sudo apt install postgresql postgresql-contrib

git clone https://github.com/OceansSeven/HelpMeOut.git

cd HelpMeOut

sudo psql -h localhost -d postgres -U postgres -f ./schema.SQL
