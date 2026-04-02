# InventoPro

## 1. Project Description
**InventoPro** est une application SaaS web & mobile permettant à des conciergeries Airbnb, propriétaires de location courte durée et investisseurs immobiliers de créer facilement des inventaires professionnels (état des lieux) avec photos, descriptions et génération automatique d'un rapport PDF juridiquement valable — sans faire appel à un expert.

**Cible :** Conciergeries Airbnb, propriétaires de location courte durée, agents immobiliers  
**Valeur clé :** Remplacer les prestations professionnelles d'inventaire (coût, délai) par une solution autonome, rapide et légalement robuste.

---

## 2. Page Structure

- `/` — Landing page marketing (sections : Hero, Parcours guidé, Gestion des objets, Photos intelligentes, Rapport PDF, Modèles, Cloud, Tarifs, Footer)
- `/app` — Dashboard principal (liste des logements)
- `/app/property/:id` — Détail d'un logement
- `/app/inventory/new` — Créer un nouvel inventaire (wizard guidé)
- `/app/inventory/:id` — Détail d'un inventaire
- `/app/inventory/:id/report` — Aperçu / export du rapport PDF
- `/login` — Connexion
- `/register` — Inscription

---

## 3. Core Features

- [ ] Landing page marketing complète
- [ ] Authentification (inscription / connexion)
- [ ] Dashboard multi-logements
- [ ] Wizard d'inventaire guidé pièce par pièce
- [ ] Gestion des objets (nom, état, description, valeur)
- [ ] Prise de photos avec horodatage
- [ ] Génération de rapport PDF professionnel
- [ ] Signature électronique
- [ ] Modèles pré-remplis (Airbnb, meublé, état des lieux)
- [ ] Checklist ménage
- [ ] Mode inspection rapide (2 min)
- [ ] Comparaison entre deux inventaires
- [ ] Export & partage (lien, email)
- [ ] Accès hors ligne (PWA)

---

## 4. Data Model Design

### Table: users
| Champ | Type | Description |
|-------|------|-------------|
| id | uuid | Clé primaire |
| email | text | Email utilisateur |
| full_name | text | Nom complet |
| plan | text | starter / pro / enterprise |
| created_at | timestamp | Date de création |

### Table: properties
| Champ | Type | Description |
|-------|------|-------------|
| id | uuid | Clé primaire |
| user_id | uuid | FK → users |
| name | text | Nom du logement |
| address | text | Adresse |
| type | text | appartement / maison / studio |

### Table: inventories
| Champ | Type | Description |
|-------|------|-------------|
| id | uuid | Clé primaire |
| property_id | uuid | FK → properties |
| type | text | entrée / sortie |
| status | text | draft / completed |
| created_at | timestamp | Date |
| signed_at | timestamp | Date de signature |

### Table: rooms
| Champ | Type | Description |
|-------|------|-------------|
| id | uuid | Clé primaire |
| inventory_id | uuid | FK → inventories |
| name | text | Entrée, Salon... |
| order | int | Ordre d'affichage |

### Table: items
| Champ | Type | Description |
|-------|------|-------------|
| id | uuid | Clé primaire |
| room_id | uuid | FK → rooms |
| name | text | Nom de l'objet |
| description | text | Description |
| condition | text | neuf/bon/usé/endommagé |
| estimated_value | numeric | Valeur estimée |
| photos | jsonb | Tableau d'URLs photos |

---

## 5. Backend / Third-party Integration Plan

- **Supabase** : Auth, Database, Storage (photos), Edge Functions (génération PDF)
- **Shopify** : Non requis
- **Stripe** : Paiement abonnement Pro / Enterprise
- **jsPDF / pdfmake** : Génération PDF côté client ou edge function

---

## 6. Development Phase Plan

### Phase 1 : Landing page marketing ✅
- Objectif : Créer la vitrine du produit avec toutes les sections
- Livrable : Landing page complète et responsive

### Phase 2 : Authentification
- Objectif : Inscription et connexion utilisateur (Supabase Auth)
- Livrable : Pages /login et /register fonctionnelles

### Phase 3 : Dashboard & Logements
- Objectif : Gestion des logements multi-propriétés
- Livrable : Dashboard avec liste et ajout de logements

### Phase 4 : Wizard d'inventaire
- Objectif : Parcours guidé pièce par pièce avec ajout d'objets et photos
- Livrable : Wizard complet fonctionnel

### Phase 5 : Génération PDF & Signature
- Objectif : Rapport PDF professionnel + signature électronique
- Livrable : Export PDF et signature

### Phase 6 : Modèles, comparaison & fonctions avancées
- Objectif : Templates, mode rapide, comparaison d'inventaires
- Livrable : Toutes les fonctionnalités avancées
