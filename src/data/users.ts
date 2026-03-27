import type { User } from '../components/UserCard/UserCard'

export const DUMMY_USERS: User[] = [
  {
    id: 1, name: 'Aisha Rahman', type: 'patient',
    email: 'aisha.r@email.com', phone: '+1 555-0101',
    detail: 'Requires post-surgery rehabilitation support and weekly physiotherapy assistance.',
    status: 'Active', date: 'Mar 20, 2026', avatar: '👩'
  },
  {
    id: 2, name: 'Marcus Chen', type: 'volunteer',
    email: 'marcus.c@email.com', phone: '+1 555-0102',
    detail: 'Certified nursing assistant with 5 years of experience. Available on weekends.',
    status: 'Active', date: 'Mar 18, 2026', avatar: '👨'
  },
  {
    id: 3, name: 'Priya Nair', type: 'patient',
    email: 'priya.n@email.com', phone: '+1 555-0103',
    detail: 'Managing type-2 diabetes. Needs dietary guidance and medication reminders.',
    status: 'Pending', date: 'Mar 22, 2026', avatar: '👩‍⚕️'
  },
  {
    id: 4, name: 'James Okoye', type: 'volunteer',
    email: 'james.o@email.com', phone: '+1 555-0104',
    detail: 'Mental health counselor. Specializes in grief therapy and trauma recovery.',
    status: 'Active', date: 'Mar 15, 2026', avatar: '🧑'
  },
  {
    id: 5, name: 'Sofia Morales', type: 'contact',
    email: 'sofia.m@email.com',
    detail: 'Inquiring about partnership opportunities for a local community health clinic.',
    status: 'Resolved', date: 'Mar 10, 2026', avatar: '👩‍💼'
  },
  {
    id: 6, name: 'David Kim', type: 'patient',
    email: 'david.k@email.com', phone: '+1 555-0106',
    detail: 'Elderly patient needing transportation assistance to weekly dialysis appointments.',
    status: 'Active', date: 'Mar 23, 2026', avatar: '🧓'
  },
  {
    id: 7, name: 'Elena Volkov', type: 'volunteer',
    email: 'elena.v@email.com', phone: '+1 555-0107',
    detail: 'Registered nurse with pediatric care specialization. Weekday mornings available.',
    status: 'Pending', date: 'Mar 24, 2026', avatar: '👩‍🔬'
  },
  {
    id: 8, name: 'Tariq Hassan', type: 'contact',
    email: 'tariq.h@email.com',
    detail: 'Requesting information about HealthConnect services for an underserved community.',
    status: 'Pending', date: 'Mar 25, 2026', avatar: '🧑‍💻'
  },
  {
    id: 9, name: 'Linda Park', type: 'patient',
    email: 'linda.p@email.com', phone: '+1 555-0109',
    detail: 'Recovering from a stroke. Needs speech therapy referrals and daily check-ins.',
    status: 'Active', date: 'Mar 19, 2026', avatar: '👵'
  },
  {
    id: 10, name: 'Omar Diallo', type: 'volunteer',
    email: 'omar.d@email.com', phone: '+1 555-0110',
    detail: 'Medical student offering tutoring and health education for community outreach.',
    status: 'Active', date: 'Mar 17, 2026', avatar: '👨‍🎓'
  },
  {
    id: 11, name: 'Grace Thompson', type: 'contact',
    email: 'grace.t@email.com',
    detail: 'Journalist researching HealthConnect impact for a healthcare magazine feature.',
    status: 'Resolved', date: 'Mar 8, 2026', avatar: '✍️'
  },
  {
    id: 12, name: 'Ravi Sharma', type: 'patient',
    email: 'ravi.s@email.com', phone: '+1 555-0112',
    detail: 'Chronic back pain management. Looking for physiotherapy and pain specialists.',
    status: 'Pending', date: 'Mar 26, 2026', avatar: '🧔'
  },
]
