
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, CheckCircle, AlertTriangle, Users } from "lucide-react";

interface Incident {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  timestamp: string;
  description: string;
  affectedSystems: string[];
  assignedTo: string;
}

interface MitigationStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: number;
}

export const IncidentResponse = () => {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: "INC-001",
      title: "SQL Injection Attack Detected",
      severity: "Critical",
      status: "In Progress",
      timestamp: "2024-01-15 14:30:25",
      description: "Multiple SQL injection attempts detected on web application login form",
      affectedSystems: ["Web Server", "Database Server"],
      assignedTo: "Security Team Alpha"
    },
    {
      id: "INC-002",
      title: "Brute Force Attack on SSH",
      severity: "High",
      status: "Open",
      timestamp: "2024-01-15 13:15:42",
      description: "Sustained brute force attack targeting SSH service on production server",
      affectedSystems: ["Production Server 1"],
      assignedTo: "Security Team Beta"
    },
    {
      id: "INC-003",
      title: "Malware Detection",
      severity: "Medium",
      status: "Resolved",
      timestamp: "2024-01-15 11:45:18",
      description: "Malware detected and quarantined on workstation in accounting department",
      affectedSystems: ["Workstation ACC-05"],
      assignedTo: "IT Support"
    }
  ]);

  const [mitigationSteps, setMitigationSteps] = useState<MitigationStep[]>([
    {
      id: "1",
      title: "Isolate Affected Systems",
      description: "Disconnect affected systems from the network to prevent lateral movement",
      completed: true,
      priority: 1
    },
    {
      id: "2",
      title: "Preserve Evidence",
      description: "Create forensic images of affected systems and preserve log files",
      completed: true,
      priority: 2
    },
    {
      id: "3",
      title: "Analyze Attack Vectors",
      description: "Identify how the attacker gained access and what vulnerabilities were exploited",
      completed: false,
      priority: 3
    },
    {
      id: "4",
      title: "Patch Vulnerabilities",
      description: "Apply security patches to close identified vulnerabilities",
      completed: false,
      priority: 4
    },
    {
      id: "5",
      title: "Monitor for Persistence",
      description: "Check for backdoors, persistence mechanisms, and ongoing threats",
      completed: false,
      priority: 5
    },
    {
      id: "6",
      title: "Restore Systems",
      description: "Safely restore systems to operation after ensuring they are clean",
      completed: false,
      priority: 6
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-600";
      case "High": return "bg-orange-600";
      case "Medium": return "bg-yellow-600";
      case "Low": return "bg-blue-600";
      default: return "bg-slate-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-500";
      case "In Progress": return "bg-yellow-500";
      case "Resolved": return "bg-green-500";
      case "Closed": return "bg-slate-500";
      default: return "bg-slate-600";
    }
  };

  const toggleStepCompletion = (stepId: string) => {
    setMitigationSteps(prev =>
      prev.map(step =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const updateIncidentStatus = (incidentId: string, newStatus: Incident["status"]) => {
    setIncidents(prev =>
      prev.map(incident =>
        incident.id === incidentId ? { ...incident, status: newStatus } : incident
      )
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Incident Response & Forensics
          </CardTitle>
          <CardDescription className="text-slate-400">
            Manage security incidents and coordinate response efforts
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="incidents" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-slate-700">
          <TabsTrigger value="incidents" className="data-[state=active]:bg-yellow-600">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Active Incidents
          </TabsTrigger>
          <TabsTrigger value="response" className="data-[state=active]:bg-blue-600">
            <CheckCircle className="w-4 h-4 mr-2" />
            Response Plan
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-purple-600">
            <Clock className="w-4 h-4 mr-2" />
            Timeline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="mt-6">
          <div className="space-y-4">
            {incidents.map((incident) => (
              <Card key={incident.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-slate-300">
                        {incident.id}
                      </Badge>
                      <CardTitle className="text-slate-200">{incident.title}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getSeverityColor(incident.severity)} text-white`}>
                        {incident.severity}
                      </Badge>
                      <Badge className={`${getStatusColor(incident.status)} text-white`}>
                        {incident.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 mb-4">{incident.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Timestamp:</span>
                      <p className="text-slate-300">{incident.timestamp}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Affected Systems:</span>
                      <p className="text-slate-300">{incident.affectedSystems.join(", ")}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Assigned To:</span>
                      <p className="text-slate-300">{incident.assignedTo}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => updateIncidentStatus(incident.id, "In Progress")}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      Mark In Progress
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateIncidentStatus(incident.id, "Resolved")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Mark Resolved
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="response" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-blue-400">Incident Response Checklist</CardTitle>
              <CardDescription className="text-slate-400">
                Standard operating procedures for security incident response
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mitigationSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`p-4 rounded-lg border ${
                      step.completed 
                        ? "bg-green-900/20 border-green-600" 
                        : "bg-slate-700 border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 text-sm">Step {step.priority}</span>
                        <h3 className={`font-medium ${
                          step.completed ? "text-green-400" : "text-slate-200"
                        }`}>
                          {step.title}
                        </h3>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => toggleStepCompletion(step.id)}
                        className={
                          step.completed 
                            ? "bg-green-600 hover:bg-green-700" 
                            : "bg-slate-600 hover:bg-slate-700"
                        }
                      >
                        {step.completed ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Completed
                          </>
                        ) : (
                          "Mark Complete"
                        )}
                      </Button>
                    </div>
                    <p className="text-slate-400 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-purple-400">Incident Timeline</CardTitle>
              <CardDescription className="text-slate-400">
                Chronological view of incident events and response actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-slate-200 font-medium">14:30:25 - Attack Detected</p>
                    <p className="text-slate-400 text-sm">SQL injection attempts identified by WAF</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-slate-200 font-medium">14:32:10 - Systems Isolated</p>
                    <p className="text-slate-400 text-sm">Web server disconnected from production network</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-slate-200 font-medium">14:35:45 - Evidence Preserved</p>
                    <p className="text-slate-400 text-sm">Forensic snapshots created for analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-slate-200 font-medium">14:45:20 - Team Notified</p>
                    <p className="text-slate-400 text-sm">Security team alpha assigned to incident</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
