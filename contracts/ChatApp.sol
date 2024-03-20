//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp{

    //USER STRUCT
    struct user{
        string name;
        string profileImage; // Add profile image field
        friend[] friendList;
    }

    struct friend{
        address pubkey;
        string name;
        string profileImage; // Add profile image field
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
        string fileHash; // Add this field for file metadata
        string audioData;
        string msgType;
    }

    struct AllUserStruck{
        string name;
        address accountAddress;
        string profileImage; // Add profile image field
    }

    struct Group {
        string name;
        address[] members;
    }

    // Define a struct for member details
    struct Member {
        string name;
        address memberAddress;
        string profileImage; // Add profile image field
    }

    // Define a struct for group details
    struct GroupDetails {
        string name;
        bytes32 groupHash;
        Member[] members;
    }

    AllUserStruck[] getAllUsers;

    mapping(address =>  user) userList;
    mapping(bytes32 => message[]) allMessages;
    mapping(bytes32 => Group) groups;
    mapping(address => bytes32[]) userGroups;
    mapping(address => string) public usernames; // Mapping to store usernames

    //CHECK USER EXIST
    function checkUserExists(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    } 

    //CREATE ACCOUNT
    function createAccount(string calldata name) external {
        string memory profileImage = '';  //QmWrj6pVXGY76fd5a8sHBRFq8Njwzt3BxYTC45a9MUFYnB
        require(checkUserExists(msg.sender) == false, "User already exist");
        require(bytes(name).length > 0, "Username cannot be empty");
        userList[msg.sender].name = name;
        userList[msg.sender].profileImage = profileImage; // Store profile image
        usernames[msg.sender] = name; // Store username in the mapping

        getAllUsers.push(AllUserStruck(name, msg.sender, profileImage));
    }

    //GET USERNAME
    function getUsername(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    //GET USERIMAGE
    function getUserImage(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].profileImage;
    }

    // Update user's username
    function updateUsername(string calldata newUsername) external {
        require(bytes(newUsername).length > 0, "Username cannot be empty");

        // Update the username
        usernames[msg.sender] = newUsername;
        userList[msg.sender].name = newUsername;
        for (uint256 i = 0; i < getAllUsers.length; i++) {
            if (getAllUsers[i].accountAddress == msg.sender) {
                getAllUsers[i].name = newUsername;
                break;
            }
        }
    }

    // Update profile image function
    function updateProfileImage(string calldata newProfileImage) external {
        require(checkUserExists(msg.sender), "User does not exist");
        
        // Update the profile image
        userList[msg.sender].profileImage = newProfileImage;
        
        // Update profile image in the getAllUsers array
        for (uint256 i = 0; i < getAllUsers.length; i++) {
            if (getAllUsers[i].accountAddress == msg.sender) {
                getAllUsers[i].profileImage = newProfileImage;
                break;
            }
        }
    }


    //ADD FRIENDS
    function addFriend(address friend_key, string calldata name, string calldata profileImage) external{
        require(checkUserExists(msg.sender), "Create an Account first");
        require(checkUserExists(friend_key), "User is not registered!");
        require(msg.sender != friend_key, "Users cannot add themeselves as friends");
        require(checkAlreadyFriends(msg.sender, friend_key) == false, "These users are already friends");


        _addFriend(msg.sender, friend_key, name, profileImage);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name, userList[msg.sender].profileImage);
        usernames[friend_key] = name; // Store friend's username in the mapping
    }

    //checkAlreadyFriends
    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns (bool) {
        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
            address tmp  = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for(uint256 i = 0 ; i < userList[pubkey1].friendList.length; i++){
            if(userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }

        return false;
    }

    function _addFriend(address me, address friend_key, string memory name, string memory profileImage) internal {
        friend memory newFriend = friend(friend_key, name, profileImage);
        userList[me].friendList.push(newFriend);
    }

    //GET MY FRIENDS
    function getMyFriendList() external view returns (friend[] memory){
        return userList[msg.sender].friendList;
    }

    
    //get chat code
    function _getChatCode(address pubkey1,address pubkey2) internal pure returns(bytes32){
        if(pubkey1 < pubkey2){
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        }else return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    //SEND MESSAGE 
    function sendMessage(address friend_key, string calldata _msg, string calldata fileHash, string calldata audioData, string calldata msgType) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(checkAlreadyFriends(msg.sender, friend_key), "You are not friend with the given user");
        require(bytes(msgType).length > 0, "Message type cannot be empty");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg, fileHash, audioData , msgType);
        allMessages[chatCode].push(newMsg);
    }

    //READ MESSAGE
    function readMessage(address friend_key) external view returns(message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    //DELETE CHAT
    function clearChat(address friend_key) external {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);

        // Delete all messages associated with the chat code
        delete allMessages[chatCode];
    }

    function getAllAppUser() public view returns(AllUserStruck[] memory){
        return getAllUsers;
    }

    //GROUP
    // Function to create a new group
    function createGroup(string calldata groupName, address[] calldata initialMembers) external {
        bytes32 groupHash = keccak256(abi.encodePacked(groupName, block.timestamp)); // Include timestamp for uniqueness
        require(groups[groupHash].members.length == 0, "Group already exists");
        
        Group memory newGroup;
        newGroup.name = groupName;
        newGroup.members = initialMembers;
        groups[groupHash] = newGroup;
        
        for(uint256 i = 0; i < initialMembers.length; i++) {
            userGroups[initialMembers[i]].push(groupHash);
        }
    }

    // Function to add members to a group
    function addMembersToGroup(bytes32 groupHash, address[] calldata newMembers) external {
        require(groups[groupHash].members.length > 0, "Group does not exist");
        // Additional checks can be added here to ensure only authorized users can add members
        
        for(uint256 i = 0; i < newMembers.length; i++) {
            groups[groupHash].members.push(newMembers[i]);
            userGroups[newMembers[i]].push(groupHash);
        }
    }

    // Function to get groups that a user is a member of
    function getGroupsForUser(address userAddress) external view returns (GroupDetails[] memory) {
        bytes32[] memory groupHashes = userGroups[userAddress];
        GroupDetails[] memory userGroupsArray = new GroupDetails[](groupHashes.length);
        
        for(uint256 i = 0; i < groupHashes.length; i++) {
            Group storage group = groups[groupHashes[i]];
            address[] memory memberAddresses = group.members;
            Member[] memory membersArray = new Member[](memberAddresses.length);
            
            for(uint256 j = 0; j < memberAddresses.length; j++) {
                membersArray[j] = Member(usernames[memberAddresses[j]], memberAddresses[j], userList[memberAddresses[j]].profileImage);
            }
            
            userGroupsArray[i] = GroupDetails(group.name, groupHashes[i], membersArray);
        }

        return userGroupsArray;
    }

    // Function to send a message within a group
    function sendGrpMessage(bytes32 groupHash, string calldata _msg, string calldata fileHash, string calldata audioData, string calldata msgType) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(groups[groupHash].members.length > 0, "Group does not exist");
        require(isMemberOfGroup(msg.sender, groupHash), "You are not a member of this group");
        require(bytes(msgType).length > 0, "Message type cannot be empty");

        message memory newMsg = message(msg.sender, block.timestamp, _msg, fileHash, audioData , msgType);
        allMessages[groupHash].push(newMsg);
    }

    // Function to read messages of a group
    function readGroupMessages(bytes32 groupHash) external view returns (message[] memory) {
       /*  require(groups[groupHash].members.length > 0, "Group does not exist");
        require(isMemberOfGroup(msg.sender, groupHash), "You are not a member of this group");
 */
        return allMessages[groupHash];
    }

    // Additional helper function to check if a user is a member of a group
    function isMemberOfGroup(address userAddress, bytes32 groupHash) internal view returns (bool) {
        address[] storage members = groups[groupHash].members;
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i] == userAddress) {
                return true;
            }
        }
        return false;
    }
}