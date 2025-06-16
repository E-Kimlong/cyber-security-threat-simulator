
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BarChart as BarChartIcon, Download, TrendingUp, Shield, AlertTriangle } from "lucide-react";

const vulnerabilityData = [
  { month: "Jan", critical: 12, high: 25, medium: 45, low: 20 },
  { month: "Feb", critical: 8, high: 22, medium: 38, low: 18 },
  { month: "Mar", critical: 15, high: 28, medium: 42, low: 25 },
  { month: "Apr", critical: 6, high: 18, medium: 35, low: 15 },
  { month: "May", critical: 10, high: 24, medium: 40, low: 22 },
  { month: "Jun", critical: 4, high: 16, medium: 30, low: 12 }
];

const attackTrendsData = [
  { month: "Jan", phishing: 45, malware: 23, ddos: 12, bruteforce: 18 },
  { month: "Feb", phishing: 52, malware: 28, ddos: 8, bruteforce: 22 },
  { month: "Mar", phishing: 38, malware: 32, ddos: 15, bruteforce: 25 },
  { month: "Apr", phishing: 41, malware: 19, ddos: 10, bruteforce: 16 },
  { month: "May", phishing: 48, malware: 25, ddos: 18, bruteforce: 20 },
  { month: "Jun", phishing: 35, malware: 22, ddos: 6, bruteforce: 14 }
];

const threatDistribution = [
  { name: "Phishing", value: 35, color: "#EF4444" },
  { name: "Malware", value: 25, color: "#F97316" },
  { name: "Brute Force", value: 20, color: "#EAB308" },
  { name: "DDoS", value: 12, color: "#3B82F6" },
  { name: "Other", value: 8, color: "#6B7280" }
];

const securityMetrics = [
  { metric: "Mean Time to Detection", value: "4.2 minutes", trend: "down", color: "text-green-400" },
  { metric: "Mean Time to Response", value: "12.8 minutes", trend: "down", color: "text-green-400" },
  { metric: "Security Score", value: "87/100", trend: "up", color: "text-green-400" },
  { metric: "Threats Blocked", value: "2,847", trend: "up", color: "text-blue-400" }
];

export const ReportingDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  const generateReport = (format: "PDF" | "CSV") => {
    // Simulate report generation
    const reportData = {
      period: selectedPeriod,
      totalVulnerabilities: vulnerabilityData.reduce((sum, month) => 
        sum + month.critical + month.high + month.medium + month.low, 0),
      criticalVulnerabilities: vulnerabilityData.reduce((sum, month) => sum + month.critical, 0),
      totalAttacks: attackTrendsData.reduce((sum, month) => 
        sum + month.phishing + month.malware + month.ddos + month.bruteforce, 0),
      timestamp: new Date().toISOString()
    };

    console.log(`Generating ${format} report:`, reportData);
    
    // In a real application, this would trigger a download
    alert(`${format} report generated successfully! Check your downloads folder.`);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center">
            <BarChartIcon className="w-5 h-5 mr-2" />
            Security Analytics & Reporting Dashboard
          </CardTitle>
          <CardDescription className="text-slate-400">
            Comprehensive security metrics, trends, and automated reporting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button
              onClick={() => generateReport("PDF")}
              className="bg-red-600 hover:bg-red-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF Report
            </Button>
            <Button
              onClick={() => generateReport("CSV")}
              className="bg-green-600 hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {securityMetrics.map((metric, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{metric.metric}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </p>
                </div>
                <TrendingUp className={`w-8 h-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vulnerability Trends */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-orange-400">Vulnerability Trends</CardTitle>
            <CardDescription className="text-slate-400">
              Monthly vulnerability discoveries by severity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vulnerabilityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="critical" stackId="a" fill="#EF4444" name="Critical" />
                  <Bar dataKey="high" stackId="a" fill="#F97316" name="High" />
                  <Bar dataKey="medium" stackId="a" fill="#EAB308" name="Medium" />
                  <Bar dataKey="low" stackId="a" fill="#3B82F6" name="Low" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attack Trends */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-red-400">Attack Trends</CardTitle>
            <CardDescription className="text-slate-400">
              Monthly attack attempts by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attackTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="phishing" stroke="#EF4444" strokeWidth={2} name="Phishing" />
                  <Line type="monotone" dataKey="malware" stroke="#F97316" strokeWidth={2} name="Malware" />
                  <Line type="monotone" dataKey="ddos" stroke="#EAB308" strokeWidth={2} name="DDoS" />
                  <Line type="monotone" dataKey="bruteforce" stroke="#3B82F6" strokeWidth={2} name="Brute Force" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Threat Distribution */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-blue-400">Threat Distribution</CardTitle>
            <CardDescription className="text-slate-400">
              Current threat landscape breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={threatDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {threatDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Security Score */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-green-400">Security Posture</CardTitle>
            <CardDescription className="text-slate-400">
              Overall security health indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Network Security</span>
                <span className="text-green-400 font-bold">92%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Endpoint Protection</span>
                <span className="text-yellow-400 font-bold">78%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">User Awareness</span>
                <span className="text-blue-400 font-bold">85%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Compliance</span>
                <span className="text-green-400 font-bold">96%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Log */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Recent Security Activity</CardTitle>
          <CardDescription className="text-slate-400">
            Latest security events and system activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "14:30", event: "High-severity vulnerability patched", type: "success" },
              { time: "13:45", event: "Brute force attack blocked", type: "warning" },
              { time: "12:20", event: "Security scan completed", type: "info" },
              { time: "11:55", event: "Malware detected and quarantined", type: "danger" },
              { time: "11:30", event: "User security training completed", type: "success" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-slate-700 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  activity.type === 'danger' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <span className="text-slate-400 text-sm font-mono">{activity.time}</span>
                <span className="text-slate-200">{activity.event}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
