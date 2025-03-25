const { ethers } = require('ethers');
const dotenv = require('dotenv');

dotenv.config();

// Configuration defaults
const BLOCKCHAIN_NETWORK = process.env.BLOCKCHAIN_NETWORK || 'testnet';
const PROVIDER_URL = process.env.BLOCKCHAIN_PROVIDER_URL || 'https://eth-goerli.g.alchemy.com/v2/demo';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || '';

// This is a simplified ABI for the Paradox contract
// In a production environment, this would be generated from the full contract ABI
const PARADOX_CONTRACT_ABI = [
  // Paradox Coin (ERC20) functions
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function mint(address to, uint256 amount) returns (bool)",
  "function burn(uint256 amount) returns (bool)",
  
  // Truth Fragment (ERC721) functions
  "function mintTruthFragment(address to, string memory tokenURI) returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function transferTruthFragment(address from, address to, uint256 tokenId) returns (bool)",
  "function getTruthFragmentURI(uint256 tokenId) view returns (string memory)",
  
  // Paradox-specific functions
  "function combineFragments(uint256[] memory fragmentIds) returns (uint256)",
  "function getParadoxLevel() view returns (uint8)",
  "function updateParadoxResolutionRate(uint256 newRate) returns (bool)"
];

/**
 * Initialize the blockchain provider and contract
 * @returns {Object} Provider and contract instance
 */
function initializeBlockchain() {
  try {
    // Skip initialization if blockchain features are disabled
    if (process.env.ENABLE_BLOCKCHAIN !== 'true') {
      console.log('Blockchain features are disabled. Using mock implementation.');
      return null;
    }
    
    // Skip initialization if required config is missing
    if (!WALLET_PRIVATE_KEY || WALLET_PRIVATE_KEY === '') {
      console.warn('Wallet private key not configured. Blockchain features will be mocked.');
      return null;
    }
    
    // Initialize provider based on network
    let provider;
    if (BLOCKCHAIN_NETWORK === 'localhost') {
      provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    } else {
      provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    }
    
    // Create wallet instance
    const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);
    
    // Create contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PARADOX_CONTRACT_ABI, wallet);
    
    return { provider, wallet, contract };
  } catch (error) {
    console.error('Error initializing blockchain:', error);
    return null;
  }
}

// Initialize blockchain connection
const blockchain = initializeBlockchain();

/**
 * Get the Paradox Coin balance for a wallet address
 * @param {string} address - Wallet address
 * @returns {Promise<number>} Coin balance
 */
exports.getParadoxCoinBalance = async (address) => {
  try {
    if (!blockchain) {
      // Mock implementation when blockchain is disabled
      return Math.floor(Math.random() * 1000);
    }
    
    const balance = await blockchain.contract.balanceOf(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error('Error getting Paradox Coin balance:', error);
    throw error;
  }
};

/**
 * Transfer Paradox Coins from the service wallet to a user wallet
 * @param {string} toAddress - Recipient wallet address
 * @param {number} amount - Amount of coins to transfer
 * @returns {Promise<Object>} Transaction result
 */
exports.transferParadoxCoins = async (toAddress, amount) => {
  try {
    if (!blockchain) {
      // Mock implementation when blockchain is disabled
      return {
        success: true,
        transactionHash: `mock_tx_${Date.now()}`,
        amount
      };
    }
    
    const amountWei = ethers.utils.parseEther(amount.toString());
    const tx = await blockchain.contract.transfer(toAddress, amountWei);
    const receipt = await tx.wait();
    
    return {
      success: true,
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      amount
    };
  } catch (error) {
    console.error('Error transferring Paradox Coins:', error);
    throw error;
  }
};

/**
 * Mint a new Truth Fragment NFT for a user
 * @param {string} toAddress - Recipient wallet address
 * @param {Object} fragmentData - Metadata for the Truth Fragment
 * @returns {Promise<Object>} Minting result with token ID
 */
exports.mintTruthFragment = async (toAddress, fragmentData) => {
  try {
    if (!blockchain) {
      // Mock implementation when blockchain is disabled
      return {
        success: true,
        tokenId: `mock_token_${Date.now()}`,
        metadata: fragmentData
      };
    }
    
    // In a real implementation, we would upload the metadata to IPFS first
    const metadataURI = `ipfs://mock/${Date.now()}`;
    
    const tx = await blockchain.contract.mintTruthFragment(toAddress, metadataURI);
    const receipt = await tx.wait();
    
    // In a real implementation, we would extract the token ID from the event logs
    const tokenId = `token_${Date.now()}`;
    
    return {
      success: true,
      transactionHash: receipt.transactionHash,
      tokenId,
      metadata: fragmentData
    };
  } catch (error) {
    console.error('Error minting Truth Fragment:', error);
    throw error;
  }
};

/**
 * Combine multiple Truth Fragments to create a new one
 * @param {string} ownerAddress - Address that owns all fragments
 * @param {Array<string>} fragmentIds - Array of fragment token IDs to combine
 * @returns {Promise<Object>} Combination result with new token ID
 */
exports.combineFragments = async (ownerAddress, fragmentIds) => {
  try {
    if (!blockchain) {
      // Mock implementation when blockchain is disabled
      return {
        success: true,
        newTokenId: `mock_combined_${Date.now()}`,
        consumedTokenIds: fragmentIds
      };
    }
    
    // Convert string IDs to numbers for the contract call
    const numericIds = fragmentIds.map(id => parseInt(id));
    
    const tx = await blockchain.contract.combineFragments(numericIds);
    const receipt = await tx.wait();
    
    // In a real implementation, we would extract the new token ID from the event logs
    const newTokenId = `combined_${Date.now()}`;
    
    return {
      success: true,
      transactionHash: receipt.transactionHash,
      newTokenId,
      consumedTokenIds: fragmentIds
    };
  } catch (error) {
    console.error('Error combining fragments:', error);
    throw error;
  }
};

/**
 * Update the global Paradox Resolution Rate
 * @param {number} newRate - New resolution rate (0-1)
 * @returns {Promise<Object>} Update result
 */
exports.updateParadoxResolutionRate = async (newRate) => {
  try {
    if (!blockchain) {
      // Mock implementation when blockchain is disabled
      return {
        success: true,
        newRate
      };
    }
    
    // Convert 0-1 rate to contract format (0-10000)
    const rateForContract = Math.floor(newRate * 10000);
    
    const tx = await blockchain.contract.updateParadoxResolutionRate(rateForContract);
    const receipt = await tx.wait();
    
    return {
      success: true,
      transactionHash: receipt.transactionHash,
      newRate
    };
  } catch (error) {
    console.error('Error updating Paradox Resolution Rate:', error);
    throw error;
  }
};

/**
 * Get the current global Paradox Level
 * @returns {Promise<number>} Current Paradox Level (1-5)
 */
exports.getParadoxLevel = async () => {
  try {
    if (!blockchain) {
      // Mock implementation when blockchain is disabled
      return Math.floor(Math.random() * 5) + 1;
    }
    
    const level = await blockchain.contract.getParadoxLevel();
    return level;
  } catch (error) {
    console.error('Error getting Paradox Level:', error);
    throw error;
  }
}; 