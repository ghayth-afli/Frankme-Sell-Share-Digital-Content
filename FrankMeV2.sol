// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.25;

contract FrankMeV2 {
    
    struct DigitalAsset {
        string id;
        uint256 sellerId;
        uint256 price;
        bool exist;
        string linkId;
        uint256 timestamp;
        uint256 downloads;
    }
    
    mapping(string => DigitalAsset) private digitalAssets;
    mapping(uint256 => string[]) private digitalAssetsBySeller;
    mapping(string => string) private DigitalAssetBylinkId;

    event AssetAdded(string indexed id, uint256 sellerId, uint256 price, string linkId, uint256 timestamp);
    
    function addDigitalAsset(string memory _id, uint256 _sellerId, uint256 _price, string memory _linkId) public {
        require(!digitalAssets[_id].exist, "Asset with this ID already exists");
        require(!digitalAssets[DigitalAssetBylinkId[_linkId]].exist, "Asset with this linkId already exists");
        
        digitalAssets[_id] = DigitalAsset({
            id: _id,
            sellerId: _sellerId,
            price: _price,
            exist: true,
            linkId: _linkId,
            timestamp: block.timestamp,
            downloads: 0
        });

        digitalAssetsBySeller[_sellerId].push(_id);
        DigitalAssetBylinkId[_linkId] =_id;

        emit AssetAdded(_id, _sellerId, _price, _linkId, digitalAssets[_id].timestamp);
    }

    function getDigitalAssetsBySeller(uint256 _sellerId) external view returns (DigitalAsset[] memory) {
        require(digitalAssetsBySeller[_sellerId].length > 0, "Seller does not exist");
        
        DigitalAsset[] memory assets = new DigitalAsset[](digitalAssetsBySeller[_sellerId].length);
        
        for (uint i = 0; i < digitalAssetsBySeller[_sellerId].length; i++) {
            string memory assetId = digitalAssetsBySeller[_sellerId][i];
            assets[i] = digitalAssets[assetId];
        }
        
        return assets;
    }

    function getDigitalAssetBylinkId(string memory _linkId) external view returns (string memory id, uint256 sellerId, uint256 price, bool exist, uint256 timestamp, uint256 downloads) {
        require(digitalAssets[DigitalAssetBylinkId[_linkId]].exist, "Asset with this linkId does not exist");
        return (digitalAssets[DigitalAssetBylinkId[_linkId]].id, digitalAssets[DigitalAssetBylinkId[_linkId]].sellerId, digitalAssets[DigitalAssetBylinkId[_linkId]].price, digitalAssets[DigitalAssetBylinkId[_linkId]].exist, digitalAssets[DigitalAssetBylinkId[_linkId]].timestamp, digitalAssets[DigitalAssetBylinkId[_linkId]].downloads);
    }
    
    function purchase(string memory _linkId) public returns (string memory _id){
        require(digitalAssets[DigitalAssetBylinkId[_linkId]].exist, "Asset with this linkId does not exist");
        digitalAssets[DigitalAssetBylinkId[_linkId]].downloads++;
        return (digitalAssets[DigitalAssetBylinkId[_linkId]].id);
    }
}

