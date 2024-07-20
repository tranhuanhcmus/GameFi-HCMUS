const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("NFT721 contract", function () {
  async function deployNFT721Fixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const NFT721 = await ethers.getContractFactory("Pet");
    const nft721 = await NFT721.deploy("Pet", "PET");
    await nft721.waitForDeployment();

    return { nft721, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { nft721, owner } = await loadFixture(deployNFT721Fixture);
      expect(await nft721.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      const { nft721 } = await loadFixture(deployNFT721Fixture);
      expect(await nft721.name()).to.equal("Pet");
      expect(await nft721.symbol()).to.equal("PET");
    });
  });

  describe("Minting", function () {
    it("Should mint a new token", async function () {
      const { nft721, owner, addr1 } = await loadFixture(deployNFT721Fixture);
      await expect(nft721.safeMint(addr1.address))
        .to.emit(nft721, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, 0);
      
      expect(await nft721.ownerOf(0)).to.equal(addr1.address);
      expect(await nft721.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should fail if non-owner tries to mint", async function () {
      const { nft721, addr1 } = await loadFixture(deployNFT721Fixture);
      await expect(nft721.connect(addr1).safeMint(addr1.address)).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Transfers", function () {
    it("Should transfer NFT between accounts", async function () {
      const { nft721, owner, addr1, addr2 } = await loadFixture(deployNFT721Fixture);
      
      // Mint a token to addr1
      await nft721.safeMint(addr1.address);
      
      // Transfer from addr1 to addr2
      await expect(nft721.connect(addr1).transferFrom(addr1.address, addr2.address, 0))
        .to.emit(nft721, "Transfer")
        .withArgs(addr1.address, addr2.address, 0);
      
      expect(await nft721.ownerOf(0)).to.equal(addr2.address);
      expect(await nft721.balanceOf(addr1.address)).to.equal(0);
      expect(await nft721.balanceOf(addr2.address)).to.equal(1);
    });

    it("Should fail if sender is not owner nor approved", async function () {
      const { nft721, owner, addr1, addr2 } = await loadFixture(deployNFT721Fixture);
      
      // Mint a token to addr1
      await nft721.safeMint(addr1.address);
      
      // Try to transfer from addr2 (not owner) to owner
      await expect(nft721.connect(addr2).transferFrom(addr1.address, owner.address, 0))
        .to.be.revertedWith("ERC721: caller is not token owner or approved");
    });
  });

  describe("Approvals", function () {
    it("Should approve and then transfer", async function () {
      const { nft721, owner, addr1, addr2 } = await loadFixture(deployNFT721Fixture);
      
      // Mint a token to addr1
      await nft721.safeMint(addr1.address);
      
      // Approve addr2 to spend addr1's token
      await nft721.connect(addr1).approve(addr2.address, 0);
      
      // Transfer from addr1 to owner, by addr2
      await nft721.connect(addr2).transferFrom(addr1.address, owner.address, 0);
      
      expect(await nft721.ownerOf(0)).to.equal(owner.address);
    });
  });
});