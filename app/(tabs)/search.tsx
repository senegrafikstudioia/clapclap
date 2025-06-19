import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import { Search, MapPin, Star, Heart, Calendar, Users, Filter, SlidersHorizontal, ArrowUpDown, Grid3x3 as Grid3X3, List, X, ChevronDown } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface SearchResult {
  id: string;
  type: 'package' | 'provider';
  name: string;
  description?: string;
  category?: string;
  price?: number;
  priceRange?: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  verified?: boolean;
  services?: string[];
  duration?: string;
  popular?: boolean;
}

interface FilterOption {
  id: string;
  label: string;
  selected: boolean;
}

const searchResults: SearchResult[] = [
  {
    id: '1',
    type: 'package',
    name: 'Kids Birthday Premium',
    description: 'Animateur + Gâteau + Décoration + DJ + Jeux + Goody bags',
    price: 120000,
    image: 'https://images.pexels.com/photos/1857157/pexels-photo-1857157.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 124,
    location: 'Dakar',
    services: ['Animateur', 'Gâteau', 'Décoration', 'DJ', 'Jeux'],
    duration: '5 heures',
    popular: true,
  },
  {
    id: '2',
    type: 'provider',
    name: 'Fatou Décoration',
    category: 'Décorateur',
    priceRange: '25K - 150K',
    image: 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 156,
    location: 'Almadies, Dakar',
    verified: true,
  },
  {
    id: '3',
    type: 'package',
    name: 'Corporate Cocktail Pro',
    description: 'Buffet + Serveurs + Tente + DJ + Éclairage',
    price: 300000,
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 89,
    location: 'Dakar',
    services: ['Buffet', 'Serveurs', 'Tente', 'DJ'],
    duration: '4 heures',
  },
  {
    id: '4',
    type: 'provider',
    name: 'Mamadou Events',
    category: 'Traiteur',
    priceRange: '30K - 200K',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 203,
    location: 'Plateau, Dakar',
    verified: true,
  },
  {
    id: '5',
    type: 'package',
    name: 'Baby Shower Luxury',
    description: 'Décoration + Traiteur + Jeux + Faveurs + MC',
    price: 140000,
    image: 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 67,
    location: 'Dakar',
    services: ['Décoration', 'Traiteur', 'Jeux', 'MC'],
    duration: '5 heures',
  },
  {
    id: '6',
    type: 'provider',
    name: 'Aminata Photos',
    category: 'Photographe',
    priceRange: '40K - 120K',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 98,
    location: 'Mermoz, Dakar',
    verified: true,
  },
];

const categories: FilterOption[] = [
  { id: 'all', label: 'Tout', selected: true },
  { id: 'packages', label: 'Packs', selected: false },
  { id: 'providers', label: 'Prestataires', selected: false },
  { id: 'birthday', label: 'Anniversaire', selected: false },
  { id: 'wedding', label: 'Mariage', selected: false },
  { id: 'baby-shower', label: 'Baby Shower', selected: false },
  { id: 'corporate', label: 'Corporate', selected: false },
];

const priceRanges: FilterOption[] = [
  { id: 'all', label: 'Tous les prix', selected: true },
  { id: 'low', label: 'Moins de 50K', selected: false },
  { id: 'medium', label: '50K - 150K', selected: false },
  { id: 'high', label: '150K - 300K', selected: false },
  { id: 'premium', label: 'Plus de 300K', selected: false },
];

const locations: FilterOption[] = [
  { id: 'all', label: 'Toutes les zones', selected: true },
  { id: 'almadies', label: 'Almadies', selected: false },
  { id: 'plateau', label: 'Plateau', selected: false },
  { id: 'mermoz', label: 'Mermoz', selected: false },
  { id: 'medina', label: 'Médina', selected: false },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState('relevance');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [categoryFilters, setCategoryFilters] = useState(categories);
  const [priceFilters, setPriceFilters] = useState(priceRanges);
  const [locationFilters, setLocationFilters] = useState(locations);

  const toggleLike = (itemId: string) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(itemId)) {
      newLiked.delete(itemId);
    } else {
      newLiked.add(itemId);
    }
    setLikedItems(newLiked);
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} FCFA`;
  };

  const updateFilter = (
    filters: FilterOption[],
    setFilters: React.Dispatch<React.SetStateAction<FilterOption[]>>,
    id: string
  ) => {
    const updated = filters.map(filter => ({
      ...filter,
      selected: filter.id === id ? !filter.selected : filter.id === 'all' ? false : filter.selected
    }));
    
    // If no specific filters are selected, select 'all'
    const hasSelected = updated.some(f => f.id !== 'all' && f.selected);
    if (!hasSelected) {
      updated[0].selected = true;
    } else {
      updated[0].selected = false;
    }
    
    setFilters(updated);
  };

  const clearAllFilters = () => {
    setCategoryFilters(categories.map((c, i) => ({ ...c, selected: i === 0 })));
    setPriceFilters(priceRanges.map((p, i) => ({ ...p, selected: i === 0 })));
    setLocationFilters(locations.map((l, i) => ({ ...l, selected: i === 0 })));
  };

  const renderPackageCard = (item: SearchResult) => (
    <View key={item.id} style={styles.packageCard}>
      <View style={styles.packageImageContainer}>
        <Image source={{ uri: item.image }} style={styles.packageImage} />
        {item.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Populaire</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => toggleLike(item.id)}
        >
          <Heart
            size={18}
            color={likedItems.has(item.id) ? '#FF6B47' : 'white'}
            fill={likedItems.has(item.id) ? '#FF6B47' : 'transparent'}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.packageContent}>
        <Text style={styles.packageName}>{item.name}</Text>
        <Text style={styles.packageDescription}>{item.description}</Text>
        
        <View style={styles.packageMeta}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#D4A853" fill="#D4A853" strokeWidth={0} />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviews}>({item.reviews})</Text>
          </View>
          {item.duration && (
            <View style={styles.durationContainer}>
              <Calendar size={14} color="#6B7280" strokeWidth={2} />
              <Text style={styles.duration}>{item.duration}</Text>
            </View>
          )}
        </View>

        {item.services && (
          <View style={styles.servicesContainer}>
            {item.services.slice(0, 3).map((service, index) => (
              <View key={index} style={styles.serviceTag}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
            {item.services.length > 3 && (
              <Text style={styles.moreServices}>+{item.services.length - 3}</Text>
            )}
          </View>
        )}

        <View style={styles.priceLocationContainer}>
          <Text style={styles.price}>{formatPrice(item.price!)}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={12} color="#6B7280" strokeWidth={2} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderProviderCard = (item: SearchResult) => (
    <TouchableOpacity key={item.id} style={styles.providerCard}>
      <Image source={{ uri: item.image }} style={styles.providerImage} />
      <View style={styles.providerContent}>
        <View style={styles.providerHeader}>
          <View style={styles.providerNameContainer}>
            <Text style={styles.providerName}>{item.name}</Text>
            {item.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>
          <Text style={styles.providerCategory}>{item.category}</Text>
        </View>
        
        <View style={styles.providerMeta}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#D4A853" fill="#D4A853" strokeWidth={0} />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviews}>({item.reviews} avis)</Text>
          </View>
          <Text style={styles.priceRange}>{item.priceRange} FCFA</Text>
        </View>

        <View style={styles.providerLocation}>
          <MapPin size={12} color="#6B7280" strokeWidth={2} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.providerLikeButton}
        onPress={() => toggleLike(item.id)}
      >
        <Heart
          size={16}
          color={likedItems.has(item.id) ? '#FF6B47' : '#9CA3AF'}
          fill={likedItems.has(item.id) ? '#FF6B47' : 'transparent'}
          strokeWidth={2}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderGridItem = (item: SearchResult) => (
    <View key={item.id} style={styles.gridItem}>
      <View style={styles.gridImageContainer}>
        <Image source={{ uri: item.image }} style={styles.gridImage} />
        <TouchableOpacity
          style={styles.gridLikeButton}
          onPress={() => toggleLike(item.id)}
        >
          <Heart
            size={14}
            color={likedItems.has(item.id) ? '#FF6B47' : 'white'}
            fill={likedItems.has(item.id) ? '#FF6B47' : 'transparent'}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.gridContent}>
        <Text style={styles.gridName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.gridRating}>
          <Star size={12} color="#D4A853" fill="#D4A853" strokeWidth={0} />
          <Text style={styles.gridRatingText}>{item.rating}</Text>
        </View>
        <Text style={styles.gridPrice}>
          {item.price ? formatPrice(item.price) : item.priceRange + ' FCFA'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher événements, prestataires..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity 
            style={[styles.filterButton, showFilters && styles.filterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Quick Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickFiltersContainer}>
          {categoryFilters.slice(0, 6).map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.quickFilter, category.selected && styles.quickFilterActive]}
              onPress={() => updateFilter(categoryFilters, setCategoryFilters, category.id)}
            >
              <Text style={[styles.quickFilterText, category.selected && styles.quickFilterTextActive]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Advanced Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Catégories</Text>
              <View style={styles.filterOptions}>
                {categoryFilters.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[styles.filterOption, category.selected && styles.filterOptionActive]}
                    onPress={() => updateFilter(categoryFilters, setCategoryFilters, category.id)}
                  >
                    <Text style={[styles.filterOptionText, category.selected && styles.filterOptionTextActive]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Prix</Text>
              <View style={styles.filterOptions}>
                {priceFilters.map((price) => (
                  <TouchableOpacity
                    key={price.id}
                    style={[styles.filterOption, price.selected && styles.filterOptionActive]}
                    onPress={() => updateFilter(priceFilters, setPriceFilters, price.id)}
                  >
                    <Text style={[styles.filterOptionText, price.selected && styles.filterOptionTextActive]}>
                      {price.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Localisation</Text>
              <View style={styles.filterOptions}>
                {locationFilters.map((location) => (
                  <TouchableOpacity
                    key={location.id}
                    style={[styles.filterOption, location.selected && styles.filterOptionActive]}
                    onPress={() => updateFilter(locationFilters, setLocationFilters, location.id)}
                  >
                    <Text style={[styles.filterOptionText, location.selected && styles.filterOptionTextActive]}>
                      {location.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterActions}>
              <TouchableOpacity style={styles.clearButton} onPress={clearAllFilters}>
                <Text style={styles.clearButtonText}>Effacer tout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={() => setShowFilters(false)}>
                <Text style={styles.applyButtonText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{searchResults.length} résultats trouvés</Text>
        <View style={styles.resultsActions}>
          <TouchableOpacity style={styles.sortButton}>
            <ArrowUpDown size={16} color="#6B7280" strokeWidth={2} />
            <Text style={styles.sortText}>Trier</Text>
            <ChevronDown size={16} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.viewButton, viewMode === 'list' && styles.viewButtonActive]}
              onPress={() => setViewMode('list')}
            >
              <List size={16} color={viewMode === 'list' ? '#D4A853' : '#9CA3AF'} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewButton, viewMode === 'grid' && styles.viewButtonActive]}
              onPress={() => setViewMode('grid')}
            >
              <Grid3X3 size={16} color={viewMode === 'grid' ? '#D4A853' : '#9CA3AF'} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Results */}
      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        {viewMode === 'grid' ? (
          <View style={styles.gridContainer}>
            {searchResults.map(renderGridItem)}
          </View>
        ) : (
          <View style={styles.listContainer}>
            {searchResults.map((item) =>
              item.type === 'package' ? renderPackageCard(item) : renderProviderCard(item)
            )}
          </View>
        )}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: '#F7F3E9',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#1A1D29',
  },
  filterButton: {
    backgroundColor: '#D4A853',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#CC6B49',
  },
  quickFiltersContainer: {
    marginTop: 8,
  },
  quickFilter: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickFilterActive: {
    backgroundColor: '#D4A853',
    borderColor: '#D4A853',
  },
  quickFilterText: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#6B7280',
  },
  quickFilterTextActive: {
    color: 'white',
  },
  filtersContainer: {
    backgroundColor: 'white',
    maxHeight: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterTitle: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterOptionActive: {
    backgroundColor: '#D4A853',
    borderColor: '#D4A853',
  },
  filterOptionText: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#6B7280',
  },
  filterOptionTextActive: {
    color: 'white',
  },
  filterActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#6B7280',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#D4A853',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: 'white',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
  },
  resultsActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sortText: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#6B7280',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 2,
  },
  viewButton: {
    padding: 6,
    borderRadius: 6,
  },
  viewButtonActive: {
    backgroundColor: 'white',
  },
  resultsContainer: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  packageCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  packageImageContainer: {
    position: 'relative',
  },
  packageImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#D4A853',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  popularText: {
    fontSize: 10,
    fontFamily: 'DMSans-SemiBold',
    color: 'white',
  },
  likeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  packageContent: {
    padding: 16,
  },
  packageName: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#1A1D29',
    marginBottom: 4,
  },
  packageDescription: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  packageMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
  },
  reviews: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  duration: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  serviceTag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  serviceText: {
    fontSize: 11,
    fontFamily: 'DMSans-Medium',
    color: '#6B7280',
  },
  moreServices: {
    fontSize: 11,
    fontFamily: 'DMSans-Medium',
    color: '#D4A853',
    alignSelf: 'center',
  },
  priceLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#D4A853',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
  },
  providerCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  providerImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  providerContent: {
    flex: 1,
  },
  providerHeader: {
    marginBottom: 8,
  },
  providerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  providerName: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
  },
  verifiedBadge: {
    backgroundColor: '#7FB069',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  providerCategory: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
  },
  providerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceRange: {
    fontSize: 14,
    fontFamily: 'DMSans-SemiBold',
    color: '#D4A853',
  },
  providerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  providerLikeButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  gridItem: {
    width: (width - 48) / 2,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gridImageContainer: {
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  gridLikeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 6,
  },
  gridContent: {
    padding: 12,
  },
  gridName: {
    fontSize: 14,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
    marginBottom: 4,
    lineHeight: 18,
  },
  gridRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  gridRatingText: {
    fontSize: 12,
    fontFamily: 'DMSans-Medium',
    color: '#1A1D29',
  },
  gridPrice: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#D4A853',
  },
  bottomSpacing: {
    height: 100,
  },
});