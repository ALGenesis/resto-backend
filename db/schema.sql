CREATE TABLE Type_Ressource (
    id SERIAL PRIMARY KEY,
    libelle VARCHAR NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE Resto (
    id SERIAL PRIMARY KEY,
    adresse VARCHAR NOT NULL,
    nom VARCHAR UNIQUE NOT NULL,
    doc_juridique VARCHAR UNIQUE NOT NULL, 
    site VARCHAR UNIQUE,
    tel VARCHAR UNIQUE NOT NULL,
    nom_responsable VARCHAR NOT NULL,
    prenom VARCHAR NOT NULL,
    tel_responsable VARCHAR UNIQUE NOT NULL
);

CREATE TABLE Client (
    id SERIAL PRIMARY KEY,
    nom VARCHAR NOT NULL,
    prenom VARCHAR NOT NULL,
    tel VARCHAR UNIQUE NOT NULL
);

CREATE TABLE Plat (
    id SERIAL PRIMARY KEY,
    nom_du_plat VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    prix DECIMAL(10,2) NOT NULL CHECK (prix > 0),
    quantite INTEGER NOT NULL CHECK (quantite >= 0),
    disponible BOOLEAN DEFAULT TRUE
);

CREATE TABLE Ressource (
    id SERIAL PRIMARY KEY,
    type_ressource_id INTEGER NOT NULL,
    quantite INTEGER NOT NULL CHECK (quantite >= 0),
    nom_ressource VARCHAR NOT NULL,
    prix_achat DECIMAL(10,2) NOT NULL CHECK (prix_achat > 0),
    FOREIGN KEY (type_ressource_id) REFERENCES Type_Ressource(id)
);

CREATE TABLE Personnel (
    id SERIAL PRIMARY KEY,
    nom VARCHAR NOT NULL,
    prenom VARCHAR NOT NULL,
    adresse VARCHAR NOT NULL,
    tel VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    horaire_debut TIME NOT NULL,
    horaire_fin TIME NOT NULL,
    cv TEXT,
    poste VARCHAR NOT NULL,
    sexe VARCHAR NOT NULL CHECK (sexe IN ('M', 'F', 'Autre')),
    contrat VARCHAR NOT NULL
);

CREATE TABLE Fournisseur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR NOT NULL,
    prenom VARCHAR NOT NULL,
    adresse VARCHAR NOT NULL,
    tel VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL
);

CREATE TABLE Commande_Fournisseur (
    id SERIAL PRIMARY KEY,
    fournisseur_id INTEGER NOT NULL,
    ressources_id INTEGER NOT NULL,
    date_commande DATE DEFAULT CURRENT_DATE,
    quantite_commande INTEGER NOT NULL CHECK (quantite_commande > 0),
    prix_total DECIMAL(10,2),
    FOREIGN KEY (fournisseur_id) REFERENCES Fournisseur(id),
    FOREIGN KEY (ressources_id) REFERENCES Ressource(id)
);

CREATE TABLE Commande_Client (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL,
    resto_id INTEGER NOT NULL,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR NOT NULL DEFAULT 'en cours' CHECK (statut IN ('en cours', 'validée', 'préparée', 'servie', 'annulée')),
    total DECIMAL(10,2),
    FOREIGN KEY (client_id) REFERENCES Client(id),
    FOREIGN KEY (resto_id) REFERENCES Resto(id)
);

CREATE TABLE Commande_client_item (
    id SERIAL PRIMARY KEY,
    commande_client_id INTEGER NOT NULL,
    plat_id INTEGER NOT NULL,
    quantite INTEGER NOT NULL CHECK (quantite > 0),
    prix_unitaire DECIMAL(10,2) NOT NULL CHECK (prix_unitaire >= 0),
    remarques TEXT,
    FOREIGN KEY (commande_client_id) REFERENCES Commande_Client(id),
    FOREIGN KEY (plat_id) REFERENCES Plat(id)
);