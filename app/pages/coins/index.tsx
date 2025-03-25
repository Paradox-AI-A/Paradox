import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import ParadoxCoin from '../../components/common/ParadoxCoin';
import { useAuth } from '../../contexts/AuthContext';

// Type definitions
interface Transaction {
  id: string;
  date: string;
  type: 'purchase' | 'reward' | 'spend';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

interface CoinPackage {
  id: string;
  name: string;
  amount: number;
  price: number;
  discount?: number;
  popular?: boolean;
}

// Mock data - This would come from an API in a real app
const mockTransactions: Transaction[] = [
  {
    id: 'tx-001',
    date: '2023-09-15T14:32:00Z',
    type: 'purchase',
    amount: 500,
    description: 'Purchased 500 Paradox Coins',
    status: 'completed'
  },
  {
    id: 'tx-002',
    date: '2023-09-10T09:15:00Z',
    type: 'reward',
    amount: 50,
    description: 'Daily login bonus',
    status: 'completed'
  },
  {
    id: 'tx-003',
    date: '2023-09-08T16:45:00Z',
    type: 'spend',
    amount: -200,
    description: 'Unlocked premium story: "The Truth Covenant"',
    status: 'completed'
  },
  {
    id: 'tx-004',
    date: '2023-09-01T11:20:00Z',
    type: 'reward',
    amount: 100,
    description: 'Story completion reward',
    status: 'completed'
  },
  {
    id: 'tx-005',
    date: '2023-08-25T13:10:00Z',
    type: 'purchase',
    amount: 1000,
    description: 'Purchased 1000 Paradox Coins',
    status: 'completed'
  }
];

const coinPackages: CoinPackage[] = [
  {
    id: 'pack-small',
    name: 'Small Pack',
    amount: 100,
    price: 0.99
  },
  {
    id: 'pack-medium',
    name: 'Medium Pack',
    amount: 500,
    price: 4.49,
    discount: 10
  },
  {
    id: 'pack-large',
    name: 'Large Pack',
    amount: 1000,
    price: 7.99,
    discount: 20,
    popular: true
  },
  {
    id: 'pack-xl',
    name: 'Extra Large Pack',
    amount: 2500,
    price: 17.99,
    discount: 30
  },
  {
    id: 'pack-xxl',
    name: 'Mega Pack',
    amount: 5000,
    price: 29.99,
    discount: 40
  }
];

const ParadoxCoinsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'balance' | 'purchase'>('balance');
  const [showPurchaseModal, setShowPurchaseModal] = React.useState(false);
  const [selectedPackage, setSelectedPackage] = React.useState<CoinPackage | null>(null);
  
  // Mock coin balance
  const coinBalance = 750;
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Handle package purchase
  const handlePurchase = (pkg: CoinPackage) => {
    setSelectedPackage(pkg);
    setShowPurchaseModal(true);
  };
  
  // Complete purchase
  const completePurchase = () => {
    if (!selectedPackage) return;
    
    // In a real app, this would integrate with a payment gateway
    alert(`Purchase of ${selectedPackage.amount} coins for $${selectedPackage.price} would be processed here.`);
    setShowPurchaseModal(false);
    setSelectedPackage(null);
  };
  
  if (!isAuthenticated) {
    return (
      <MainLayout title="Loading - Paradox">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="loader"></div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout title="Paradox Coins - Paradox">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Paradox Coins
          </h1>
          <p className="text-gray-400 mb-6 md:w-2/3">
            Manage your Paradox Coins, view transaction history, and purchase additional coins to unlock premium content.
          </p>
          
          {/* Current Balance Card */}
          <div className="bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold mb-1">Current Balance</h2>
                <div className="flex items-center">
                  <ParadoxCoin amount={coinBalance} size="large" showIcon={true} showAnimation={true} />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setActiveTab('purchase')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-700 transition"
                >
                  Purchase Coins
                </button>
                <Link href="/stories" className="bg-indigo-800/50 px-5 py-3 rounded-lg text-white font-medium hover:bg-indigo-800/80 transition">
                  Browse Stories
                </Link>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-indigo-800/50 mb-6">
            <div className="flex space-x-6">
              <TabButton 
                active={activeTab === 'balance'} 
                onClick={() => setActiveTab('balance')}
              >
                Transaction History
              </TabButton>
              <TabButton 
                active={activeTab === 'purchase'} 
                onClick={() => setActiveTab('purchase')}
              >
                Purchase Coins
              </TabButton>
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'balance' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="overflow-x-auto"
            >
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-indigo-800/30">
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">Date</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">Transaction</th>
                    <th className="text-left py-3 px-2 text-gray-400 font-medium">Amount</th>
                    <th className="text-right py-3 px-2 text-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactions.map(transaction => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-indigo-800/20 hover:bg-indigo-900/10"
                    >
                      <td className="py-4 px-2 text-sm">{formatDate(transaction.date)}</td>
                      <td className="py-4 px-2">{transaction.description}</td>
                      <td className="py-4 px-2">
                        <ParadoxCoin 
                          amount={transaction.amount} 
                          className={transaction.type === 'spend' ? 'text-red-400' : ''} 
                        />
                      </td>
                      <td className="py-4 px-2 text-right">
                        <span className={`
                          inline-block px-2 py-1 rounded-full text-xs font-medium
                          ${transaction.status === 'completed' ? 'bg-green-900/30 text-green-400' : 
                            transaction.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' : 
                            'bg-red-900/30 text-red-400'}
                        `}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              
              <div className="mt-6 text-center">
                <button
                  className="text-indigo-400 hover:text-white transition"
                >
                  View More Transactions
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coinPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`relative bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-5 hover:border-indigo-600/70 transition overflow-hidden ${pkg.popular ? 'border-purple-500/70' : ''}`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-2 -translate-y-1">
                          POPULAR
                        </div>
                      </div>
                    )}
                    
                    <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                    
                    <div className="mb-4">
                      <ParadoxCoin amount={pkg.amount} size="medium" showIcon={true} />
                    </div>
                    
                    {pkg.discount && (
                      <div className="mb-2">
                        <span className="inline-block bg-green-900/30 text-green-400 text-xs font-medium px-2 py-1 rounded-full">
                          {pkg.discount}% BONUS
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-baseline mb-4">
                      <span className="text-2xl font-bold">${pkg.price}</span>
                      {pkg.discount && (
                        <span className="text-sm text-gray-400 ml-2 line-through">
                          ${(pkg.price / (1 - pkg.discount / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handlePurchase(pkg)}
                      className={`w-full py-2 rounded-lg font-medium transition ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                          : 'bg-indigo-800/50 text-white hover:bg-indigo-800'
                      }`}
                    >
                      Purchase
                    </button>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 bg-indigo-950/20 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-5">
                <h3 className="text-lg font-semibold mb-2">Ways to Earn Free Coins</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Complete stories to earn coins based on your choices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Log in daily to receive bonus coins</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Invite friends to join Paradox</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Participate in weekly events and challenges</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Purchase Modal */}
      {showPurchaseModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-indigo-950/80 backdrop-blur-md rounded-xl border border-indigo-800 p-6 max-w-md w-full mx-4"
          >
            <h2 className="text-2xl font-bold mb-4">Confirm Purchase</h2>
            <p className="text-gray-300 mb-6">
              You are about to purchase {selectedPackage.amount} Paradox Coins for ${selectedPackage.price}.
            </p>
            
            <div className="bg-indigo-900/40 rounded-lg p-4 mb-6 border border-indigo-800/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Package:</span>
                <span className="font-medium">{selectedPackage.name}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Amount:</span>
                <ParadoxCoin amount={selectedPackage.amount} showIcon={true} />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Price:</span>
                <span className="font-medium">${selectedPackage.price}</span>
              </div>
              {selectedPackage.discount && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Discount:</span>
                  <span className="font-medium text-green-400">{selectedPackage.discount}%</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={completePurchase}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition"
              >
                Confirm Purchase
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </MainLayout>
  );
};

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ children, active, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`py-3 border-b-2 font-medium transition ${
      active
        ? 'border-purple-500 text-white'
        : 'border-transparent text-gray-400 hover:text-white'
    }`}
  >
    {children}
  </button>
);

export default ParadoxCoinsPage; 