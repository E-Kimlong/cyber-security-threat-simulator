
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, AlertTriangle, Shield, Wifi } from "lucide-react";

interface NetworkAlert {
  id: string;
  timestamp: string;
  type: "Anomaly" | "Intrusion" | "Malware" | "Suspicious";
  severity: "Critical" | "High" | "Medium" | "Low";
  source: string;
  description: string;
}

interface TrafficData {
  time: string;
  normal: number;
  suspicious: number;
  blocked: number;
}

export const IntrusionDetection = () => {
  const [alerts, setAlerts] = useState<NetworkAlert[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);

  const mockAlerts: NetworkAlert[] = [
    {
      id: "1",
      timestamp: new Date().toLocaleTimeString(),
      type: "Intrusion",
      severity: "Critical",
      source: "192.168.1.150",
      description: "Multiple failed login attempts detected"
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 30000).toLocaleTimeString(),
      type: "Anomaly",
      severity: "High",
      source: "10.0.0.45",
      description: "Unusual network traffic pattern"
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 60000).toLocaleTimeString(),
      type: "Malware",
      severity: "Critical",
      source: "192.168.1.200",
      description: "Malicious payload detected in HTTP traffic"
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 120000).toLocaleTimeString(),
      type: "Suspicious",
      severity: "Medium",
      source: "172.16.0.100",
      description: "Port scanning activity detected"
    }
  ];

  useEffect(() => {
    // Initialize with some alerts
    setAlerts(mockAlerts);

    // Generate initial traffic data
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes() - 19 + i).padStart(2, '0')}`,
      normal: Math.floor(Math.random() * 100) + 50,
      suspicious: Math.floor(Math.random() * 20) + 5,
      blocked: Math.floor(Math.random() * 10) + 2,
    }));
    setTrafficData(initialData);

    // Simulate real-time monitoring
    const interval = setInterval(() => {
      if (isMonitoring) {
        // Add new traffic data point
        setTrafficData(prev => {
          const newData = [...prev.slice(1)];
          newData.push({
            time: new Date().toLocaleTimeString().slice(0, 5),
            normal: Math.floor(Math.random() * 100) + 50,
            suspicious: Math.floor(Math.random() * 20) + 5,
            blocked: Math.floor(Math.random() * 10) + 2,
          });
          return newData;
        });

        // Occasionally add new alerts
        if (Math.random() > 0.7) {
          const newAlert: NetworkAlert = {
            id: Date.now().toString(),
            timestamp: new Date().toLocaleTimeString(),
            type: ["Anomaly", "Intrusion", "Malware", "Suspicious"][Math.floor(Math.random() * 4)] as any,
            severity: ["Critical", "High", "Medium", "Low"][Math.floor(Math.random() * 4)] as any,
            source: `192.168.1.${Math.floor(Math.random() * 255)}`,
            description: [
              "Suspicious network activity detected",
              "Potential brute force attack",
              "Malicious file download attempt",
              "Unusual data exfiltration pattern"
            ][Math.floor(Math.random() * 4)]
          };

          setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-600";
      case "High": return "bg-orange-600";
      case "Medium": return "bg-yellow-600";
      case "Low": return "bg-blue-600";
      default: return "bg-slate-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Intrusion":
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case "Anomaly":
        return <Activity className="w-4 h-4 text-orange-400" />;
      case "Malware":
        return <Shield className="w-4 h-4 text-purple-400" />;
      case "Suspicious":
        return <Wifi className="w-4 h-4 text-yellow-400" />;
      default:
        return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Intrusion Detection System
          </CardTitle>
          <CardDescription className="text-slate-400">
            Real-time network monitoring and threat detection using ML algorithms
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-green-400">Network Traffic Analysis</CardTitle>
            <CardDescription className="text-slate-400">
              Real-time traffic monitoring with anomaly detection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="normal" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Normal Traffic"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="suspicious" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    name="Suspicious"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="blocked" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    name="Blocked"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-red-400">Security Alerts</CardTitle>
            <CardDescription className="text-slate-400">
              Recent security incidents and anomalies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 bg-slate-700 rounded-lg border border-slate-600"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(alert.type)}
                      <span className="font-medium text-slate-200">{alert.type}</span>
                    </div>
                    <Badge className={`${getSeverityColor(alert.severity)} text-white text-xs`}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm mb-1">{alert.description}</p>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Source: {alert.source}</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Threats</p>
                <p className="text-2xl font-bold text-red-400">
                  {alerts.filter(a => a.severity === "Critical").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Blocked Attempts</p>
                <p className="text-2xl font-bold text-orange-400">247</p>
              </div>
              <Shield className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Network Health</p>
                <p className="text-2xl font-bold text-green-400">98.5%</p>
              </div>
              <Activity className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Monitoring</p>
                <p className="text-2xl font-bold text-blue-400">
                  {isMonitoring ? "Active" : "Inactive"}
                </p>
              </div>
              <Wifi className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
