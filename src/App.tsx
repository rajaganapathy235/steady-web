import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import AdminOverview from "./pages/admin/AdminOverview";
import AdminClients from "./pages/admin/AdminClients";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminDeploy from "./pages/admin/AdminDeploy";
import AdminDeliverables from "./pages/admin/AdminDeliverables";
import AdminDomains from "./pages/admin/AdminDomains";
import AdminTickets from "./pages/admin/AdminTickets";

import ClientDashboard from "./pages/client/ClientDashboard";
import ClientCredentials from "./pages/client/ClientCredentials";
import ClientPayments from "./pages/client/ClientPayments";
import ClientSupport from "./pages/client/ClientSupport";
import ClientAnalytics from "./pages/client/ClientAnalytics";
import ClientDomain from "./pages/client/ClientDomain";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminOverview /></ProtectedRoute>} />
            <Route path="/admin/clients" element={<ProtectedRoute role="admin"><AdminClients /></ProtectedRoute>} />
            <Route path="/admin/payments" element={<ProtectedRoute role="admin"><AdminPayments /></ProtectedRoute>} />
            <Route path="/admin/deploy" element={<ProtectedRoute role="admin"><AdminDeploy /></ProtectedRoute>} />
            <Route path="/admin/deliverables" element={<ProtectedRoute role="admin"><AdminDeliverables /></ProtectedRoute>} />
            <Route path="/admin/tickets" element={<ProtectedRoute role="admin"><AdminTickets /></ProtectedRoute>} />

            {/* Client Routes */}
            <Route path="/dashboard" element={<ProtectedRoute role="client"><ClientDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/credentials" element={<ProtectedRoute role="client"><ClientCredentials /></ProtectedRoute>} />
            <Route path="/dashboard/payments" element={<ProtectedRoute role="client"><ClientPayments /></ProtectedRoute>} />
            <Route path="/dashboard/support" element={<ProtectedRoute role="client"><ClientSupport /></ProtectedRoute>} />
            <Route path="/dashboard/analytics" element={<ProtectedRoute role="client"><ClientAnalytics /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
