export interface Salon {
  id: string;
  name: string;
  description: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  openingHours: OpeningHours;
  isActive: boolean;
}

export interface OpeningHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface Staff {
  id: string;
  salonId: string;
  name: string;
  email: string;
  phone?: string;
  role: StaffRole;
  specialties?: string[];
  avatar?: string;
  isActive: boolean;
}

export type StaffRole = "owner" | "manager" | "stylist" | "assistant";

export interface Treatment {
  id: string;
  salonId: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  isActive: boolean;
}

export interface Appointment {
  id: string;
  salonId: string;
  customerId: string;
  staffId: string;
  treatmentId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  depositPaid: boolean;
}

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no-show";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
