// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.25;

contract FrankMeV2 {
    
    struct DigitalAsset {
        string id;
        uint256 sellerId;
        uint256 price;
        bool exist;
        string link;
        uint256 timestamp;
        uint256 downloads;
    }
    
    mapping(string => DigitalAsset) private digitalAssets;
    mapping(uint256 => DigitalAsset[]) private digitalAssetsBySeller;
    mapping(string => DigitalAsset) private DigitalAssetByLink;

    event AssetAdded(string indexed id, uint256 sellerId, uint256 price, string link, uint256 timestamp);
    
    function addDigitalAsset(string memory _id, uint256 _sellerId, uint256 _price, string memory _link) public {
        require(!digitalAssets[_id].exist, "Asset with this ID already exists");
        require(!DigitalAssetByLink[_link].exist, "Asset with this link already exists");
        
        digitalAssets[_id] = DigitalAsset({
            id: _id,
            sellerId: _sellerId,
            price: _price,
            exist: true,
            link: _link,
            timestamp: block.timestamp,
            downloads: 0
        });

        digitalAssetsBySeller[_sellerId].push(digitalAssets[_id]);
        DigitalAssetByLink[_link] =digitalAssets[_id];

        emit AssetAdded(_id, _sellerId, _price, _link, digitalAssets[_id].timestamp);
    }

    function getDigitalAssetsBySeller(uint256 _sellerId) external view returns (DigitalAsset[] memory) {
        require(digitalAssetsBySeller[_sellerId].length > 0, "Seller does not exist");
        return digitalAssetsBySeller[_sellerId];
    }

    function getDigitalAssetByLink(string memory _link) external view returns (string memory id, uint256 sellerId, uint256 price, bool exist, uint256 timestamp, uint256 downloads) {
        DigitalAsset storage asset = DigitalAssetByLink[_link];
        require(asset.exist, "Asset with this link does not exist");
        return (asset.id, asset.sellerId, asset.price, asset.exist, asset.timestamp, asset.downloads);
    }
}
