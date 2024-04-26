// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.25;

contract FrankMe {
    address payable public contractOwner; // Address of the contract owner

    constructor() {
        contractOwner = payable(msg.sender); // Set the contract owner to the deployer's address
    }

    // Define a struct to represent a digital asset
    struct DigitalAsset {
        address payable creator; // Address of the creator
        uint256 price; // Price of the asset
        bool isAvailable; // Flag to indicate if the asset is available for purchase
        string link; // Link to the digital asset
    }

    // Mapping to store digital assets with their unique IDs
    mapping(uint256 => DigitalAsset) public digitalAssets;

    // Event to log asset creation
    event AssetCreated(uint256 assetId, address creator, uint256 price, string link);

    // Event to log transfer to owner
    event TransferToOwner(address indexed owner, uint256 amount);

    // Event to log transfer to creator
    event TransferToCreator(address indexed creator, uint256 amount);

    // Function to create a new digital asset
    function createAsset(uint256 _assetId, uint256 _price, string memory _link) public {
        // Check if the asset ID is not already in use
        require(!digitalAssets[_assetId].isAvailable, "Asset ID already in use");

        // Create the asset and store it in the mapping
        digitalAssets[_assetId] = DigitalAsset(payable(msg.sender), _price, true, _link);

        // Emit an event to log asset creation
        emit AssetCreated(_assetId, msg.sender, _price, _link);
    }

    // Function to purchase a digital asset
    function purchaseAsset(uint256 _assetId) external payable returns (string memory)  {
        // Check if the asset is available for purchase
        require(digitalAssets[_assetId].isAvailable, "Asset not available for purchase");
        // Check if the sent value is equal to or greater than the asset price
        require(msg.value >= digitalAssets[_assetId].price, "Insufficient funds");

        uint256 amountToOwner = msg.value * 10 / 100; // 10% of the payment
        uint256 amountToCreator = msg.value - amountToOwner; // 90% of the payment

        // Transfer 10% of the payment to the contract owner
        contractOwner.transfer(amountToOwner);
        // Emit event for transfer to owner
        emit TransferToOwner(contractOwner, amountToOwner);

        // Transfer 90% of the payment to the asset creator
        digitalAssets[_assetId].creator.transfer(amountToCreator);
        // Emit event for transfer to creator
        emit TransferToCreator(digitalAssets[_assetId].creator, amountToCreator);

        // Mark the asset as no longer available for purchase
        digitalAssets[_assetId].isAvailable = false;
        return getAssetLink(_assetId);
    }

    // Function to get details of a digital asset by its ID
    function getAssetDetails(uint256 _assetId) public view returns (address creator, uint256 price, bool isAvailable, string memory link) {
        require(digitalAssets[_assetId].isAvailable, "Asset not found");
        DigitalAsset memory asset = digitalAssets[_assetId];
        return (asset.creator, asset.price, asset.isAvailable, asset.link);
    }

    // Function to get the link of a digital asset by its ID
    function getAssetLink(uint256 _assetId) public view returns (string memory) {
        require(digitalAssets[_assetId].isAvailable, "Asset not found");
        return digitalAssets[_assetId].link;
    }
}
