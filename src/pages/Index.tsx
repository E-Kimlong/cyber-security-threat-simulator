
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VulnerabilityScanner } from "@/components/cybersecurity/VulnerabilityScanner";
import { AttackSimulator } from "@/components/cybersecurity/AttackSimulator";
import { IntrusionDetection } from "@/components/cybersecurity/IntrusionDetection";
import { IncidentResponse } from "@/components/cybersecurity/IncidentResponse";
import { ReportingDashboard } from "@/components/cybersecurity/ReportingDashboard";
import { Shield, AlertTriangle, Activity, FileText, BarChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-green-400">
      <div className="container mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-green-400">
            <Shield className="inline-block mr-3 mb-1" />
            CyberSec Threat Simulator
          </h1>
          <p className="text-slate-400 text-lg">
            Advanced Cybersecurity Training & Analysis Platform
          </p>
        </div>

        <Tabs defaultValue="scanner" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border border-slate-700">
            <TabsTrigger 
              value="scanner" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Shield className="w-4 h-4 mr-2" />
              Scanner
            </TabsTrigger>
            <TabsTrigger 
              value="attacks" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Attacks
            </TabsTrigger>
            <TabsTrigger 
              value="ids" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              IDS
            </TabsTrigger>
            <TabsTrigger 
              value="incidents" 
              className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
            >
              <FileText className="w-4 h-4 mr-2" />
              Incidents
            </TabsTrigger>
            <TabsTrigger 
              value="reports" 
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <BarChart className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="mt-6">
            <VulnerabilityScanner />
          </TabsContent>

          <TabsContent value="attacks" className="mt-6">
            <AttackSimulator />
          </TabsContent>

          <TabsContent value="ids" className="mt-6">
            <IntrusionDetection />
          </TabsContent>

          <TabsContent value="incidents" className="mt-6">
            <IncidentResponse />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <ReportingDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
