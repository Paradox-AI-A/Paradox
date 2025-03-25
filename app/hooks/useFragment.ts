import React from 'react';
import { Fragment, CombinationRecipe } from '../types';
import paradoxAPI from '../utils/paradoxAPI';
import useApi from './useApi';

interface UseFragmentsResult {
  fragments: Fragment[];
  discoveredFragments: Fragment[];
  undiscoveredFragments: Fragment[];
  combinableFragments: Fragment[];
  selectedFragments: Fragment[];
  possibleCombination: Fragment | null;
  loading: boolean;
  error: Error | null;
  selectFragment: (fragmentId: string) => void;
  deselectFragment: (fragmentId: string) => void;
  clearSelection: () => void;
  combineFragments: () => Promise<Fragment | null>;
  refreshFragments: () => Promise<void>;
}

/**
 * Custom hook for managing Truth Fragment operations
 * @returns Functions and state for fragment operations
 */
function useFragments(): UseFragmentsResult {
  const [fragments, setFragments] = React.useState<Fragment[]>([]);
  const [selectedFragments, setSelectedFragments] = React.useState<Fragment[]>([]);
  const [possibleCombination, setPossibleCombination] = React.useState<Fragment | null>(null);
  const [combinationRecipes, setCombinationRecipes] = React.useState<CombinationRecipe[]>([]);
  
  // API calls
  const { execute: fetchFragments, loading, error } = useApi(paradoxAPI.fragments.getAll);
  const { execute: fetchCombinationRecipes } = useApi(paradoxAPI.fragments.getCombinationRecipes);
  const { execute: combineFrag } = useApi(paradoxAPI.fragments.combineFragments);
  
  // Fetch fragments on mount
  React.useEffect(() => {
    refreshFragments();
  }, []);
  
  // Refresh fragments data
  const refreshFragments = async () => {
    try {
      const [fragmentsData, recipesData] = await Promise.all([
        fetchFragments(),
        fetchCombinationRecipes()
      ]);
      
      setFragments(fragmentsData);
      setCombinationRecipes(recipesData);
    } catch (err) {
      console.error('Error refreshing fragments:', err);
    }
  };
  
  // Derived states
  const discoveredFragments = React.useMemo(() => 
    fragments.filter(fragment => fragment.obtainedAt), 
    [fragments]
  );
  
  const undiscoveredFragments = React.useMemo(() => 
    fragments.filter(fragment => !fragment.obtainedAt), 
    [fragments]
  );
  
  const combinableFragments = React.useMemo(() => 
    discoveredFragments.filter(fragment => fragment.combinable), 
    [discoveredFragments]
  );
  
  // Check possible combinations when selected fragments change
  React.useEffect(() => {
    if (selectedFragments.length < 2) {
      setPossibleCombination(null);
      return;
    }
    
    const selectedIds = selectedFragments.map(f => f._id);
    
    // Find a recipe where all inputs match the selected fragments
    const matchingRecipe = combinationRecipes.find(recipe => {
      const inputs = [...recipe.inputs];
      return selectedIds.every(id => inputs.includes(id)) && 
        inputs.every(id => selectedIds.includes(id));
    });
    
    if (matchingRecipe) {
      const outputFragment = fragments.find(f => f._id === matchingRecipe.output) || null;
      setPossibleCombination(outputFragment);
    } else {
      setPossibleCombination(null);
    }
  }, [selectedFragments, combinationRecipes, fragments]);
  
  // Select a fragment
  const selectFragment = (fragmentId: string) => {
    const fragment = fragments.find(f => f._id === fragmentId);
    if (!fragment || !fragment.obtainedAt) return;
    
    setSelectedFragments(prev => {
      // If already selected, do nothing
      if (prev.some(f => f._id === fragmentId)) return prev;
      // Otherwise add it
      return [...prev, fragment];
    });
  };
  
  // Deselect a fragment
  const deselectFragment = (fragmentId: string) => {
    setSelectedFragments(prev => prev.filter(f => f._id !== fragmentId));
  };
  
  // Clear selection
  const clearSelection = () => {
    setSelectedFragments([]);
  };
  
  // Combine selected fragments
  const combineFragments = async (): Promise<Fragment | null> => {
    if (!possibleCombination) return null;
    
    try {
      const fragmentIds = selectedFragments.map(f => f._id);
      const result = await combineFrag(fragmentIds);
      
      // Refresh fragments after combination
      await refreshFragments();
      
      // Clear selection
      clearSelection();
      
      return result;
    } catch (err) {
      console.error('Error combining fragments:', err);
      return null;
    }
  };
  
  return {
    fragments,
    discoveredFragments,
    undiscoveredFragments,
    combinableFragments,
    selectedFragments,
    possibleCombination,
    loading,
    error,
    selectFragment,
    deselectFragment,
    clearSelection,
    combineFragments,
    refreshFragments
  };
}

export default useFragments; 