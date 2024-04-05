Project: Decentralized Chat App

Project Objective:
- Revolutionizing the way users connect and interact in the digital world
- Focus on privacy, security, and user empowerment
- Offers innovative features to enhance the social experience
- Seamlessly connects users, fosters meaningful conversations, and enables secure sharing

Project Features:
- Decentralization
- Security
- Immutable Chat History
- Transparency
- Improved Speed & Efficiency
- Ownership of Data

Technologies used:
- Next.js
- solidity
- hardhat + metaMask for testing

Achievements:
- Provides a decentralized and censorship-resistant environment
- Prioritizes user privacy, security, and control
- Empowers users to shape the future of social networking
- Seamless feedback process for patients
- Offers comprehensive features for account customization, group chats, and multimedia messaging

Team:
- Hussein Daher
- Haya Tfaily
- Loreen Baker
- Zeinab Hijazi

Steps to Follow:
- download metaMask extension base on your browser (metaMask for chrome or Edge ...)
- Follow the steps provided by metaMask to create an account (save the metaMask password in a secure place, you will need it later)
- on metaMask go to : Networks > Add a network > Add a network manually -> then enter those info:
  Network name: Localhost 8545
  New RPC URL: http://localhost:8545
  Chain ID: 31337
  Currency symbol: ETH
then click save
- Now you can clone this repo by using this command in Git Bash : git clone https://github.com/husdah/ChatApp.git 
- then in powershell , direct to repo folder then enter : npm install       (to download project libraries)
- then: npm install --only=dev       (to download hardhat and its tools for testing)
- Delete the folders: artifacts and cache (IF exist)
- now in a new powershell run: npx hardhat node     (this command will activate the hardhat and will provide you with 20 free account for testing)
- now in a new powershell run: npx hardhat run scripts/deploy.js --network localhost    (this command will create the folders artifacts and cache)
- now move the file ChatApp.json (which exist in the generated folder artifacts/contracts) to the folder Context and replace it with the old ChatApp.json file
- now in a new powershell run : npm run dev
- the metaMask extension will popup and ask for your password. Enter the password the refresh the page. IF not (only the first time): in the metaMask extension, go to more > Connected sites > then connect to the current site (in this case is our website)
- in the selected network : make sure that the new created Network (Localhost 8545) is selected
- now from the powershell choose an account from the given 20 free accounts and copy its Private Key
- now on the metaMask extension (in the middle part) , click on the account > Add account or hardware wallet > import Account > paste the private key then import ( make sure the selected Type is Private Key)
- make sure the account is connected to the current site ( a green circle will appear on the right side)
- now if everything above is working fine , you should see a free 10000 ETH (or $32,200,100.00 USD) in your free account 
- you are now able to use all website functionalities without any issues
