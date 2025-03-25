import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import MainLayout from '../../components/layout/MainLayout';
import TruthFragment from '../../components/common/TruthFragment';
import { useAuth } from '../../contexts/AuthContext';

// Type definitions
interface Fragment {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  obtainedAt: string;
  storySource?: string;
  combinable: boolean;
  combinableWith?: string[];
}

interface CombinationOutput {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}

interface CombinationRecipe {
  inputs: string[];
  output: CombinationOutput;
}

// Mock data - This would come from an API in a real application
const mockFragments: Fragment[] = [
  {
    id: 'genesis-truth',
    name: 'Genesis Truth',
    description: 'Reveals the origins of the Truth Covenant and its founders\' secret intentions.',
    rarity: 'rare',
    obtainedAt: '2023-08-13',
    storySource: 'The Truth Covenant',
    combinable: true,
    combinableWith: ['reality-fragment']
  },
  {
    id: 'reality-fragment',
    name: 'Reality Fragment',
    description: 'A code snippet suggesting reality might be artificially constructed.',
    rarity: 'uncommon',
    obtainedAt: '2023-08-20',
    storySource: 'The Truth Covenant',
    combinable: true,
    combinableWith: ['genesis-truth']
  },
  {
    id: 'quantum-code',
    name: 'Quantum Code',
    description: 'A quantum algorithm revealing the basic operating principles of reality.',
    rarity: 'legendary',
    obtainedAt: '2023-09-05',
    storySource: 'Quantum Deception',
    combinable: false
  },
  {
    id: 'mirror-key',
    name: 'Mirror Key',
    description: 'Key to accessing the mirrored dimension where truth and lies are reversed.',
    rarity: 'common',
    obtainedAt: '2023-07-30',
    combinable: true,
    combinableWith: ['reality-fragment']
  }
];

// Mock discovered fragments - would come from user data in a real application
const mockDiscoveredFragmentIds = ['genesis-truth', 'reality-fragment', 'quantum-code'];

// Mock combination recipes - would come from an API in a real application
const mockCombinations = [
  {
    inputs: ['genesis-truth', 'reality-fragment'],
    output: {
      id: 'cosmic-revelation',
      name: 'Cosmic Revelation',
      description: 'A profound revelation about the cosmic structure of the multiverse.',
      rarity: 'legendary'
    }
  },
  {
    inputs: ['mirror-key', 'reality-fragment'],
    output: {
      id: 'dimensional-gateway',
      name: 'Dimensional Gateway',
      description: 'Access point to alternate dimensions where different truths exist.',
      rarity: 'rare'
    }
  }
];

const FragmentsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = React.useState<string>('all');
  const [selectedFragments, setSelectedFragments] = React.useState<string[]>([]);
  const [possibleCombination, setPossibleCombination] = React.useState<CombinationOutput | null>(null);
  const [showCombineModal, setShowCombineModal] = React.useState<boolean>(false);
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);
  
  // Get user's fragments
  const fragments = mockFragments.map(fragment => ({
    ...fragment,
    obtained: mockDiscoveredFragmentIds.includes(fragment.id)
  }));
  
  // Filter fragments
  const filteredFragments = React.useMemo(() => {
    if (filter === 'all') return fragments;
    if (filter === 'obtained') return fragments.filter(f => mockDiscoveredFragmentIds.includes(f.id));
    if (filter === 'undiscovered') return fragments.filter(f => !mockDiscoveredFragmentIds.includes(f.id));
    if (filter === 'combinable') return fragments.filter(f => f.combinable && mockDiscoveredFragmentIds.includes(f.id));
    
    // Filter by rarity
    return fragments.filter(f => f.rarity === filter && mockDiscoveredFragmentIds.includes(f.id));
  }, [filter]);
  
  // Handle fragment selection
  const handleFragmentSelect = (id: string) => {
    setSelectedFragments((prev: string[]) => {
      // If already selected, remove it
      if (prev.includes(id)) {
        const newSelection = prev.filter((fragId: string) => fragId !== id);
        checkPossibleCombination(newSelection);
        return newSelection;
      }
      
      // Otherwise add it if it's obtained
      const fragment = fragments.find(f => f.id === id);
      if (fragment && fragment.obtained) {
        const newSelection = [...prev, id];
        checkPossibleCombination(newSelection);
        return newSelection;
      }
      
      return prev;
    });
  };
  
  // Check if the selected fragments can be combined
  const checkPossibleCombination = (selectedIds: string[]) => {
    if (selectedIds.length < 2) {
      setPossibleCombination(null);
      return;
    }
    
    // Check if there's a recipe matching the selection
    const matchingCombination = mockCombinations.find(combo => {
      const inputs = [...combo.inputs];
      return selectedIds.every(id => inputs.includes(id)) && inputs.every(id => selectedIds.includes(id));
    });
    
    setPossibleCombination(matchingCombination?.output || null);
  };
  
  // Combine fragments
  const combineFragments = () => {
    if (!possibleCombination) return;
    
    // In a real app, this would call an API to perform the combination
    alert(`Combined fragments to create: ${possibleCombination.name}`);
    setSelectedFragments([]);
    setPossibleCombination(null);
    setShowCombineModal(false);
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
    <MainLayout title="Truth Fragments - Paradox">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Truth Fragments Collection
          </h1>
          <p className="text-gray-400 mb-6 md:w-2/3">
            Collect and combine fragments to unlock hidden content and story clues. Each fragment contains a piece of the ultimate truth.
          </p>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
              All Fragments
            </FilterButton>
            <FilterButton active={filter === 'obtained'} onClick={() => setFilter('obtained')}>
              Obtained
            </FilterButton>
            <FilterButton active={filter === 'undiscovered'} onClick={() => setFilter('undiscovered')}>
              Undiscovered
            </FilterButton>
            <FilterButton active={filter === 'combinable'} onClick={() => setFilter('combinable')}>
              Combinable
            </FilterButton>
            <FilterButton active={filter === 'common'} onClick={() => setFilter('common')}>
              Common
            </FilterButton>
            <FilterButton active={filter === 'uncommon'} onClick={() => setFilter('uncommon')}>
              Uncommon
            </FilterButton>
            <FilterButton active={filter === 'rare'} onClick={() => setFilter('rare')}>
              Rare
            </FilterButton>
            <FilterButton active={filter === 'legendary'} onClick={() => setFilter('legendary')}>
              Legendary
            </FilterButton>
          </div>
          
          {/* Selected fragments section */}
          {selectedFragments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Selected Fragments ({selectedFragments.length})</h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedFragments([])}
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    Clear Selection
                  </button>
                  {possibleCombination && (
                    <button
                      onClick={() => setShowCombineModal(true)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg text-white text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition"
                    >
                      Combine Fragments
                    </button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedFragments.map((fragId: string) => {
                  const fragment = fragments.find(f => f.id === fragId);
                  if (!fragment) return null;
                  
                  return (
                    <TruthFragment
                      key={fragment.id}
                      id={fragment.id}
                      name={fragment.name}
                      description={fragment.description}
                      rarity={fragment.rarity}
                      obtained={true}
                      onClick={() => handleFragmentSelect(fragment.id)}
                      className="border-2 border-blue-500/50"
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
          
          {/* All fragments grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFragments.length > 0 ? (
              filteredFragments.map((fragment: Fragment & { obtained: boolean }, index: number) => (
                <TruthFragment
                  key={fragment.id}
                  id={fragment.id}
                  name={fragment.name}
                  description={fragment.description}
                  rarity={fragment.rarity}
                  obtained={fragment.obtained}
                  onClick={() => handleFragmentSelect(fragment.id)}
                  animationDelay={index * 0.1}
                  className={selectedFragments.includes(fragment.id) ? 'border-2 border-blue-500/50' : ''}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <h3 className="text-xl font-medium mb-2">No fragments found</h3>
                <p className="text-gray-400">Try a different filter or discover more fragments by playing stories</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Combine modal */}
      {showCombineModal && possibleCombination && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-indigo-950/80 backdrop-blur-md rounded-xl border border-indigo-800 p-6 max-w-md w-full mx-4"
          >
            <h2 className="text-2xl font-bold mb-4">Combine Fragments</h2>
            <p className="text-gray-300 mb-6">
              You are about to combine {selectedFragments.length} fragments to create a new truth fragment.
              This process is irreversible.
            </p>
            
            <div className="bg-indigo-900/40 rounded-lg p-4 mb-6 border border-indigo-800/60">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-2">
                  {possibleCombination.rarity === 'legendary' ? '🌟' : 
                   possibleCombination.rarity === 'rare' ? '💫' : 
                   possibleCombination.rarity === 'uncommon' ? '✨' : '🧩'}
                </div>
                <div>
                  <h3 className="font-bold text-purple-300">{possibleCombination.name}</h3>
                  <div className="text-xs text-white/60 capitalize">{possibleCombination.rarity} Fragment</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{possibleCombination.description}</p>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowCombineModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={combineFragments}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition"
              >
                Combine
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </MainLayout>
  );
};

interface FilterButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ children, active, onClick }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
      active
        ? 'bg-purple-600 text-white'
        : 'bg-indigo-950/30 text-gray-300 hover:bg-indigo-900/50'
    }`}
  >
    {children}
  </button>
);

export default FragmentsPage; 