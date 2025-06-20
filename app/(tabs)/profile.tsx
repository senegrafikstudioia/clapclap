import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Switch,
} from 'react-native';
import { User, Settings, Bell, Heart, CreditCard, CircleHelp as HelpCircle, Shield, LogOut, ChevronRight, CreditCard as Edit3, MapPin, Phone, Mail, Calendar, Star, Award, Gift, Users } from 'lucide-react-native';

interface ProfileStat {
  id: string;
  label: string;
  value: string;
  icon: any;
  color: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  color: string;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
}

const profileStats: ProfileStat[] = [
  {
    id: 'events',
    label: 'Événements',
    value: '12',
    icon: Calendar,
    color: '#D4A853',
  },
  {
    id: 'favorites',
    label: 'Favoris',
    value: '8',
    icon: Heart,
    color: '#FF6B47',
  },
  {
    id: 'rating',
    label: 'Note moyenne',
    value: '4.8',
    icon: Star,
    color: '#7FB069',
  },
  {
    id: 'points',
    label: 'Points fidélité',
    value: '2,450',
    icon: Award,
    color: '#E84393',
  },
];

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const accountMenuItems: MenuItem[] = [
    {
      id: 'edit-profile',
      label: 'Modifier le profil',
      icon: Edit3,
      color: '#6B7280',
      onPress: () => console.log('Edit profile'),
    },
    {
      id: 'payment-methods',
      label: 'Moyens de paiement',
      icon: CreditCard,
      color: '#6B7280',
      onPress: () => console.log('Payment methods'),
    },
    {
      id: 'favorites',
      label: 'Mes favoris',
      icon: Heart,
      color: '#FF6B47',
      onPress: () => console.log('Favorites'),
    },
    {
      id: 'loyalty',
      label: 'Programme de fidélité',
      icon: Gift,
      color: '#E84393',
      onPress: () => console.log('Loyalty program'),
    },
  ];

  const settingsMenuItems: MenuItem[] = [
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      color: '#D4A853',
      hasSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled,
    },
    {
      id: 'location',
      label: 'Localisation',
      icon: MapPin,
      color: '#7FB069',
      hasSwitch: true,
      switchValue: locationEnabled,
      onSwitchChange: setLocationEnabled,
    },
    {
      id: 'marketing',
      label: 'Communications marketing',
      icon: Mail,
      color: '#0984E3',
      hasSwitch: true,
      switchValue: marketingEnabled,
      onSwitchChange: setMarketingEnabled,
    },
  ];

  const supportMenuItems: MenuItem[] = [
    {
      id: 'help',
      label: 'Centre d\'aide',
      icon: HelpCircle,
      color: '#6B7280',
      onPress: () => console.log('Help center'),
    },
    {
      id: 'privacy',
      label: 'Confidentialité',
      icon: Shield,
      color: '#6B7280',
      onPress: () => console.log('Privacy'),
    },
    {
      id: 'invite',
      label: 'Inviter des amis',
      icon: Users,
      color: '#7FB069',
      onPress: () => console.log('Invite friends'),
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
      disabled={item.hasSwitch}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuItemIcon, { backgroundColor: `${item.color}15` }]}>
          <item.icon size={20} color={item.color} strokeWidth={2} />
        </View>
        <Text style={styles.menuItemText}>{item.label}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {item.hasSwitch ? (
          <Switch
            value={item.switchValue}
            onValueChange={item.onSwitchChange}
            trackColor={{ false: '#E5E7EB', true: '#D4A853' }}
            thumbColor={item.switchValue ? '#FFFFFF' : '#FFFFFF'}
          />
        ) : (
          <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Edit3 size={16} color="white" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Aicha Diallo</Text>
            <View style={styles.profileDetail}>
              <Phone size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.profileDetailText}>+221 77 123 4567</Text>
            </View>
            <View style={styles.profileDetail}>
              <Mail size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.profileDetailText}>aicha.diallo@email.com</Text>
            </View>
            <View style={styles.profileDetail}>
              <MapPin size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.profileDetailText}>Almadies, Dakar</Text>
            </View>
          </View>
        </View>

        {/* Profile Stats */}
        <View style={styles.statsContainer}>
          {profileStats.map((stat) => (
            <TouchableOpacity key={stat.id} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                <stat.icon size={20} color={stat.color} strokeWidth={2} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Menu Sections */}
      <View style={styles.content}>
        {/* Account Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Mon compte</Text>
          <View style={styles.menuContainer}>
            {accountMenuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          <View style={styles.menuContainer}>
            {settingsMenuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuContainer}>
            {supportMenuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Logout */}
        <View style={styles.menuSection}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.logoutItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIcon, { backgroundColor: '#FEE2E2' }]}>
                  <LogOut size={20} color="#EF4444" strokeWidth={2} />
                </View>
                <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Se déconnecter</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Yoonbi Events v1.0.0</Text>
          <Text style={styles.appInfoText}>© 2025 Yoonbi. Tous droits réservés.</Text>
        </View>

        <View style={styles.bottomSpacing} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 24,
    alignItems: 'center',
    gap: 16,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#D4A853',
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileInfo: {
    flex: 1,
    gap: 6,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'DMSans-Bold',
    color: '#1A1D29',
    marginBottom: 4,
  },
  profileDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileDetailText: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#1A1D29',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  menuSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'DMSans-SemiBold',
    color: '#1A1D29',
    marginBottom: 16,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'DMSans-Medium',
    color: '#1A1D29',
  },
  menuItemRight: {
    alignItems: 'center',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  appInfo: {
    alignItems: 'center',
    gap: 4,
    marginTop: 24,
  },
  appInfoText: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#9CA3AF',
  },
  bottomSpacing: {
    height: 100,
  },
});