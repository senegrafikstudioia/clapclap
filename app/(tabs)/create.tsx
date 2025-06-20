import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  DollarSign,
  ChevronRight,
  Plus,
  Minus,
  Camera,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface EventType {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

const eventTypes: EventType[] = [
  {
    id: 'birthday',
    name: 'Anniversaire',
    icon: '🎂',
    color: '#FF6B47',
    description: 'Fête d\'anniversaire mémorable',
  },
  {
    id: 'wedding',
    name: 'Mariage',
    icon: '💒',
    color: '#D4A853',
    description: 'Célébration de mariage',
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    icon: '👶',
    color: '#7FB069',
    description: 'Célébration de naissance',
  },
  {
    id: 'baptism',
    name: 'Baptême',
    icon: '🙏',
    color: '#CC6B49',
    description: 'Cérémonie de baptême',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    icon: '🏢',
    color: '#0984E3',
    description: 'Événement d\'entreprise',
  },
  {
    id: 'other',
    name: 'Autre',
    icon: '✨',
    color: '#E84393',
    description: 'Événement personnalisé',
  },
];

export default function CreateScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEventType, setSelectedEventType] = useState<string>('');
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    guestCount: 20,
    budget: { min: 50000, max: 150000 },
    location: '',
    description: '',
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const adjustGuestCount = (increment: boolean) => {
    setEventData(prev => ({
      ...prev,
      guestCount: increment 
        ? Math.min(prev.guestCount + 5, 500)
        : Math.max(prev.guestCount - 5, 5)
    }));
  };

  const adjustBudget = (type: 'min' | 'max', increment: boolean) => {
    const step = 25000;
    setEventData(prev => ({
      ...prev,
      budget: {
        ...prev.budget,
        [type]: increment
          ? prev.budget[type] + step
          : Math.max(prev.budget[type] - step, 10000)
      }
    }));
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} FCFA`;
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[
              styles.stepCircle,
              index + 1 <= currentStep && styles.stepCircleActive,
            ]}
          >
            <Text
              style={[
                styles.stepNumber,
                index + 1 <= currentStep && styles.stepNumberActive,
              ]}
            >
              {index + 1}
            </Text>
          </View>
          {index < totalSteps - 1 && (
            <View
              style={[
                styles.stepLine,
                index + 1 < currentStep && styles.stepLineActive,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Quel type d'événement organisez-vous ?</Text>
      <Text style={styles.stepSubtitle}>
        Choisissez le type d'événement pour des recommandations personnalisées
      </Text>

      <View style={styles.eventTypesGrid}>
        {eventTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.eventTypeCard,
              selectedEventType === type.id && styles.eventTypeCardSelected,
              { borderColor: type.color },
            ]}
            onPress={() => setSelectedEventType(type.id)}
          >
            <Text style={styles.eventTypeIcon}>{type.icon}</Text>
            <Text style={styles.eventTypeName}>{type.name}</Text>
            <Text style={styles.eventTypeDescription}>{type.description}</Text>
            {selectedEventType === type.id && (
              <View style={[styles.selectedIndicator, { backgroundColor: type.color }]}>
                <Text style={styles.selectedCheck}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Détails de l'événement</Text>
      <Text style={styles.stepSubtitle}>
        Donnez-nous les informations de base sur votre événement
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nom de l'événement</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Ex: Anniversaire de Fatou"
            value={eventData.title}
            onChangeText={(text) => setEventData(prev => ({ ...prev, title: text }))}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>Date</Text>
            <TouchableOpacity style={styles.dateInput}>
              <Calendar size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.dateInputText}>
                {eventData.date || 'Sélectionner'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.inputLabel}>Heure</Text>
            <TouchableOpacity style={styles.dateInput}>
              <Clock size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.dateInputText}>
                {eventData.time || '14:00'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Lieu</Text>
          <TouchableOpacity style={styles.locationInput}>
            <MapPin size={20} color="#6B7280" strokeWidth={2} />
            <TextInput
              style={styles.locationInputText}
              placeholder="Adresse de l'événement"
              value={eventData.location}
              onChangeText={(text) => setEventData(prev => ({ ...prev, location: text }))}
              placeholderTextColor="#9CA3AF"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Description (optionnel)</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Décrivez votre événement..."
            value={eventData.description}
            onChangeText={(text) => setEventData(prev => ({ ...prev, description: text }))}
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
          />
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Nombre d'invités et budget</Text>
      <Text style={styles.stepSubtitle}>
        Aidez-nous à vous proposer les meilleures options
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nombre d'invités</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => adjustGuestCount(false)}
            >
              <Minus size={20} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
            <View style={styles.counterValue}>
              <Users size={20} color="#D4A853" strokeWidth={2} />
              <Text style={styles.counterText}>{eventData.guestCount} invités</Text>
            </View>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => adjustGuestCount(true)}
            >
              <Plus size={20} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Budget estimé</Text>
          
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetLabel}>Budget minimum</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => adjustBudget('min', false)}
              >
                <Minus size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
              <View style={styles.counterValue}>
                <DollarSign size={20} color="#D4A853" strokeWidth={2} />
                <Text style={styles.counterText}>{formatPrice(eventData.budget.min)}</Text>
              </View>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => adjustBudget('min', true)}
              >
                <Plus size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.budgetContainer}>
            <Text style={styles.budgetLabel}>Budget maximum</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => adjustBudget('max', false)}
              >
                <Minus size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
              <View style={styles.counterValue}>
                <DollarSign size={20} color="#D4A853" strokeWidth={2} />
                <Text style={styles.counterText}>{formatPrice(eventData.budget.max)}</Text>
              </View>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => adjustBudget('max', true)}
              >
                <Plus size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.budgetRange}>
            <Text style={styles.budgetRangeText}>
              Fourchette: {formatPrice(eventData.budget.min)} - {formatPrice(eventData.budget.max)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContent}>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryHeader}>
          <Sparkles size={32} color="#D4A853" strokeWidth={2} />
          <Text style={styles.summaryTitle}>Récapitulatif de votre événement</Text>
          <Text style={styles.summarySubtitle}>
            Vérifiez les détails avant de continuer
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Type d'événement</Text>
            <View style={styles.summaryValue}>
              <Text style={styles.summaryIcon}>
                {eventTypes.find(t => t.id === selectedEventType)?.icon}
              </Text>
              <Text style={styles.summaryText}>
                {eventTypes.find(t => t.id === selectedEventType)?.name}
              </Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Nom</Text>
            <Text style={styles.summaryText}>{eventData.title || 'Non spécifié'}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Invités</Text>
            <Text style={styles.summaryText}>{eventData.guestCount} personnes</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Budget</Text>
            <Text style={styles.summaryText}>
              {formatPrice(eventData.budget.min)} - {formatPrice(eventData.budget.max)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Lieu</Text>
            <Text style={styles.summaryText}>{eventData.location || 'À définir'}</Text>
          </View>
        </View>

        <View style={styles.nextStepsContainer}>
          <Text style={styles.nextStepsTitle}>Prochaines étapes</Text>
          <View style={styles.nextStepItem}>
            <View style={styles.nextStepNumber}>
              <Text style={styles.nextStepNumberText}>1</Text>
            </View>
            <Text style={styles.nextStepText}>Recherche de prestataires adaptés</Text>
          </View>
          <View style={styles.nextStepItem}>
            <View style={styles.nextStepNumber}>
              <Text style={styles.nextStepNumberText}>2</Text>
            </View>
            <Text style={styles.nextStepText}>Sélection et réservation des services</Text>
          </View>
          <View style={styles.nextStepItem}>
            <View style={styles.nextStepNumber}>
              <Text style={styles.nextStepNumberText}>3</Text>
            </View>
            <Text style={styles.nextStepText}>Coordination et suivi de l'événement</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedEventType !== '';
      case 2:
        return eventData.title.trim() !== '';
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Créer un événement</Text>
        <Text style={styles.headerSubtitle}>
          Étape {currentStep} sur {totalSteps}
        </Text>
        {renderStepIndicator()}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCurrentStep()}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigation}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={handlePrevious}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[
            styles.nextButton,
            !canProceed() && styles.nextButtonDisabled,
            currentStep === 1 && styles.nextButtonFull,
          ]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps ? 'Rechercher des prestataires' : 'Continuer'}
          </Text>
          <ChevronRight size={20} color="white" strokeWidth={2} />
        </TouchableOpacity>
      </View>
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
    paddingBottom: 20,
    backgroundColor: '#F7F3E9',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'DMSans-Bold',
    color: '#1A1D29',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
    marginBottom: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#D4A853',
  },
  stepNumber: {
    fontSize: 14,
    fontFamily: 'DMSans-SemiBold',
    color: '#6B7280',
  },
  stepNumberActive: {
    color: 'white',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#D4A853',
  },
  content: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontFamily: 'DMSans-Bold',
    color: '#1A1D29',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 24,
  },
  eventTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  eventTypeCard: {
    width: (width - 56) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventTypeCardSelected: {
    borderWidth: 2,
  },
  eventTypeIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  eventTypeName: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
    marginBottom: 4,
    textAlign: 'center',
  },
  eventTypeDescription: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  selectedIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheck: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#1A1D29',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputRow: {
    flexDirection: 'row',
  },
  dateInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateInputText: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#1A1D29',
  },
  locationInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locationInputText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#1A1D29',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  counterText: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
  },
  budgetContainer: {
    gap: 8,
    marginBottom: 16,
  },
  budgetLabel: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#6B7280',
  },
  budgetRange: {
    backgroundColor: '#F7F3E9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  budgetRangeText: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#D4A853',
  },
  summaryContainer: {
    gap: 24,
  },
  summaryHeader: {
    alignItems: 'center',
    gap: 8,
  },
  summaryTitle: {
    fontSize: 24,
    fontFamily: 'DMSans-Bold',
    color: '#1A1D29',
    textAlign: 'center',
  },
  summarySubtitle: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#6B7280',
  },
  summaryValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryIcon: {
    fontSize: 16,
  },
  summaryText: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
    textAlign: 'right',
    flex: 1,
  },
  nextStepsContainer: {
    gap: 16,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
  },
  nextStepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nextStepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D4A853',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextStepNumberText: {
    fontSize: 12,
    fontFamily: 'DMSans-Bold',
    color: 'white',
  },
  nextStepText: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
    flex: 1,
  },
  navigation: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: '#6B7280',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#D4A853',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonFull: {
    flex: 1,
  },
  nextButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
    color: 'white',
  },
  bottomSpacing: {
    height: 40,
  },
});