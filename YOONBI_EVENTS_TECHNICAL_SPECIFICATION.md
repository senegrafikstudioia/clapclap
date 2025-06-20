# Yoonbi Events - Technical Specification Document

## Version 1.0 | January 2025

---

## Executive Summary

**Yoonbi Events** est une application mobile compl?te con?ue pour r?volutionner l'industrie de l'?v?nementiel au S?n?gal en connectant les utilisateurs avec des prestataires de services v?rifi?s pour des ?v?nements ? domicile et de petite envergure. La plateforme r?pond ? la nature fragment?e de l'industrie s?n?galaise de l'?v?nementiel en fournissant une solution centralis?e et conviviale pour organiser des c?l?brations m?morables.

**Proposition de valeur cl? :** Transformer la planification d'?v?nements, d'un processus stressant et chronophage, en une exp?rience agr?able et rationalis?e gr?ce ? la technologie, l'expertise locale et la compr?hension culturelle.

---

## 1. Project Overview

### 1.1 Vision Statement

Devenir l'?cosyst?me num?rique de planification d'?v?nements premier en Afrique de l'Ouest, permettant aux particuliers et aux entreprises de cr?er des exp?riences inoubliables gr?ce ? une technologie transparente et des partenariats locaux de confiance.

### 1.2 Mission Statement

D?mocratiser l'acc?s aux services d'?v?nements professionnels tout en pr?servant les valeurs et traditions culturelles s?n?galaises gr?ce ? une technologie mobile innovante.

### 1.3 Core Value Proposition

- **Commodit? :** R?servez plusieurs services en quelques clics
- **Confiance :** Prestataires v?rifi?s avec ?valuations transparentes
- **Abordabilit? :** Tarification comp?titive avec options de paiement flexibles
- **Authenticit? culturelle :** Services respectant les traditions locales
- **Assurance qualit? :** Normes professionnelles avec garanties de satisfaction

### 1.4 Market Opportunity

- **Taille du march? :** L'industrie de l'?v?nement au S?n?gal est estim?e ? plus de 50 milliards de FCFA par an
- **P?n?tration num?rique :** Taux d'adoption des smartphones de 78 % dans les zones urbaines
- **Infrastructure de paiement :** ?cosyst?me de mobile money solide (Orange Money, Wave, Free Money)
- **?cart concurrentiel :** Aucune plateforme compl?te de planification d'?v?nements n'existe actuellement

---

## 2. Market Analysis & Geographic Scope

## 2.1 Primary Markets (Phase 1)

| City | Population | Smartphone Penetration | Market Priority |
|------|------------|----------------------|----------------|
| **Dakar** | 3.2M | 85% | High (Launch) |
| **ThiÃ¨s** | 380K | 75% | High (Month 2) |
| **Mbour** | 180K | 70% | Medium (Month 4) |

## 2.2 Secondary Markets (Phase 2)

| City | Population | Smartphone Penetration | Market Priority |
|------|------------|----------------------|----------------|
| **Saint-Louis** | 250K | 65% | Medium (Month 8) |
| **Kaolack** | 280K | 60% | Medium (Month 10) |
| **Banjul (Gambia)** | 400K | 72% | Low (Year 2) |

## 2.3 Market Segmentation

### Primary Users (B2C)

1. **Family Organizers (45%)**
   - Demographics: Ages 25-45, household income 200K-800K FCFA/month
   - Events: Children's birthdays, baptisms, family reunions
   - Pain Points: Time constraints, supplier reliability, budget management

2. **Young Couples (30%)**
   - Demographics: Ages 22-35, household income 300K-1.2M FCFA/month
   - Events: Weddings, baby showers, anniversaries
   - Pain Points: Coordination complexity, quality assurance, style consistency

3. **SME Managers (25%)**
   - Demographics: Business owners, managers, ages 30-50
   - Events: Corporate parties, product launches, team building
   - Pain Points: Professional standards, time efficiency, cost control

### Service Providers (B2B)

1. **Individual Professionals (60%)**
   - Caterers, decorators, photographers, entertainers
   - Revenue: 100K-2M FCFA/month
   - Needs: Customer acquisition, scheduling, payment processing

2. **Small Agencies (30%)**
   - Event planning companies with 2-10 employees
   - Revenue: 500K-5M FCFA/month
   - Needs: Digital presence, lead generation, workflow management

3. **Equipment Rental (10%)**
   - Tent, furniture, sound system providers
   - Revenue: 200K-3M FCFA/month
   - Needs: Inventory management, booking coordination

---

## ðŸ‘¤ 3. User Personas & Journey Mapping

## 3.1 Primary Persona: Aicha - Working Mother

**Demographics:**

- Age: 32, Marketing Manager
- Income: 450K FCFA/month
- Location: Dakar (Almadies)
- Family: Married, 2 children (ages 4 and 7)

**Goals:**

- Organize memorable birthday parties for her children
- Save time while ensuring quality experiences
- Stay within budget (max 100K FCFA per event)

**Pain Points:**

- Limited time for coordination
- Difficulty finding reliable providers
- Price transparency issues
- Language barriers with some providers

**User Journey:**

1. **Discovery:** Searches for "birthday party Dakar" on Google
2. **Evaluation:** Compares Yoonbi with traditional methods
3. **Registration:** Signs up using phone number
4. **Planning:** Uses "Kids Birthday Pack" with customizations
5. **Booking:** Books 3 providers for next Saturday
6. **Management:** Tracks progress via app notifications
7. **Experience:** Enjoys successful event
8. **Feedback:** Rates providers and shares photos

## 3.2 Secondary Persona: Mamadou - Event Decorator

**Demographics:**

- Age: 28, Professional Decorator
- Income: 800K FCFA/month
- Location: Dakar (MÃ©dina)
- Experience: 5 years in event decoration

**Goals:**

- Increase monthly bookings by 40%
- Build reputation through verified reviews
- Streamline booking and payment processes

**Pain Points:**

- Irregular income flow
- Customer acquisition challenges
- Payment delays and disputes
- No digital presence

**Provider Journey:**

1. **Recruitment:** Invited through referral program
2. **Verification:** Submits documents for KYC process
3. **Onboarding:** Completes profile and service setup
4. **Listing:** Services go live after approval
5. **Booking:** Receives notifications for new opportunities
6. **Execution:** Delivers services to clients
7. **Payment:** Receives funds within 48 hours
8. **Growth:** Builds rating and expands service offerings

---

## ðŸ“± 4. Core Features & Functionalities

## 4.1 User-Facing Features

### 4.1.0 Account Creation & User Registration

**Fonctionnalit?s :**

- Formulaire d’inscription avec champs : pr?nom, nom, t?l?phone (obligatoire), email (optionnel), mot de passe, langue pr?f?r?e
- V?rification du num?ro de t?l?phone par OTP (SMS)
- Validation du mot de passe (force, confirmation)
- Gestion des erreurs (num?ro d?j? utilis?, OTP incorrect, etc.)
- Cr?ation du compte utilisateur en base de donn?es
- Connexion automatique apr?s validation

```typescript
// API d’inscription utilisateur
interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  password: string;
  preferredLanguage?: string;
}

interface RegisterUserResponse {
  userId: string;
  phone: string;
  email?: string;
  jwt: string;
  verified: boolean;
}

// Exemple de flow d’inscription
1. L’utilisateur remplit le formulaire et soumet ses informations.
2. L’API cr?e un utilisateur (statut : non v?rifi?) et envoie un OTP par SMS.
3. L’utilisateur saisit l’OTP pour valider son compte.
4. L’API v?rifie l’OTP, active le compte et retourne un JWT.
```

---

## 5. Advanced Technology Modules
