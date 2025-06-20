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
import {
  Search,
  MapPin,
  Star,
  Heart,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  Bell,
  Filter,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface EventPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  duration: string;
  services: string[];
  popular?: boolean;
  category: string;
}

interface Provider {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  verified: boolean;
  location: string;
  priceRange: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const eventPackages: EventPackage[] = [
  {
    id: '1',
    name: 'Kids Birthday Classic',
    description: 'Animateur + Gâteau + Décoration complète + Photographie',
    price: 85000,
    originalPrice: 95000,
    image: 'https://images.pexels.com/photos/1857157/pexels-photo-1857157.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 124,
    duration: '4 heures',
    services: ['Animateur', 'Gâteau', 'Décoration', 'Photos'],
    popular: true,
    category: 'birthday',
  },
  {
    id: '2',
    name: 'Baby Shower Elegance',
    description: 'Décoration + Traiteur + Photographie + Animation',
    price: 95000,
    image: 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 89,
    duration: '4 heures',
    services: ['Décoration', 'Traiteur', 'Photos', 'Animation'],
    category: 'baby-shower',
  },
  {
    id: '3',
    name: 'Mini Wedding Gold',
    description: 'Décoration + DJ + Photographie + Traiteur (50 pax)',
    price: 350000,
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 67,
    duration: '8 heures',
    services: ['Décoration', 'DJ', 'Photos', 'Traiteur'],
    category: 'wedding',
  },
  {
    id: '4',
    name: 'Corporate Cocktail Pro',
    description: 'Buffet + Serveurs + Tente + DJ + Éclairage',
    price: 300000,
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 89,
    duration: '4 heures',
    services: ['Buffet', 'Serveurs', 'Tente', 'DJ'],
    category: 'corporate',
  },
  {
    id: '5',
    name: 'Baptême Traditionnel',
    description: 'Décoration + Traiteur + Animation + Photographie',
    price: 120000,
    image: 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 45,
    duration: '5 heures',
    services: ['Décoration', 'Traiteur', 'Animation', 'Photos'],
    category: 'baptism',
  },
];

const featuredProviders: Provider[] = [
  {
    id: '1',
    name: 'Fatou Décoration',
    category: 'Décorateur',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    location: 'Almadies, Dakar',
    priceRange: '25K - 150K',
  },
  {
    id: '2',
    name: 'Mamadou Events',
    category: 'Traiteur',
    rating: 4.8,
    reviews: 203,
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    location: 'Plateau, Dakar',
    priceRange: '30K - 200K',
  },
  {
    id: '3',
    name: 'Aminata Photos',
    category: 'Photographe',
    rating: 4.9,
    reviews: 98,
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    location: 'Mermoz, Dakar',
    priceRange: '40K - 120K',
  },
];

const categories: Category[] = [
  { id: 'birthday', name: 'Anniversaire', icon: '🎂', color: '#FF6B47' },
  { id: 'wedding', name: 'Mariage', icon: '💒', color: '#D4A853' },
  { id: 'baby-shower', name: 'Baby Shower', icon: '👶', color: '#7FB069' },
  { id: 'baptism', name: 'Baptême', icon: '🙏', color: '#CC6B49' },
  { id: 'corporate', name: 'Corporate', icon: '🏢', color: '#0984E3' },
  { id: 'other', name: 'Autre', icon: '✨', color: '#E84393' },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPackages, setLikedPackages] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const router = useRouter();

  const toggleLike = (packageId: string) => {
    const newLiked = new Set(likedPackages);
    if (newLiked.has(packageId)) {
      newLiked.delete(packageId);
    } else {
      newLiked.add(packageId);
    }
    setLikedPackages(newLiked);
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} FCFA`;
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Navigate to search page with category filter
    router.push({
      pathname: '/search',
      params: { category: categoryId }
    });
  };

  const handleCreateEvent = () => {
    router.push('/create');
  };

  const handleSearchPress = () => {
    router.push('/search');
  };

  const filteredPackages = selectedCategory === 'all' 
    ? eventPackages 
    : eventPackages.filter(pkg => pkg.category === selectedCategory);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Bonjour Aicha 👋</Text>
            <View style={styles.locationContainer}>
              <MapPin size={14} color="#6B7280" strokeWidth={2} />
              <Text style={styles.location}>Almadies, Dakar</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#1A1D29" strokeWidth={2} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" strokeWidth={2} />
            <Text style={styles.searchPlaceholder}>
              Rechercher un événement, service...
            </Text>
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={handleSearchPress}>
            <Filter size={20} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catégories d'événements</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={[
                styles.categoryCard, 
                { borderColor: category.color },
                selectedCategory === category.id && { backgroundColor: `${category.color}15` }
              ]}
              onPress={() => handleCategoryPress(category.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryName,
                selectedCategory === category.id && { color: category.color, fontFamily: 'DMSans-SemiBold' }
              ]}>
                {category.name}
              </Text>
              {selectedCategory === category.id && (
                <View style={[styles.categorySelectedIndicator, { backgroundColor: category.color }]} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Packages */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Packs populaires' : `Packs ${categories.find(c => c.id === selectedCategory)?.name}`}
          </Text>
          <TouchableOpacity style={styles.seeAllButton} onPress={handleSearchPress}>
            <Text style={styles.seeAllText}>Voir tout</Text>
            <ArrowRight size={16} color="#D4A853" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.packagesContainer}>
          {filteredPackages.map((pkg) => (
            <TouchableOpacity key={pkg.id} style={styles.packageCard} activeOpacity={0.9}>
              <View style={styles.packageImageContainer}>
                <Image source={{ uri: pkg.image }} style={styles.packageImage} />
                {pkg.popular && (
                  <View style={styles.popularBadge}>
                    <Sparkles size={12} color="white" strokeWidth={2} />
                    <Text style={styles.popularText}>Populaire</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => toggleLike(pkg.id)}
                  activeOpacity={0.8}
                >
                  <Heart
                    size={18}
                    color={likedPackages.has(pkg.id) ? '#FF6B47' : 'white'}
                    fill={likedPackages.has(pkg.id) ? '#FF6B47' : 'transparent'}
                    strokeWidth={2}
                  />
                </TouchableOpacity>
              </View>
              
              <View style={styles.packageContent}>
                <Text style={styles.packageName}>{pkg.name}</Text>
                <Text style={styles.packageDescription}>{pkg.description}</Text>
                
                <View style={styles.packageMeta}>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#D4A853" fill="#D4A853" strokeWidth={0} />
                    <Text style={styles.rating}>{pkg.rating}</Text>
                    <Text style={styles.reviews}>({pkg.reviews})</Text>
                  </View>
                  <View style={styles.durationContainer}>
                    <Calendar size={14} color="#6B7280" strokeWidth={2} />
                    <Text style={styles.duration}>{pkg.duration}</Text>
                  </View>
                </View>

                <View style={styles.servicesContainer}>
                  {pkg.services.slice(0, 3).map((service, index) => (
                    <View key={index} style={styles.serviceTag}>
                      <Text style={styles.serviceText}>{service}</Text>
                    </View>
                  ))}
                  {pkg.services.length > 3 && (
                    <Text style={styles.moreServices}>+{pkg.services.length - 3}</Text>
                  )}
                </View>

                <View style={styles.priceContainer}>
                  {pkg.originalPrice && (
                    <Text style={styles.originalPrice}>{formatPrice(pkg.originalPrice)}</Text>
                  )}
                  <Text style={styles.price}>{formatPrice(pkg.price)}</Text>
                </View>

                <TouchableOpacity style={styles.bookButton} activeOpacity={0.8}>
                  <Text style={styles.bookButtonText}>Réserver maintenant</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Providers */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Prestataires recommandés</Text>
          <TouchableOpacity style={styles.seeAllButton} onPress={handleSearchPress}>
            <Text style={styles.seeAllText}>Voir tout</Text>
            <ArrowRight size={16} color="#D4A853" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {featuredProviders.map((provider) => (
          <TouchableOpacity key={provider.id} style={styles.providerCard} activeOpacity={0.9}>
            <Image source={{ uri: provider.image }} style={styles.providerImage} />
            <View style={styles.providerContent}>
              <View style={styles.providerHeader}>
                <View style={styles.providerNameContainer}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  {provider.verified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.providerCategory}>{provider.category}</Text>
              </View>
              
              <View style={styles.providerMeta}>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#D4A853" fill="#D4A853" strokeWidth={0} />
                  <Text style={styles.rating}>{provider.rating}</Text>
                  <Text style={styles.reviews}>({provider.reviews} avis)</Text>
                </View>
                <Text style={styles.priceRange}>{provider.priceRange} FCFA</Text>
              </View>

              <View style={styles.providerLocation}>
                <MapPin size={12} color="#6B7280" strokeWidth={2} />
                <Text style={styles.locationText}>{provider.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity 
            style={styles.quickActionCard} 
            onPress={handleCreateEvent}
            activeOpacity={0.8}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: '#FF6B47' }]}>
              <Calendar size={24} color="white" strokeWidth={2} />
            </View>
            <Text style={styles.quickActionTitle}>Planifier un événement</Text>
            <Text style={styles.quickActionSubtitle}>Assistant IA gratuit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionCard} activeOpacity={0.8}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#7FB069' }]}>
              <Users size={24} color="white" strokeWidth={2} />
            </View>
            <Text style={styles.quickActionTitle}>Inviter des amis</Text>
            <Text style={styles.quickActionSubtitle}>Gagnez des points</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
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
    paddingBottom: 20,
    backgroundColor: '#F7F3E9',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'DMSans-Bold',
    color: '#1A1D29',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B47',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
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
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#9CA3AF',
  },
  filterButton: {
    backgroundColor: '#D4A853',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'DMSans-Bold',
    color: '#1A1D29',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#D4A853',
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    minWidth: 80,
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontFamily: 'DMSans-Medium',
    color: '#1A1D29',
    textAlign: 'center',
  },
  categorySelectedIndicator: {
    position: 'absolute',
    bottom: -2,
    left: '50%',
    marginLeft: -12,
    width: 24,
    height: 3,
    borderRadius: 2,
  },
  packagesContainer: {
    marginTop: 16,
  },
  packageCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginRight: 16,
    width: width * 0.8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  packageImageContainer: {
    position: 'relative',
  },
  packageImage: {
    width: '100%',
    height: 200,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    marginBottom: 16,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#D4A853',
  },
  bookButton: {
    backgroundColor: '#D4A853',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: 'white',
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
  locationText: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});