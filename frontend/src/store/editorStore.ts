import { create } from 'zustand'

export type DocumentType = 'OFFER_LETTER' | 'JOINING_LETTER'

export interface CandidateDetails {
  name: string
  email: string
  designation: string
  salary: string
  joiningDate: string
  department: string
  employmentType: string
}

export interface BrandingData {
  logoUrl?: string
  signatureUrl?: string
  sealUrl?: string
  primaryColor: string
}

interface EditorState {
  documentId: string
  step: number
  type: DocumentType
  branding: BrandingData
  candidate: CandidateDetails
  contentHTML: string
  isSaving: boolean
  lastSavedAt: Date | null
  
  // Actions
  setStep: (step: number) => void
  setType: (type: DocumentType) => void
  updateCandidate: (data: Partial<CandidateDetails>) => void
  updateBranding: (data: Partial<BrandingData>) => void
  setContentHTML: (html: string) => void
  saveDraft: () => Promise<void>
}

const defaultCandidate: CandidateDetails = {
  name: '',
  email: '',
  designation: '',
  salary: '',
  joiningDate: '',
  department: '',
  employmentType: 'Full-time'
}

const defaultBranding: BrandingData = {
  primaryColor: '#2D136F'
}

// Initial default content for the Tiptap editor
const defaultOfferContent = `
  <p>Dear {{candidate_name}},</p>
  <p>We are thrilled to offer you the position of <strong>{{designation}}</strong> at {{company_name}}.</p>
  <p>Your compensation will be <strong>{{salary}}</strong>, and your expected joining date is <strong>{{joining_date}}</strong>.</p>
  <p>We look forward to welcoming you to the team!</p>
`

export const useEditorStore = create<EditorState>((set, get) => ({
  documentId: 'new',
  step: 1,
  type: 'OFFER_LETTER',
  branding: defaultBranding,
  candidate: defaultCandidate,
  contentHTML: defaultOfferContent,
  isSaving: false,
  lastSavedAt: null,

  setStep: (step) => set({ step }),
  setType: (type) => set({ 
    type, 
    contentHTML: type === 'OFFER_LETTER' ? defaultOfferContent : '<p>Welcome aboard {{candidate_name}}...</p>' 
  }),
  updateCandidate: (data) => set((state) => ({ 
    candidate: { ...state.candidate, ...data } 
  })),
  updateBranding: (data) => set((state) => ({ 
    branding: { ...state.branding, ...data } 
  })),
  setContentHTML: (html) => set({ contentHTML: html }),
  
  // Simple mock save function for now. Real debounce logic usually goes in a useEffect in the component.
  saveDraft: async () => {
    set({ isSaving: true })
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    set({ isSaving: false, lastSavedAt: new Date() })
  }
}))
