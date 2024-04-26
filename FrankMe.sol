// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.25;

contract FrankMe {
    address payable public contractOwner;

    constructor() {
        contractOwner = payable(msg.sender);
    }

    // Define a struct to represent a digital asset
    struct DigitalAsset {
        address payable creator;
        uint256 price;
        bool exist;
        string link;
    }

    // Mapping digital assets with their IDs
    mapping(uint256 => DigitalAsset) public digitalAssets;

    event AssetCreated(uint256 assetId, address creator, uint256 price, string link);
    event TransferToOwner(address indexed owner, uint256 amount);
    event TransferToCreator(address indexed creator, uint256 amount);

    modifier onlyCreator(uint256 _assetId) {
        require(msg.sender == digitalAssets[_assetId].creator, "Only asset creator can access this function");
        _;
    }
    // Function to Create a digital asset
    function createAsset(uint256 _assetId, uint256 _price, string memory _link) public {
        require(!digitalAssets[_assetId].exist, "Asset ID already in use");

        digitalAssets[_assetId] = DigitalAsset(payable(msg.sender), _price, true, _link);

        emit AssetCreated(_assetId, msg.sender, _price, _link);
    }

    // Function to purchase a digital asset
    function purchaseAsset(uint256 _assetId) external payable returns (string memory) {
        require(digitalAssets[_assetId].exist, "Asset not available for purchase");
        require(msg.value >= digitalAssets[_assetId].price, "Insufficient funds");

        uint256 amountToOwner = msg.value * 10 / 100;
        uint256 amountToCreator = msg.value - amountToOwner;

        contractOwner.transfer(amountToOwner);
        emit TransferToOwner(contractOwner, amountToOwner);

        digitalAssets[_assetId].creator.transfer(amountToCreator);
        emit TransferToCreator(digitalAssets[_assetId].creator, amountToCreator);

        return getAssetLink(_assetId);
    }

    // Function to get details of a digital asset by its ID
    function getAssetDetails(uint256 _assetId) public view onlyCreator(_assetId) returns (address creator, uint256 price, bool exist, string memory link) {
        require(digitalAssets[_assetId].exist, "Asset not found");
        DigitalAsset memory asset = digitalAssets[_assetId];
        return (asset.creator, asset.price, asset.exist, asset.link);
    }

    // Function to get the link of a digital asset by its ID
    function getAssetLink(uint256 _assetId) private view returns (string memory) {
        require(digitalAssets[_assetId].exist, "Asset not found");
        return digitalAssets[_assetId].link;
    }
}