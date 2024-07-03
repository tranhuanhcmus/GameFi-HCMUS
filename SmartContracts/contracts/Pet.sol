// SPDX-License-Identifier: MIT
pragma solidity <=0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IPet {
    function mint(address to, uint256 pet_type) external returns (uint256);
}


contract Pet is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {

    event SetExp(uint256 indexed tokenId, uint256 exp);
    event SetPrice(uint256 indexed tokenId, uint256 price);

    mapping(uint256 => uint256) public petExp;
    mapping(uint256 => uint256) public petPrice;

    constructor(
        address initialOwner
    ) ERC721("HPet", "HPET") Ownable(initialOwner) {}

    function safeMint(
        address to,
        uint256 tokenId,
        string memory uri
    ) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        setExp(tokenId, 0);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

     function setExp(
        uint256 tokenId,
        uint256 exp
    ) internal {
       _requireOwned(tokenId);
        petExp[tokenId] = exp;
        emit SetExp(tokenId, exp); // Emitting setExp event
    }

     function addExp(
        uint256 tokenId,
        uint256 exp_plus
    ) external onlyOwner {
       _requireOwned(tokenId);
        petExp[tokenId] += exp_plus;
        emit SetExp(tokenId, petExp[tokenId]); // Emitting setExp event
    }

    function getExp(uint256 tokenId) external view returns (uint256) {
       _requireOwned(tokenId);
        return petExp[tokenId];
    }

    function setPrice(
        uint256 tokenId,
        uint256 price
    ) external {
       _requireOwned(tokenId);
        require(ownerOf(tokenId) == msg.sender, "Only owner can update price of this NFT");
        petPrice[tokenId] = price;
         emit SetPrice(tokenId, price); // Emitting setPrice event
    }

    function getPrice(uint256 tokenId) external view returns (uint256) {
       _requireOwned(tokenId);
        return petPrice[tokenId];
    }
}