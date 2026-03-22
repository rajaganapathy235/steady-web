export interface Client {
  id: string;
  business_name: string;
  domain: string;
  status: 'live' | 'suspended' | 'dns-error';
  due_date: string;
  is_suspended: boolean;
  dokploy_app_id: string;
  github_repo: string;
  login_url?: string;
  login_username?: string;
  login_password?: string;
  created: string;
}

export interface Payment {
  id: string;
  client_id: string;
  client_name: string;
  amount: number;
  month: string;
  status: 'pending' | 'approved' | 'rejected';
  screenshot_url?: string;
  created: string;
}

export interface Ticket {
  id: string;
  client_id: string;
  client_name: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  attachment_url?: string;
  created: string;
}

export interface AnalyticsData {
  week: string;
  visitors: number;
  whatsapp_clicks: number;
}

export const mockClients: Client[] = [
  {
    id: '1',
    business_name: 'Sharma Electronics',
    domain: 'sharmaelectronics.in',
    status: 'live',
    due_date: '2026-04-15',
    is_suspended: false,
    dokploy_app_id: 'dk_app_001',
    github_repo: 'https://github.com/waas/sharma-electronics',
    login_url: 'https://sharmaelectronics.in/wp-admin',
    login_username: 'admin',
    login_password: 'S3cur3P@ss!',
    created: '2025-11-01',
  },
  {
    id: '2',
    business_name: 'Patel Textiles',
    domain: 'pateltextiles.com',
    status: 'suspended',
    due_date: '2026-03-01',
    is_suspended: true,
    dokploy_app_id: 'dk_app_002',
    github_repo: 'https://github.com/waas/patel-textiles',
    login_url: 'https://pateltextiles.com/admin',
    login_username: 'patel_admin',
    login_password: 'Tx!l3s2024',
    created: '2025-09-15',
  },
  {
    id: '3',
    business_name: 'Mumbai Bakes',
    domain: 'mumbaibakes.in',
    status: 'dns-error',
    due_date: '2026-04-20',
    is_suspended: false,
    dokploy_app_id: 'dk_app_003',
    github_repo: 'https://github.com/waas/mumbai-bakes',
    created: '2026-01-10',
  },
  {
    id: '4',
    business_name: 'Gupta Motors',
    domain: 'guptamotors.co.in',
    status: 'live',
    due_date: '2026-04-28',
    is_suspended: false,
    dokploy_app_id: 'dk_app_004',
    github_repo: 'https://github.com/waas/gupta-motors',
    login_url: 'https://guptamotors.co.in/wp-admin',
    login_username: 'gupta_admin',
    login_password: 'M0t0rs@2024',
    created: '2025-12-05',
  },
  {
    id: '5',
    business_name: 'Delhi Fresh Mart',
    domain: 'delhifreshmart.in',
    status: 'live',
    due_date: '2026-05-10',
    is_suspended: false,
    dokploy_app_id: 'dk_app_005',
    github_repo: 'https://github.com/waas/delhi-fresh',
    login_url: 'https://delhifreshmart.in/admin',
    login_username: 'fresh_admin',
    login_password: 'Fr3sh@Mart!',
    created: '2026-02-01',
  },
];

export const mockPayments: Payment[] = [
  { id: 'p1', client_id: '1', client_name: 'Sharma Electronics', amount: 1500, month: 'March 2026', status: 'pending', screenshot_url: '/placeholder.svg', created: '2026-03-10' },
  { id: 'p2', client_id: '2', client_name: 'Patel Textiles', amount: 3000, month: 'February 2026', status: 'rejected', created: '2026-02-28' },
  { id: 'p3', client_id: '4', client_name: 'Gupta Motors', amount: 1500, month: 'March 2026', status: 'approved', screenshot_url: '/placeholder.svg', created: '2026-03-05' },
  { id: 'p4', client_id: '5', client_name: 'Delhi Fresh Mart', amount: 3000, month: 'March 2026', status: 'pending', screenshot_url: '/placeholder.svg', created: '2026-03-18' },
  { id: 'p5', client_id: '3', client_name: 'Mumbai Bakes', amount: 1500, month: 'March 2026', status: 'approved', screenshot_url: '/placeholder.svg', created: '2026-03-02' },
];

export const mockTickets: Ticket[] = [
  { id: 't1', client_id: '1', client_name: 'Sharma Electronics', subject: 'Update product images', description: 'Please update the hero banner with new Diwali sale images. Attached the files.', status: 'open', created: '2026-03-20' },
  { id: 't2', client_id: '4', client_name: 'Gupta Motors', subject: 'Add new service page', description: 'Need a new page for EV charging station service. Content doc attached.', status: 'in-progress', attachment_url: '/placeholder.svg', created: '2026-03-18' },
  { id: 't3', client_id: '5', client_name: 'Delhi Fresh Mart', subject: 'Fix WhatsApp button', description: 'The WhatsApp order button is not working on mobile.', status: 'resolved', created: '2026-03-15' },
];

export const mockAnalytics: AnalyticsData[] = [
  { week: 'Week 1', visitors: 124, whatsapp_clicks: 18 },
  { week: 'Week 2', visitors: 156, whatsapp_clicks: 23 },
  { week: 'Week 3', visitors: 189, whatsapp_clicks: 31 },
  { week: 'Week 4', visitors: 201, whatsapp_clicks: 27 },
  { week: 'Week 5', visitors: 178, whatsapp_clicks: 34 },
  { week: 'Week 6', visitors: 220, whatsapp_clicks: 41 },
];

export const mockMRR = mockClients.filter(c => !c.is_suspended).length * 1500;
export const mockPendingApprovals = mockPayments.filter(p => p.status === 'pending').length;
export const mockLiveSites = mockClients.filter(c => c.status === 'live').length;
