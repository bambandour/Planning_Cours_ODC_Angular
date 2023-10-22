import { Time } from "@angular/common"
import { CalendarEvent } from "angular-calendar"

export interface Data {
    message: string
    data: Cours[]
    success?: boolean
    error?: string
}

export interface Root {
  message: string
  data: Notification[]
  success?: boolean
  error?: string
}

export interface Classroom {
  message: string
  data: ClassElfe[]
  success?: boolean
  error?: string
}

export interface Notification {
  id: number
  motif: string
  statut: string
  session: Session
}

export interface ClassElfe {
  id: number
  classe: Classe
  eleves: User[]
  effectif: number
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
    effectif?: number
    niveau: string
}

export interface ProfModule {
    id: number
    module: string
    prof: string
}

export interface Session extends CalendarEvent {
    id: number
    date: string
    heure_debut: Time
    heure_fin: Time
    duree: number
    cours: Cours
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

  export interface User{
    id:number
    nom:string
    prenom:string
    login:string
    date_naissance?:string
    grade?:string
    specialite?:string
    role:string
  }

  export interface Connexion {
    token:string
    user:User
  }

