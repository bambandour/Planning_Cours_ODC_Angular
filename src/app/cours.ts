
export interface Data {
    message: string
    data: Cours[]
    success?: boolean
    error?: string
}

export interface data {
    session: Session[]
    salle: Salle[]
  }
export interface Cours {
    id: number
    annee_semestre: AnneeSemestre
    annee_classe: AnneeClasse
    prof_module: ProfModule
    heure_globale: number
    etat: boolean
} 
export interface AnneeSemestre {
    id: number
    annee_scolaire: string
    semestre: string
}
export interface AnneeClasse {
    id: number
    classe: Classe
}

export interface Classe {
    id: number
    libelle: string
    filiere: string
    effectif: number
    niveau: string
}

export interface ProfModule {
    id: number
    module: string
    prof: string
}

export interface Session {
    id: number
    date: string
    heure_debut: number
    heure_fin: number
    duree: number
    cours: Cours|number
    type_session: string
    salle: string
    etat: number
  }
  export interface Salle {
    id: number
    libelle: string
    nombre_places: number
    numero: string
  }
