import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { Calendar, Clock, MapPin, Users, Star, MessageCircle, Phone, MoveVertical as MoreVertical, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Circle as XCircle, Plus, Filter } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  guestCount: number;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  image: string;
  providers: Provider[];
  totalCost: number;
  progress: number;
}

interface Provider {
  id: string;
  name: string;
  service: string;
  status: 'confirmed' | 'pending' | 'completed';
  rating: number;
  image: string;
  phone: string;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Anniversaire de Fatou',
    type: 'Anniversaire',
    date: '2025-02-15',
    time: '14:00',
    location: 'Almadies, Dakar',
    guestCount: 25,
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/1857157/pexels-photo-1857157.jpeg?auto=compress&cs=tinysrgb&w=800',
    totalCost: 85000,
    progress: 75,
    providers: [
      {
        id: '1',
        name: 'Aminata Décoration',
        service: 'Décoration',
        status: 'confirmed',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+221 77 123 4567',
      },
      {
        id: '2',
        name: 'Bakery Delice',
        service: 'Gâteau',
        status: 'confirmed',
        rating: 4.9,
        image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+221 78 234 5678',
      },
      {
        id: '3',
        name: 'Photo Magic',
        service: 'Photographie',
        status: 'pending',
        rating: 4.7,
        image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+221 76 345 6789',
      },
    ],
  },
  {
    id: '2',
    title: 'Baby Shower de Mariam',
    type: 'Baby Shower',
    date: '2025-01-28',
    time: '16:00',
    location: 'Mermoz, Dakar',
    guestCount: 30,
    status: 'in-progress',
    image: 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=800',
    totalCost: 95000,
    progress: 90,
    providers: [
      {
        id: '4',
        name: 'Elegant Events',
        service: 'Décoration',
        status: 'completed',
        rating: 4.9,
        image: 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+221 77 456 7890',
      },
      {
        id: '5',
        name: 'Saveurs du Sénégal',
        service: 'Traiteur',
        status: 'confirmed',
        rating: 4.6,
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+221 78 567 8901',
      },
    ],
  },
  {
    id: '3',
    title: 'Mariage de Khadija',
    type: 'Mariage',
    date: '2024-12-20',
    time: '18:00',
    location: 'Plateau, Dakar',
    guestCount: 150,
    status: 'completed',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    totalCost: 450000,
    progress: 100,
    providers: [
      {
        id: '6',
        name: 'Royal Décor',
        service: 'Décoration',
        status: 'completed',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+221 77 678 9012',
      },
      {
        id: '7',
        name: 'DJ Moussa',
        service: 'Animation',
        status: 'completed',
        rating: 4.7,
        image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+221 78 789 0123',
      },
    ],
  },
];

const statusConfig = {
  upcoming: {
    label: 'À venir',
    color: '#0984E3',
    backgroundColor: '#E3F2FD',
    icon: Calendar,
  },
  'in-progress': {
    label: 'En cours',
    color: '#D4A853',
    backgroundColor: '#FFF8E1',
    icon: AlertCircle,
  },
  completed: {
    label: 'Terminé',
    color: '#7FB069',
    backgroundColor: '#E8F5E8',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Annulé',
    color: '#E84393',
    backgroundColor: '#FCE4EC',
    icon: XCircle,
  },
};

const providerStatusConfig = {
  confirmed: {
    label: 'Confirmé',
    color: '#7FB069',
    backgroundColor: '#E8F5E8',
  },
  pending: {
    label: 'En attente',
    color: '#D4A853',
    backgroundColor: '#FFF8E1',
  },
  completed: {
    label: 'Terminé',
    color: '#0984E3',
    backgroundColor: '#E3F2FD',
  },
};

export default function EventsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'Tous', count: events.length },
    { id: 'upcoming', label: 'À venir', count: events.filter(e => e.status === 'upcoming').length },
    { id: 'in-progress', label: 'En cours', count: events.filter(e => e.status === 'in-progress').length },
    { id: 'completed', label: 'Terminés', count: events.filter(e => e.status === 'completed').length },
  ];

  const filteredEvents = selectedFilter === 'all' 
    ? events 
    : events.filter(event => event.status === selectedFilter);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} FCFA`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderEventCard = (event: Event) => {
    const StatusIcon = statusConfig[event.status].icon;
    
    return (
      <TouchableOpacity key={event.id} style={styles.eventCard}>
        <View style={styles.eventImageContainer}>
          <Image source={{ uri: event.image }} style={styles.eventImage} />
          <View style={[styles.statusBadge, { backgroundColor: statusConfig[event.status].backgroundColor }]}>
            <StatusIcon size={12} color={statusConfig[event.status].color} strokeWidth={2} />
            <Text style={[styles.statusText, { color: statusConfig[event.status].color }]}>
              {statusConfig[event.status].label}
            </Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical size={20} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.eventContent}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventType}>{event.type}</Text>
          </View>

          <View style={styles.eventDetails}>
            <View style={styles.eventDetailRow}>
              <Calendar size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.eventDetailText}>{formatDate(event.date)}</Text>
            </View>
            <View style={styles.eventDetailRow}>
              <Clock size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.eventDetailText}>{event.time}</Text>
            </View>
            <View style={styles.eventDetailRow}>
              <MapPin size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.eventDetailText}>{event.location}</Text>
            </View>
            <View style={styles.eventDetailRow}>
              <Users size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.eventDetailText}>{event.guestCount} invités</Text>
            </View>
          </View>

          {event.status !== 'completed' && (
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Progression</Text>
                <Text style={styles.progressPercentage}>{event.progress}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${event.progress}%`, backgroundColor: statusConfig[event.status].color }
                  ]} 
                />
              </View>
            </View>
          )}

          <View style={styles.providersSection}>
            <Text style={styles.providersTitle}>Prestataires ({event.providers.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.providersList}>
              {event.providers.map((provider) => (
                <View key={provider.id} style={styles.providerCard}>
                  <Image source={{ uri: provider.image }} style={styles.providerImage} />
                  <View style={styles.providerInfo}>
                    <Text style={styles.providerName} numberOfLines={1}>{provider.name}</Text>
                    <Text style={styles.providerService}>{provider.service}</Text>
                    <View style={styles.providerMeta}>
                      <View style={styles.providerRating}>
                        <Star size={12} color="#D4A853" fill="#D4A853" strokeWidth={0} />
                        <Text style={styles.ratingText}>{provider.rating}</Text>
                      </View>
                      <View 
                        style={[
                          styles.providerStatus, 
                          { backgroundColor: providerStatusConfig[provider.status].backgroundColor }
                        ]}
                      >
                        <Text 
                          style={[
                            styles.providerStatusText, 
                            { color: providerStatusConfig[provider.status].color }
                          ]}
                        >
                          {providerStatusConfig[provider.status].label}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.providerActions}>
                      <TouchableOpacity style={styles.actionButton}>
                        <MessageCircle size={16} color="#6B7280" strokeWidth={2} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Phone size={16} color="#6B7280" strokeWidth={2} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.eventFooter}>
            <Text style={styles.totalCost}>Total: {formatPrice(event.totalCost)}</Text>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Voir détails</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Mes Événements</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedFilter === filter.id && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === filter.id && styles.filterButtonTextActive,
                ]}
              >
                {filter.label}
              </Text>
              <View
                style={[
                  styles.filterCount,
                  selectedFilter === filter.id && styles.filterCountActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterCountText,
                    selectedFilter === filter.id && styles.filterCountTextActive,
                  ]}
                >
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Events List */}
      <ScrollView style={styles.eventsList} showsVerticalScrollIndicator={false}>
        {filteredEvents.length > 0 ? (
          <>
            {filteredEvents.map(renderEventCard)}
            <View style={styles.bottomSpacing} />
          </>
        ) : (
          <View style={styles.emptyState}>
            <Calendar size={64} color="#D1D5DB" strokeWidth={1} />
            <Text style={styles.emptyStateTitle}>Aucun événement</Text>
            <Text style={styles.emptyStateText}>
              {selectedFilter === 'all' 
                ? 'Vous n\'avez pas encore créé d\'événement'
                : `Aucun événement ${filters.find(f => f.id === selectedFilter)?.label.toLowerCase()}`
              }
            </Text>
            <TouchableOpacity style={styles.createEventButton}>
              <Plus size={20} color="white" strokeWidth={2} />
              <Text style={styles.createEventButtonText}>Créer un événement</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'DMSans-Bold',
    color: '#1A1D29',
  },
  addButton: {
    backgroundColor: '#D4A853',
    borderRadius: 12,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    marginTop: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  filterButtonActive: {
    backgroundColor: '#D4A853',
    borderColor: '#D4A853',
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#6B7280',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  filterCount: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  filterCountActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterCountText: {
    fontSize: 12,
    fontFamily: 'DMSans-SemiBold',
    color: '#6B7280',
  },
  filterCountTextActive: {
    color: 'white',
  },
  eventsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImageContainer: {
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'DMSans-SemiBold',
  },
  moreButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 20,
    fontFamily: 'DMSans-Bold',
    color: '#1A1D29',
    marginBottom: 4,
  },
  eventType: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#D4A853',
  },
  eventDetails: {
    gap: 8,
    marginBottom: 16,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventDetailText: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#1A1D29',
  },
  progressPercentage: {
    fontSize: 14,
    fontFamily: 'DMSans-SemiBold',
    color: '#D4A853',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  providersSection: {
    marginBottom: 16,
  },
  providersTitle: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
    marginBottom: 12,
  },
  providersList: {
    marginHorizontal: -4,
  },
  providerCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    width: 140,
  },
  providerImage: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  providerInfo: {
    gap: 4,
  },
  providerName: {
    fontSize: 14,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
  },
  providerService: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
  },
  providerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  providerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'DMSans-Medium',
    color: '#1A1D29',
  },
  providerStatus: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  providerStatusText: {
    fontSize: 10,
    fontFamily: 'DMSans-SemiBold',
  },
  providerActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  totalCost: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#D4A853',
  },
  viewButton: {
    backgroundColor: '#D4A853',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  viewButtonText: {
    fontSize: 14,
    fontFamily: 'DMSans-SemiBold',
    color: 'white',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'DMSans-Bold',
    color: '#1A1D29',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  createEventButton: {
    backgroundColor: '#D4A853',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  createEventButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: 'white',
  },
  bottomSpacing: {
    height: 100,
  },
});